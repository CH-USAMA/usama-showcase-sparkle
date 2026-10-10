import { useEffect, useRef, useState } from "react";
import { readAccent } from "@/components/fx/color";

/**
 * Light streaks: thin luminous strands that sweep across a section and drift
 * slowly, drawn by one fragment shader.
 *
 * Why it is cheap enough to sit behind several sections:
 *  - one triangle, six strands, a few sines per pixel;
 *  - rendered below device resolution (it is glow; nobody can see the
 *    difference) and capped at 30 frames a second;
 *  - the loop only runs while the canvas is on screen and the tab is visible;
 *  - WebGL is initialised in idle time, after the page has painted;
 *  - under prefers-reduced-motion it draws one still frame and stops.
 *
 * The output is premultiplied alpha, so the strands compose over whatever the
 * section's ground is: electric blue light on the black theme, blue ink on the
 * paper theme. Colours come from --primary and follow the theme toggle.
 * Without WebGL a CSS glow stands in.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uCore;
uniform vec3 uHalo;
uniform float uGain;
uniform float uLift;

// Distance from p to one gently waving strand, measured in a rotated frame.
float strand(vec2 p, float a, float off, float amp, float freq, float spd, float ph) {
  float c = cos(a), s = sin(a);
  vec2 q = vec2(c * p.x + s * p.y, -s * p.x + c * p.y);
  float y = off + uLift
    + amp * sin(q.x * freq + uTime * spd + ph)
    + amp * 0.38 * sin(q.x * freq * 2.3 - uTime * spd * 1.4 + ph * 1.7);
  return abs(q.y - y);
}

// Brightness travels along each strand, so it reads as moving light.
float along(vec2 p, float a, float k, float ph) {
  float x = cos(a) * p.x + sin(a) * p.y;
  return 0.25 + 0.75 * (0.5 + 0.5 * sin(x * k - uTime * 0.35 + ph));
}

vec3 light(vec2 p, float a, float off, float amp, float freq, float spd, float ph) {
  float d = strand(p, a, off, amp, freq, spd, ph);
  float w = along(p, a, 2.2 + freq * 0.3, ph * 2.0);
  float core = exp(-d * d * 60000.0);
  float glow = exp(-d * d * 2600.0);
  float tail = exp(-d * 9.0);
  return w * (uCore * (core * 0.95 + glow * 0.4) + uHalo * tail * 0.24);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 col = vec3(0.0);
  // Two families that cross low in the frame, away from centred headings.
  col += light(p,  0.30, -0.27, 0.10, 2.1,  0.18, 0.0);
  col += light(p,  0.42, -0.35, 0.07, 2.9, -0.14, 1.3);
  col += light(p,  0.22, -0.19, 0.12, 1.6,  0.11, 2.6);
  col += light(p, -0.38, -0.29, 0.09, 2.4,  0.16, 0.7);
  col += light(p, -0.28, -0.40, 0.06, 3.2, -0.12, 2.1);
  col += light(p, -0.50, -0.21, 0.11, 1.9,  0.09, 3.4);
  // A low haze along the bottom edge, like light under a door.
  col += uHalo * 0.18 * smoothstep(0.15, -0.65, p.y - uLift);
  col = 1.0 - exp(-col * uGain);
  gl_FragColor = vec4(col, max(col.r, max(col.g, col.b)));
}
`;

interface SilkBackgroundProps {
  className?: string;
  /** Vertical shift of the strands, in frame heights. Positive moves them up. */
  lift?: number;
  /** Overall brightness multiplier. */
  intensity?: number;
  /** Starting phase, so two instances on one page do not look identical. */
  seed?: number;
  /** Fraction of CSS pixels to render. Lower it for very tall canvases. */
  resolution?: number;
}

/** Starts a compile. Its status is read once, after linking (see init). */
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

/** KHR_parallel_shader_compile's COMPLETION_STATUS_KHR. */
const COMPLETION_STATUS = 0x91b1;

