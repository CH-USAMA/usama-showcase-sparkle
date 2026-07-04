import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };
type Lead = { name: string; email: string; phone: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const FORMSPREE_URL = "https://formspree.io/f/mkgzjlde";
const LEAD_KEY = "usama_chat_lead_v1";

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      onError(data.error || "Something went wrong");
      return;
    }

    if (!resp.body) { onError("No response"); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {}
      }
    }
    onDone();
  } catch {
    onError("Connection failed. Please try again.");
  }
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lead, setLead] = useState<Lead | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [leadForm, setLeadForm] = useState<Lead>({ name: "", email: "", phone: "" });
  const [leadError, setLeadError] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey! 👋 I'm Usama's AI assistant. Ask me anything about his skills, services, or how he can help your project!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const chatSentRef = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    if (lead) inputRef.current?.focus();
    else nameRef.current?.focus();
  }, [isOpen, lead]);

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = leadForm.name.trim();
    const email = leadForm.email.trim();
    const phone = leadForm.phone.trim();
    if (!name) { setLeadError("Please enter your name."); return; }
    if (!email && !phone) { setLeadError("Please share an email or phone number."); return; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLeadError("Please enter a valid email address."); return;
    }
    setLeadError("");
    const newLead: Lead = { name, email, phone };
    setLead(newLead);
    try { localStorage.setItem(LEAD_KEY, JSON.stringify(newLead)); } catch {}

    // Notify Usama immediately about the new lead
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New Chatbot Lead",
          name, email, phone,
          source: "AI Chatbot - Lead Capture",
        }),
      });
    } catch (err) {
      console.error("Lead submit failed:", err);
    }

    setMessages([
      { role: "assistant", content: `Thanks ${name.split(" ")[0]}! 🎉 I've saved your details. Now, what can I help you with today?` }
    ]);
  };

  const emailChatTranscript = async () => {
    const userMessages = messages.filter(m => m.role === "user");
    if (userMessages.length === 0 || chatSentRef.current || !lead) return;
    chatSentRef.current = true;

    const transcript = messages
      .map(m => `${m.role === "user" ? lead.name : "AI Assistant"}: ${m.content}`)
      .join("\n\n");

    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Chat Transcript: ${lead.name}`,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          message: transcript,
          source: "AI Chatbot",
        }),
      });
    } catch (e) {
      console.error("Failed to email chat transcript:", e);
    }
  };

  const handleClose = () => {
    emailChatTranscript();
    setIsOpen(false);
  };

  const send = async () => {
    if (!input.trim() || isLoading || !lead) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const updateAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > newMessages.length) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev.slice(0, newMessages.length), { role: "assistant", content: assistantSoFar }];
      });
    };

    const contextMsg: Msg = {
      role: "user",
      content: `[Visitor info — Name: ${lead.name}${lead.email ? `, Email: ${lead.email}` : ""}${lead.phone ? `, Phone: ${lead.phone}` : ""}]\n\n${userMsg.content}`,
    };
    const apiMessages = [...newMessages.slice(1, -1), contextMsg];

    await streamChat({
      messages: apiMessages,
      onDelta: updateAssistant,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setMessages(prev => [...prev, { role: "assistant", content: `Sorry, ${err}` }]);
        setIsLoading(false);
      },
    });
  };

  const suggestions = [
    "What can Usama build?",
    "Tell me about AI agents",
    "How to hire Usama?",
  ];

  const userMessageCount = messages.filter(m => m.role === "user").length;
  const showBookingCTA = userMessageCount >= 2;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-glow hover:shadow-cool hover:scale-110 transition-all duration-300 relative"
              aria-label="Open chat"
            >
              <Bot className="w-7 h-7" />
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </Button>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-20 right-0 bg-card border border-border rounded-xl p-3 shadow-elegant whitespace-nowrap"
            >
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                Ask my AI anything!
              </div>
              <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-2rem)] bg-background border border-border rounded-2xl shadow-elegant flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground text-sm">Usama's AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-primary-foreground/80">Online • Powered by AI</span>
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleClose}
                className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {!lead ? (
              /* Lead capture */
              <div className="flex-1 overflow-y-auto p-5">
                <div className="text-center mb-5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-1">Before we start</h4>
                  <p className="text-xs text-muted-foreground">
                    Quick intro so Usama can follow up if needed.
                  </p>
                </div>
                <form onSubmit={submitLead} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Your name *</label>
                    <Input
                      ref={nameRef}
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="h-9 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Email</label>
                    <Input
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="you@company.com"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Phone / WhatsApp</label>
                    <Input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="+1 555 000 1234"
                      className="h-9 text-sm"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Share at least one: email or phone number.
                  </p>
                  {leadError && (
                    <p className="text-xs text-destructive">{leadError}</p>
                  )}
                  <Button type="submit" className="w-full h-9 text-sm">
                    Start chatting
                  </Button>
                </form>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user" ? "bg-primary/20" : "bg-accent/20"
                      }`}>
                        {msg.role === "user" ? <User className="w-3.5 h-3.5 text-primary" /> : <Bot className="w-3.5 h-3.5 text-accent" />}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}>
                        <div className="prose prose-sm prose-invert max-w-none [&>p]:m-0 [&>p]:leading-relaxed">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-muted-foreground/50"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {messages.length === 1 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs text-muted-foreground">Quick questions:</p>
                      {suggestions.map((s, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          onClick={() => { setInput(s); }}
                          className="block w-full text-left text-xs px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-3 border-t border-border bg-card">
                  <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Usama's services..."
                      className="flex-1 text-sm h-9 bg-background"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isLoading}
                      className="h-9 w-9 rounded-lg"
                      aria-label="Send"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
