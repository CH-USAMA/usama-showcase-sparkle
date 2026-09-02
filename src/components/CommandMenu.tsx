import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Braces,
  CalendarCheck,
  Download,
  FileText,
  FolderKanban,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Newspaper,
  Terminal,
  User,
  Workflow,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { trackEvent } from "@/lib/analytics";
import { CV_URL, CV_FILENAME, OWNER, SOCIALS, WHATSAPP_URL } from "@/data/site";

interface Entry {
  id: string;
  label: string;
  hint?: string;
  icon: typeof Terminal;
  run: () => void;
  keywords?: string;
}

/**
 * Command menu — ⌘K / Ctrl-K, or "/" from anywhere outside a text field.
 *
 * Built on the cmdk primitive already vendored into the project, so it adds
 * navigation and keyboard access without adding a dependency. Focus trapping,
 * escape handling and aria wiring come from the underlying dialog.
 */
const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isTypingTarget = (el: EventTarget | null) => {
      const node = el as HTMLElement | null;
      if (!node) return false;
      const tag = node.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        node.isContentEditable
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // "/" opens it too, but never while the visitor is typing into a field.
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    const onRequest = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onRequest);
    };
  }, []);

  const go = useCallback(
    (action: () => void, id: string) => () => {
      setOpen(false);
      trackEvent("command_menu_select", { item: id });
      // let the dialog finish closing before we move the page
      requestAnimationFrame(action);
    },
    []
  );

  const scrollTo = (hash: string) => () => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    } else {
      navigate(`/#${hash}`);
    }
  };

  const navigation: Entry[] = [
    { id: "about", label: "/about", hint: "How I think", icon: User, run: scrollTo("about") },
    { id: "services", label: "/services", hint: "What I build", icon: Workflow, run: scrollTo("services") },
    { id: "work", label: "/work", hint: "Selected systems", icon: FolderKanban, run: scrollTo("work") },
    { id: "architecture", label: "/architecture", hint: "Request lifecycle", icon: Braces, run: scrollTo("about") },
    { id: "pricing", label: "/pricing", hint: "Engagements", icon: FileText, run: scrollTo("pricing") },
    { id: "contact", label: "/contact", hint: "Start a conversation", icon: Mail, run: scrollTo("contact") },
  ];

  const pages: Entry[] = [
    { id: "book", label: "Book an architecture call", icon: CalendarCheck, run: () => navigate("/book") },
    { id: "projects", label: "All projects", icon: FolderKanban, run: () => navigate("/projects") },
    { id: "blog", label: "Engineering blog", icon: Newspaper, run: () => navigate("/blog") },
    { id: "services-page", label: "Service detail pages", icon: Workflow, run: () => navigate("/services") },
  ];

  const actions: Entry[] = [
    {
      id: "cv",
      label: "Download CV",
      icon: Download,
      run: () => {
        const a = document.createElement("a");
        a.href = CV_URL;
        a.download = CV_FILENAME;
        a.click();
      },
    },
    { id: "email", label: `Email ${OWNER.email}`, icon: Mail, run: () => { window.location.href = `mailto:${OWNER.email}`; } },
    { id: "whatsapp", label: "Message on WhatsApp", icon: MessageCircle, run: () => window.open(WHATSAPP_URL, "_blank", "noopener") },
    { id: "github", label: "GitHub", icon: Github, run: () => window.open(SOCIALS.github, "_blank", "noopener") },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, run: () => window.open(SOCIALS.linkedin, "_blank", "noopener") },
  ];

  const renderGroup = (heading: string, entries: Entry[]) => (
    <CommandGroup heading={heading}>
      {entries.map((e) => {
        const Icon = e.icon;
        return (
          <CommandItem
            key={e.id}
            value={`${e.label} ${e.hint ?? ""} ${e.keywords ?? ""}`}
            onSelect={go(e.run, e.id)}
            className="gap-3"
          >
            <Icon className="h-4 w-4 text-primary/80" aria-hidden="true" />
            <span className="font-inter text-[13.5px]">{e.label}</span>
            {e.hint && (
              <CommandShortcut className="font-mono text-[10.5px] tracking-wider text-subtle">
                {e.hint}
              </CommandShortcut>
            )}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a section, page, or action…" />
      <CommandList className="max-h-[22rem]">
        <CommandEmpty className="py-8 text-center font-inter text-[13px] text-subtle">
          Nothing matches that.
        </CommandEmpty>
        {renderGroup("Navigate", navigation)}
        <CommandSeparator />
        {renderGroup("Pages", pages)}
        <CommandSeparator />
        {renderGroup("Actions", actions)}
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
