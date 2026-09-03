import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import SectionHeader from "@/components/system/SectionHeader";
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
    <section
      className="wash band band-edge relative py-24 lg:py-32"
      style={{
        "--hue": "var(--hue-realtime)",
        "--hue-2": "var(--hue-cloud)",
        "--wash-x": "72%",
        "--wash-y": "6%",
      } as CSSProperties}
    >
      <div className="container mx-auto">
        <SectionHeader
          index="11"
          eyebrow="FAQ"
          title="The questions that come up first."
          lead="Common questions about hiring a senior backend engineer, and about automation, AI and VoIP work."
        />

        <div className="mt-12 max-w-3xl lg:mt-16">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="card-surface card-surface-hover px-6"
                >
                  <AccordionTrigger className="text-left text-foreground font-inter font-semibold hover:text-hue transition-colors text-base">
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
