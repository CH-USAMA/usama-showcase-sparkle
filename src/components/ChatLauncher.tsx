import { lazy, Suspense, useCallback, useState } from "react";
import { Bot } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/*
 * The chat panel (framer-motion, react-markdown, the streaming client) is
 * ~100 kB gzipped that most visitors never open. Only this button ships with
 * the page; the panel's chunk is fetched when the pointer or focus reaches the
 * button, so it is usually ready before the click lands.
 */
const loadPanel = () => import("@/components/AIChatbot");
const AIChatbot = lazy(loadPanel);

const ChatLauncher = () => {
  const [open, setOpen] = useState(false);
  const prefetch = useCallback(() => {
    void loadPanel();
  }, []);

  return (
    <>
      {!open && (
        <div className="enter fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6" style={{ "--enter-delay": "600ms" } as React.CSSProperties}>
          <button
            type="button"
            onPointerEnter={prefetch}
            onFocus={prefetch}
            onTouchStart={prefetch}
            onClick={() => {
              setOpen(true);
              trackEvent("chatbot_open");
            }}
            className="group inline-flex items-center gap-2.5 rounded-full border border-hairline/[0.12] bg-surface-1 py-2 pl-2 pr-4 shadow-elegant transition-colors duration-standard hover:border-hairline/[0.24]"
            aria-label="Ask my AI assistant"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-inter text-sm font-medium text-foreground">Ask my AI</span>
          </button>
        </div>
      )}
      {open && (
        <Suspense fallback={null}>
          <AIChatbot onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default ChatLauncher;
