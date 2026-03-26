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
    q: "Can I hire you as a Laravel, PHP & MySQL developer?",
    a: "Absolutely! I'm a top-rated Laravel, PHP, and MySQL developer with 5+ years of experience and 180+ projects delivered. I build custom web applications, REST APIs, SaaS platforms, e-commerce solutions, and CRM systems. I'm available on Upwork, Fiverr, or for direct hire.",
  },
  {
    q: "What is vibe coding and do you offer it as a service?",
    a: "Vibe coding is a modern development approach where I use AI tools like Claude, Lovable, Cursor AI, and Replit to build production-ready applications 10x faster. I combine vibe coding with deep expertise in Laravel, React, and PHP to deliver high-quality projects in record time — often weeks instead of months.",
  },
  {
    q: "Which AI tools do you specialize in — Claude, ChatGPT, or others?",
    a: "I work extensively with Claude (Anthropic), ChatGPT (OpenAI), LangChain, and the full AI development ecosystem. I build custom chatbots, RAG systems, multi-agent pipelines, and integrate AI into existing business workflows using n8n automation.",
  },
  {
    q: "Can you build an AI chatbot or automation system for my business?",
    a: "Yes! I specialize in AI-powered business solutions — from intelligent chatbots and customer support agents to end-to-end workflow automation with n8n, WhatsApp API integration, and AI-driven lead qualification systems. I've helped businesses automate 20+ hours of manual work per week.",
  },
  {
    q: "Do you teach Laravel, PHP, AI, or vibe coding?",
    a: "Yes, I'm a recommended tutor on TeacherOn and offer mentoring in Laravel, PHP, MySQL, AI engineering, and vibe coding. Whether you want to learn modern PHP development or how to use Claude and Cursor AI for faster coding, I can help you level up.",
  },
  {
    q: "What's your tech stack for full-stack development?",
    a: "My primary stack includes Laravel (PHP) with MySQL for backends, React/Next.js with TypeScript for frontends, and Supabase/AWS for cloud infrastructure. I also use n8n for automation, LangChain for AI orchestration, and Docker for containerized deployments.",
  },
];

const SEOFaq = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Common questions about hiring a Laravel PHP developer, AI engineering, vibe coding, and my services
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-left text-foreground font-semibold hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
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
