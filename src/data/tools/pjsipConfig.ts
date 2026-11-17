/**
 * Builds a starter pjsip.conf and extensions.conf for /tools/pjsip-config-generator.
 * No words: the comments written into the files come from src/i18n/tools/<locale>.ts
 * under `pjsip.files`, so a translated page writes translated comments.
 *
 * Targets res_pjsip (chan_pjsip), Asterisk 16 and newer. Asterisk 20.12, 21.7 and
 * 22.2 replaced auth_type=userpass with auth_type=digest (userpass still loads but is
 * converted), so the version choice only switches that one value.
 */

export type Transport = "udp" | "tcp" | "tls";
export type TrunkAuth = "register" | "ip";
export type AsteriskVersion = "current" | "older";
export type Codec = "ulaw" | "alaw" | "g722" | "opus";

export const CODECS: Codec[] = ["ulaw", "alaw", "g722", "opus"];
export const MAX_EXTENSIONS = 200;

export interface PjsipInput {
  version: AsteriskVersion;
  transport: Transport;
  port: number;
  nat: boolean;
  publicIp: string;
  localNet: string;
  trunkName: string;
  trunkAuth: TrunkAuth;
  host: string;
  hostPort: number;
  username: string;
  password: string;
  providerIps: string;
  callerId: string;
  extStart: number;
  extCount: number;
  codecs: Codec[];
  outboundPrefix: string;
  inboundTo: number;
}

/** Comment lines written into the files; one set per language. */
export interface PjsipFileWords {
  header: string;
  review: string;
  transport: string;
  natNote: string;
  tlsNote: string;
  trunk: string;
  ipTrunkNote: string;
  passwordPlaceholder: string;
  templates: string;
  extensions: string;
  dialplanHeader: string;
  internal: string;
  outbound: string;
  inbound: string;
  reload: string;
}

export const DEFAULT_INPUT: PjsipInput = {
  version: "current",
  transport: "udp",
  port: 5060,
  nat: true,
  publicIp: "203.0.113.10",
  localNet: "192.168.0.0/16",
  trunkName: "mytrunk",
  trunkAuth: "register",
  host: "sip.example-provider.com",
  hostPort: 5060,
  username: "",
  password: "",
  providerIps: "",
  callerId: "",
  extStart: 1001,
  extCount: 10,
  codecs: ["ulaw", "alaw"],
  outboundPrefix: "9",
  inboundTo: 1001,
};

/** Section names and other config tokens: letters, digits, dash, underscore, dot. */
export const token = (s: string, fallback: string) => s.trim().replace(/[^A-Za-z0-9_.-]/g, "").slice(0, 40) || fallback;
/** Host names and IPs as written in a SIP URI or a match= line. */
const hostOf = (s: string, fallback: string) => s.trim().replace(/^sips?:/i, "").replace(/[^A-Za-z0-9.:\-[\]]/g, "").slice(0, 120) || fallback;
/** One config value: no newlines, and ; (which starts a comment) escaped as \; so passwords keep it. */
const value = (s: string) => s.replace(/[\r\n]/g, "").trim().replace(/\\?;/g, "\\;");
const digits = (s: string) => s.replace(/[^0-9]/g, "").slice(0, 4);

export const transportName = (t: Transport) => `transport-${t}`;

/** The extension numbers, as strings of equal length. */
export function extensionRange(i: PjsipInput): string[] {
  const count = Math.min(MAX_EXTENSIONS, Math.max(1, Math.floor(i.extCount)));
  const start = Math.max(1, Math.floor(i.extStart));
  return Array.from({ length: count }, (_, k) => String(start + k));
}

/**
 * Asterisk dialplan patterns (without the leading _) that match exactly the numbers
 * lo..hi, which must have the same number of digits. 1001..1020 gives 100[1-9], 101X, 1020.
 */
