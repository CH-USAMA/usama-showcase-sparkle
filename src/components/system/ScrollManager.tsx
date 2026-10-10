import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { scrollPositions as positions } from "@/lib/scrollPositions";

/**
 * Scroll on navigation, for the plain <BrowserRouter> (React Router's
 * <ScrollRestoration> needs a data router).
 *
 * - New page via a link (PUSH/REPLACE) with no hash: start at the top. Without
 *   this, "Next project" and card clicks opened the new page at the previous
 *   page's scroll offset.
 * - With a hash: leave it to the page; Index and Services scroll to the
 *   anchor once their lazy sections have mounted.
 * - Back/forward (POP): return to where the reader was on that entry. The
 *   browser's own restoration runs before lazy sections have mounted, so it
 *   lands short on long pages; positions are recorded here per history entry
 *   and restored once the page is tall enough.
 *
 * Only the pathname is watched, so filter changes that rewrite the query
 * string (/projects?type=…) keep the reader where they are.
 */

const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const type = useNavigationType();
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    let frame = 0;
    const record = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        positions.set(keyRef.current, window.scrollY);
      });
    };
    window.addEventListener("scroll", record, { passive: true });
    return () => {
      window.removeEventListener("scroll", record);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    if (type === "POP") {
      const target = positions.get(key);
      if (target === undefined) return;
      let raf = 0;
      let tries = 0;
      const restore = () => {
        const reachable = document.documentElement.scrollHeight - window.innerHeight >= target;
        if (reachable || tries++ > 60) {
          window.scrollTo({ top: target, left: 0, behavior: "instant" as ScrollBehavior });
          return;
        }
        raf = requestAnimationFrame(restore);
      };
      restore();
      return () => cancelAnimationFrame(raf);
    }
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    // Without this, focus stays on the link that was clicked (now gone), and
    // the next Tab starts from the bottom of the old page.
    // Pages are lazy chunks, so <main> may not exist yet: wait for it.
    let raf = 0;
    let tries = 0;
    const focusMain = () => {
      const main = document.getElementById("main");
      if (!main) {
        if (tries++ < 120) raf = requestAnimationFrame(focusMain);
        return;
      }
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    };
    focusMain();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run on page change only
  }, [pathname]);

  return null;
};

export default ScrollManager;
