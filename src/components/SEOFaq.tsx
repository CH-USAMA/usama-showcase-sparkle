import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can you own a Laravel backend end to end?",
    a: "Yes. I take Laravel systems from architecture through to production: domain modelling, API design, queue and event flow, database schema and indexing, deployment, and the monitoring that tells you when something is wrong. Engagements start with an architecture call to establish the constraints before any code is written.",
  },
  {
    q: "Which AI and automation stacks do you specialize in?",
    a: "I work with Claude, OpenAI GPT models, LangChain, RAG pipelines, vector databases like Pinecone and pgvector, n8n workflow automation, and MCP agents. I integrate these safely into existing Laravel and Node backends with proper guardrails and observability.",
  },
  {
    q: "Can you build a VoIP or call-center system for my business?",
    a: "Yes. I build self-hosted call centers on Asterisk and FreePBX with intelligent dispatch, IVR flows, predictive dialers, SIP trunking, and CRM-integrated call workflows. I also build real-time communication systems on Laravel Reverb, Pusher, and Socket.IO.",
  },
  {
    q: "Do you offer ongoing support and maintenance?",
    a: "Yes. Beyond the initial build, I offer monthly retainers for new features, scaling, performance tuning, incident response, and technical debt reviews. This keeps your backend compounding value over time.",
  },
  {
    q: "What's your process for starting a new project?",
    a: "Every engagement starts with a free 30-minute discovery call to understand your goals and constraints. I then deliver a clear technical proposal with stack, architecture, milestones, timeline, and a fixed quote before any code is written.",
  },
  {
    q: "How do you decide between Laravel, Node.js and Python on a system?",
    a: "By the shape of the problem, not by preference. Laravel and PHP carry the application core: domain logic, APIs, queues and billing, with MySQL or PostgreSQL and Redis behind them. Node.js and TypeScript take the event-driven edge: WebSockets, socket services, integrations. Python takes the work that is AI or data: RAG pipelines, agents, processing. Asterisk and SIP handle telephony, and Docker and CI/CD ship all of it.",
  },
];

const SEOFaq = () => {
  return (
    <section className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">FAQ</span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-bold mb-4 text-foreground tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
              Common questions about hiring a senior backend engineer, automation, AI, and VoIP work.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-border/30 rounded-2xl px-6 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors"
                >
                  <AccordionTrigger className="text-left text-foreground font-inter font-semibold hover:text-primary transition-colors text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed font-inter">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default SEOFaq;