const SilkBackground = ({ className = "", lift = 0, intensity = 1, seed = 0, resolution = 0.85 }: SilkBackgroundProps) => {
  const wrap = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [state, setState] = useState<"idle" | "live" | "fallback">("idle");

  useEffect(() => {
    const host = wrap.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Glow does not need device resolution. Phones get fewer pixels still.
    const scale = Math.min(window.devicePixelRatio || 1, 1) * (coarse ? Math.min(resolution, 0.6) : resolution);

    let gl: WebGLRenderingContext | null = null;
    let uni: Record<string, WebGLUniformLocation | null> = {};
    let raf = 0;
    let timer = 0;
    let last = 0;
    let initialised = false;
    let time = 8 + seed * 13.7;
    let onScreen = false;
    let disposed = false;
    let firstFrame = true;
    let poll = 0;
    let context: WebGLRenderingContext | null = null;

    const setColours = () => {
      if (!gl) return;
      const dark = document.documentElement.classList.contains("dark");
      const { h, s, l } = readAccent();
      const core = dark ? [h, s, Math.min(l + 18, 82)] : [h, s, l];
      const halo = dark ? [h, s, l * 0.82] : [h, s, Math.min(l + 18, 70)];
      const rgb = (hsl: number[]) => hslToRgb(hsl[0], hsl[1], hsl[2]);
      gl.uniform3fv(uni.uCore, rgb(core));
      gl.uniform3fv(uni.uHalo, rgb(halo));
      gl.uniform1f(uni.uGain, (dark ? 1.15 : 0.75) * intensity);
    };

    const draw = () => {
      if (!gl) return;
      gl.uniform1f(uni.uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (firstFrame) {
        firstFrame = false;
        setState("live");
      }
    };

    const resize = () => {
      if (!gl) return;
      const w = Math.max(1, Math.round(host.clientWidth * scale));
      const h = Math.max(1, Math.round(host.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uni.uRes, w, h);
      }
      if (!running()) draw();
    };

    const running = () => raf !== 0 || timer !== 0;

    // ~30 fps. After drawing, wait out the rest of the frame budget before
    // asking for the next vsync, so the main thread is woken 30 times a second
    // rather than 60 (re-arming rAF and skipping alternate frames still woke it
    // on every vsync).
    const frame = (now: number) => {
      raf = 0;
      time += Math.min(now - last, 100) / 1000;
      last = now;
      draw();
      timer = window.setTimeout(() => {
        timer = 0;
        raf = requestAnimationFrame(frame);
      }, 28);
    };

    const start = () => {
      if (reduced || running() || !gl || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
      raf = 0;
      timer = 0;
    };

    const init = () => {
      if (disposed || initialised) return;
      initialised = true;
      // Held locally until its program has linked: everything else checks
      // `gl`, so nothing draws or sets uniforms on a context that is not ready.
      const ctx = (context = canvas.getContext("webgl", {
        // A software rasteriser would run this shader on the CPU and drag the
        // whole page down; the CSS glow is the right answer there.
        failIfMajorPerformanceCaveat: true,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      }));
      if (!ctx) return setState("fallback");

      const vs = compile(ctx, ctx.VERTEX_SHADER, VERT);
      const fs = compile(ctx, ctx.FRAGMENT_SHADER, FRAG);
      const prog = ctx.createProgram();
      if (!vs || !fs || !prog) return setState("fallback");
      ctx.attachShader(prog, vs);
      ctx.attachShader(prog, fs);
      ctx.linkProgram(prog);

      // Reading LINK_STATUS blocks the main thread until the driver has
      // compiled both shaders, which is tens of milliseconds on some phones.
      // Where KHR_parallel_shader_compile exists the compile runs off thread
      // and COMPLETION_STATUS can be polled without blocking.
      const parallel = ctx.getExtension("KHR_parallel_shader_compile");
      const linked = () => {
        poll = 0;
        if (disposed || ctx.isContextLost()) return;
        if (parallel && !ctx.getProgramParameter(prog, COMPLETION_STATUS)) {
          poll = window.setTimeout(linked, 16);
          return;
        }
        if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
          console.warn("[silk] shader:", ctx.getShaderInfoLog(vs) || ctx.getShaderInfoLog(fs) || ctx.getProgramInfoLog(prog));
          ctx.getExtension("WEBGL_lose_context")?.loseContext();
          return setState("fallback");
        }
        gl = ctx;
        setup(prog);
      };
      linked();
    };

    const setup = (prog: WebGLProgram) => {
      if (!gl) return;
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      uni = Object.fromEntries(
        ["uRes", "uTime", "uCore", "uHalo", "uGain", "uLift"].map((n) => [n, gl!.getUniformLocation(prog, n)])
      );
      gl.uniform1f(uni.uLift, lift);
      setColours();
      resize();
      start();
    };

    // Initialise only when the canvas comes within reach of the viewport (a
    // closing section ten screens down costs nothing at load), and then in
    // idle time, so the page's own text always paints first.
    const idle = "requestIdleCallback" in window;
    let idleId = 0;
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        idleId = idle ? window.requestIdleCallback(init, { timeout: 1500 }) : window.setTimeout(init, 250);
      },
      { rootMargin: "400px 0px" }
    );
    near.observe(host);

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(host);

    const ro = new ResizeObserver(() => resize());
    ro.observe(host);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    // Theme toggle and accent changes re-tint the strands.
    const mo = new MutationObserver(() => {
      setColours();
      if (!running()) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-accent"] });

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      gl = null;
      setState("fallback");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      disposed = true;
      window.clearTimeout(poll);
      near.disconnect();
      if (idle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [lift, intensity, seed, resolution]);

  return (
    <div ref={wrap} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {state === "fallback" ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 30% 100%, hsl(var(--primary) / 0.22), transparent 70%), radial-gradient(55% 40% at 75% 95%, hsl(var(--primary) / 0.16), transparent 70%)",
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: state === "live" ? 1 : 0 }}
        />
      )}
      {/* Film grain on the dark theme; --noise-url is `none` on paper. */}
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "var(--noise-url)" }} />
    </div>
  );
};

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

export default SilkBackground;