export function rangePatterns(lo: string, hi: string): string[] {
  if (lo.length !== hi.length) throw new Error("rangePatterns: lengths differ");
  if (lo === hi) return [lo];
  const n = lo.length;
  const a = Number(lo[0]);
  const b = Number(hi[0]);
  const restLo = lo.slice(1);
  const restHi = hi.slice(1);
  const zeros = "0".repeat(n - 1);
  const nines = "9".repeat(n - 1);
  if (a === b) return rangePatterns(restLo, restHi).map((p) => `${a}${p}`);
  const out: string[] = [];
  let from = a;
  let to = b;
  if (restLo !== zeros) {
    out.push(...rangePatterns(restLo, nines).map((p) => `${a}${p}`));
    from++;
  }
  const tail = restHi !== nines;
  if (tail) to--;
  if (from <= to) out.push(`${from === to ? from : from === 0 && to === 9 ? "X" : `[${from}-${to}]`}${"X".repeat(n - 1)}`);
  if (tail) out.push(...rangePatterns(zeros, restHi).map((p) => `${b}${p}`));
  return out;
}

/** Patterns for a list of consecutive numbers that may cross a length boundary (995..1004). */
export function patternsFor(numbers: string[]): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < numbers.length) {
    let j = i;
    while (j + 1 < numbers.length && numbers[j + 1].length === numbers[i].length) j++;
    out.push(...rangePatterns(numbers[i], numbers[j]));
    i = j + 1;
  }
  return out;
}

const PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

/** A random password per extension, made in the browser. Never called during render on the server. */
export function makePasswords(count: number): string[] {
  const out: string[] = [];
  const bytes = new Uint8Array(20);
  for (let k = 0; k < count; k++) {
    crypto.getRandomValues(bytes);
    out.push(Array.from(bytes, (x) => PASSWORD_CHARS[x % PASSWORD_CHARS.length]).join(""));
  }
  return out;
}

export function buildPjsip(i: PjsipInput, w: PjsipFileWords, passwords: string[]): string {
  const t = transportName(i.transport);
  const trunk = token(i.trunkName, "mytrunk");
  const host = hostOf(i.host, "sip.example-provider.com");
  const hostPort = i.hostPort && i.hostPort !== 5060 ? `:${Math.floor(i.hostPort)}` : "";
  const authType = i.version === "current" ? "digest" : "userpass";
  const codecs = (i.codecs.length ? i.codecs : (["ulaw"] as Codec[])).join(",");
  const port = Math.floor(i.port) || (i.transport === "tls" ? 5061 : 5060);
  const user = value(i.username) || "YOUR_SIP_USERNAME";
  const pass = value(i.password) || "YOUR_SIP_PASSWORD";
  const natLines = i.nat ? ["rtp_symmetric=yes", "force_rport=yes", "rewrite_contact=yes"] : [];
  const L: string[] = [];
  const add = (...lines: string[]) => L.push(...lines);

  add(`; ${w.header}`, `; ${w.review}`, "");

  // ---- transport ----
  add(`; ---- ${w.transport} ----`, `[${t}]`, "type=transport", `protocol=${i.transport}`, `bind=0.0.0.0:${port}`);
  if (i.transport === "tls") {
    add(`; ${w.tlsNote}`, "cert_file=/etc/asterisk/keys/asterisk.crt", "priv_key_file=/etc/asterisk/keys/asterisk.key", "method=tlsv1_2");
  }
  if (i.nat) {
    const ip = hostOf(i.publicIp, "203.0.113.10");
    add(`; ${w.natNote}`, `local_net=${value(i.localNet) || "192.168.0.0/16"}`, `external_media_address=${ip}`, `external_signaling_address=${ip}`);
  }
  add("");

  // ---- trunk ----
  add(`; ---- ${w.trunk} ----`);
  if (i.trunkAuth === "register") {
    add(
      `[${trunk}-auth]`,
      "type=auth",
      `auth_type=${authType}`,
      `username=${user}`,
      `password=${pass}`,
      "",
      `[${trunk}-reg]`,
      "type=registration",
      `transport=${t}`,
      `outbound_auth=${trunk}-auth`,
      `server_uri=sip:${host}${hostPort}`,
      `client_uri=sip:${user}@${host}${hostPort}`,
      "retry_interval=60",
      "forbidden_retry_interval=600",
      "expiration=3600",
      ""
    );
  } else {
    add(`; ${w.ipTrunkNote}`);
  }
  add(`[${trunk}]`, "type=aor", `contact=sip:${host}${hostPort}`, "qualify_frequency=60", "");
  add(
    `[${trunk}]`,
    "type=endpoint",
    `transport=${t}`,
    "context=from-trunk",
    "disallow=all",
    `allow=${codecs}`,
    `aors=${trunk}`,
    ...(i.trunkAuth === "register" ? [`outbound_auth=${trunk}-auth`, `from_user=${user}`, `from_domain=${host}`] : []),
    "direct_media=no",
    ...natLines,
    ""
  );
  const ips = i.providerIps
    .split(/[\s,]+/)
    .map((s) => hostOf(s, ""))
    .filter(Boolean);
  add(`[${trunk}]`, "type=identify", `endpoint=${trunk}`, ...(ips.length ? ips : [host]).map((m) => `match=${m}`), "");

  // ---- phones ----
  add(
    `; ---- ${w.templates} ----`,
    "[phone-endpoint](!)",
    "type=endpoint",
    `transport=${t}`,
    "context=internal",
    "disallow=all",
    `allow=${codecs}`,
    "direct_media=no",
    "dtmf_mode=rfc4733",
    ...natLines,
    "",
    "[phone-auth](!)",
    "type=auth",
    `auth_type=${authType}`,
    "",
    "[phone-aor](!)",
    "type=aor",
    "max_contacts=1",
    "remove_existing=yes",
    "qualify_frequency=60",
    ""
  );
  add(`; ---- ${w.extensions} ----`);
  extensionRange(i).forEach((ext, k) => {
    add(
      `[${ext}](phone-endpoint)`,
      `auth=${ext}`,
      `aors=${ext}`,
      `callerid="${ext}" <${ext}>`,
      "",
      `[${ext}](phone-auth)`,
      `username=${ext}`,
      `password=${passwords[k] ?? w.passwordPlaceholder}`,
      "",
      `[${ext}](phone-aor)`,
      ""
    );
  });
  return L.join("\n").trimEnd() + "\n";
}

