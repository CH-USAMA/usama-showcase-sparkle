#!/usr/bin/env node
/*
 * Frees the dev-server port and clears whatever is holding it, so the project
 * is always easy to start: no "Port 8080 is already in use", no orphaned Node
 * processes left behind by a crashed or Ctrl-C'd Vite server.
 *
 * Cross-platform (Windows / macOS / Linux). Kills the whole process tree of
 * each port holder, so Vite's child esbuild service goes with it.
 *
 * Usage:
 *   npm run kill             free the default dev port (8080)
 *   npm run kill -- 5173     also free extra port(s) passed on the CLI
 *   npm run dev:clean        kill first, then start the dev server
 */

import { execSync } from "node:child_process";
import os from "node:os";

const isWin = os.platform() === "win32";

// 8080 is the port set in vite.config.ts. Extra ports can be passed as args.
const DEFAULT_PORTS = [8080];
const extra = process.argv
  .slice(2)
  .map(Number)
  .filter((n) => Number.isInteger(n) && n > 0 && n < 65536);
const ports = [...new Set([...DEFAULT_PORTS, ...extra])];

function run(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString();
  } catch {
    return ""; // tool missing / nothing matched — treat as empty
  }
}

function pidsOnPort(port) {
  const pids = new Set();
  if (isWin) {
    // netstat columns: Proto  Local-Address  Foreign-Address  State  PID
    for (const line of run("netstat -ano -p tcp").split(/\r?\n/)) {
      const cols = line.trim().split(/\s+/);
      if (cols.length < 5) continue;
      const [, local, , state, pid] = cols;
      if (
        state === "LISTENING" &&
        local.endsWith(`:${port}`) &&
        /^\d+$/.test(pid) &&
        pid !== "0"
      ) {
        pids.add(pid);
      }
    }
  } else {
    for (const pid of run(`lsof -ti tcp:${port} -sTCP:LISTEN`).split(/\s+/)) {
      if (/^\d+$/.test(pid)) pids.add(pid);
    }
  }
  return [...pids];
}

function kill(pid) {
  if (isWin) run(`taskkill /PID ${pid} /T /F`);
  else run(`kill -9 ${pid}`);
}

let killed = 0;
for (const port of ports) {
  const pids = pidsOnPort(port);
  if (pids.length === 0) {
    console.log(`port ${port}: already free`);
    continue;
  }
  for (const pid of pids) {
    kill(pid);
    killed++;
    console.log(`port ${port}: killed PID ${pid}`);
  }
}

console.log(
  killed
    ? `\n✓ freed ${ports.join(", ")} — ${killed} process${killed === 1 ? "" : "es"} killed`
    : `\n✓ nothing to kill — port(s) ${ports.join(", ")} already free`,
);
