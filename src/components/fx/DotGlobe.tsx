import { useEffect, useRef } from "react";
import { readToken } from "@/components/fx/color";

/**
 * A slowly turning globe of dots, drawn on a 2D canvas.
 *
 * Dots sit on latitude rings, spaced so the density is even across the
 * sphere; the far side is culled and the near side brightens toward the
 * viewer, which is all the depth it needs. About a thousand dots per frame at
 * 30 fps, only while on screen, and a single still frame under reduced motion.
 */

interface Dot {
  lat: number;
  lon: number;
}

const DOTS: Dot[] = (() => {
  const out: Dot[] = [];
  const step = (6.5 * Math.PI) / 180;
  for (let lat = -Math.PI / 2 + step; lat < Math.PI / 2 - step / 2; lat += step) {
    const ring = Math.max(1, Math.round((2 * Math.PI * Math.cos(lat)) / step));
    for (let i = 0; i < ring; i++) out.push({ lat, lon: (i / ring) * Math.PI * 2 });
  }
  return out;
})();

const TILT = 0.38;

const DotGlobe = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rot = 0.6;
    let raf = 0;
    let last = 0;
    let onScreen = false;
    let colour = "255,255,255";
    let accent = "51,153,255";

    const readColours = () => {
      const f = readToken("--foreground");
      const a = readToken("--primary");
      colour = hslToRgbStr(f.h, f.s, f.l);
      accent = hslToRgbStr(a.h, a.s, a.l);
    };

    const size = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const r = Math.min(w, h) * 0.46;
      const cx = w / 2;
      const cy = h / 2;
      const ct = Math.cos(TILT);
      const st = Math.sin(TILT);
      const dot = 1.4 * dpr;

      for (const d of DOTS) {
        const cl = Math.cos(d.lat);
        const x = cl * Math.sin(d.lon + rot);
        const y = Math.sin(d.lat);
        const z0 = cl * Math.cos(d.lon + rot);
        const y2 = y * ct - z0 * st;
        const z = y * st + z0 * ct;
        if (z < -0.1) continue;
        const depth = (z + 0.1) / 1.1;
        // A band of dots near the lit limb picks up the accent.
        const lit = x > 0.55 && z > 0.2;
        ctx.fillStyle = `rgba(${lit ? accent : colour},${(0.14 + depth * (lit ? 0.8 : 0.6)).toFixed(3)})`;
        const s = dot * (0.7 + depth * 0.6);
        ctx.fillRect(cx + x * r - s / 2, cy - y2 * r - s / 2, s, s);
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 33) return;
      const dt = Math.min(now - last, 100);
      last = now;
      rot += dt * 0.00008;
      draw();
    };

    const start = () => {
      if (reduced || raf || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    readColours();
    size();
    draw();

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      readColours();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-accent"] });
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
};

function hslToRgbStr(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return `${f(0)},${f(8)},${f(4)}`;
}

export default DotGlobe;
