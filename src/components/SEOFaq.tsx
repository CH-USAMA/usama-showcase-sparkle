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
    q: "Can you own a product end to end?",
    a: "Yes. I take products from architecture through production: React web interfaces, React Native apps, Node.js services, Laravel/PHP application logic, database design, deployment, and monitoring. Engagements start with an architecture call to establish the constraints before code is written.",
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
    q: "How do you choose the stack for a product?",
    a: "By the shape of each layer, not by preference. React and React Native handle web and mobile experiences, TypeScript keeps contracts aligned, Node.js handles services and real-time work, Laravel/PHP carries domain-heavy application logic, and Python handles focused AI and data workloads.",
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
          lead="Common questions about hiring a full-stack product engineer for web, mobile, backend, automation, AI, and VoIP work."
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