export function buildDialplan(i: PjsipInput, w: PjsipFileWords): string {
  const trunk = token(i.trunkName, "mytrunk");
  const exts = extensionRange(i);
  const prefix = digits(i.outboundPrefix);
  const callerId = i.callerId.replace(/[^0-9+]/g, "").slice(0, 20);
  const inbound = exts.includes(String(Math.floor(i.inboundTo))) ? String(Math.floor(i.inboundTo)) : exts[0];
  const dialOut = prefix ? `\${EXTEN:${prefix.length}}` : "${EXTEN}";
  const L: string[] = [`; ${w.dialplanHeader}`, `; ${w.review}`, ""];
  const add = (...lines: string[]) => L.push(...lines);

  add(`; ---- ${w.internal} ----`, "[internal]");
  for (const p of patternsFor(exts)) {
    add(`exten => _${p},1,Dial(PJSIP/\${EXTEN},30)`, " same => n,Hangup()");
  }
  add("", `; ---- ${w.outbound} ----`);
  add(`exten => _${prefix}X.,1,NoOp(Outbound call to ${dialOut})`);
  if (callerId) add(` same => n,Set(CALLERID(num)=${callerId})`);
  add(` same => n,Dial(PJSIP/${dialOut}@${trunk},60)`, " same => n,Hangup()", "");

  add(`; ---- ${w.inbound} ----`, "[from-trunk]");
  add(
    "exten => _[+0-9].,1,NoOp(Incoming call to ${EXTEN} from ${CALLERID(num)})",
    ` same => n,Dial(PJSIP/${inbound},30)`,
    " same => n,Hangup()",
    "",
    "exten => s,1,Goto(from-trunk," + inbound + ",1)",
    "",
    `; ${w.reload}`
  );
  return L.join("\n").trimEnd() + "\n";
}
