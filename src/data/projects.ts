export const projectsData = {
  1: {
    id: 1,
    title: "AI-Powered Content Pipeline",
    description: "Multi-agent system that autonomously generates, reviews, and publishes content using GPT-4 + LangChain",
    fullDescription: `This project is a production-grade multi-agent content pipeline that I architected from scratch. It uses a Main Orchestrator Agent that delegates tasks to specialized sub-agents for research, writing, SEO optimization, and quality review.

    The system leverages LangChain for agent orchestration, GPT-4 for content generation, and n8n for workflow automation. Each piece of content goes through a 4-stage pipeline: Research → Draft → Review → Publish — all autonomously.

    The RAG component pulls from a curated knowledge base stored in Pinecone, ensuring content is factually grounded and brand-consistent. The review agent uses a custom evaluation rubric to score content quality before publishing.

    This pipeline replaced 20+ hours/week of manual content work for the client, achieving 10x faster content production with measurably higher engagement metrics.`,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop"
    ],
    technologies: ["LangChain", "GPT-4", "n8n", "React", "Supabase", "Pinecone"],
    category: "AI Agents",
    client: "SaaS Startup (NDA)",
    duration: "6 weeks",
    teamSize: "Solo architect",
    completionDate: "June 2025",
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Multi-Agent Orchestration",
      "RAG-Powered Research",
      "Autonomous Content Generation",
      "Quality Scoring & Review",
      "SEO Auto-Optimization",
      "n8n Workflow Integration",
      "Real-time Dashboard",
      "Scheduled Publishing"
    ],
    challenges: [
      { title: "Agent Coordination", description: "Designing reliable inter-agent communication with proper error handling and retry logic" },
      { title: "Content Quality", description: "Ensuring AI-generated content meets brand guidelines and factual accuracy standards" },
      { title: "Cost Optimization", description: "Balancing GPT-4 quality with cost efficiency through intelligent model routing" }
    ],
    results: [
      "10x faster content production",
      "85% reduction in manual work",
      "40% higher engagement vs manual content",
      "99.2% uptime in production"
    ]
  },
  2: {
    id: 2,
    title: "Smart Lead Qualification Engine",
    description: "AI-driven lead scoring with n8n automation, reducing qualification time by 85%",
    fullDescription: `Built an intelligent lead qualification system that combines n8n workflow automation with OpenAI's GPT-4 to score, categorize, and route leads automatically.

    The system ingests leads from multiple sources (web forms, email, API integrations), enriches them with company data, and uses AI to score each lead on a 1-10 scale based on custom criteria including company size, industry fit, budget signals, and engagement patterns.

    High-scoring leads are automatically routed to sales reps via Slack with AI-generated briefings. Low-scoring leads enter nurture sequences. The entire pipeline runs 24/7 without human intervention.

    Integration with the client's CRM (HubSpot) ensures seamless data flow, and a real-time dashboard built in React provides visibility into pipeline health and conversion metrics.`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop"
    ],
    technologies: ["n8n", "OpenAI API", "PostgreSQL", "Next.js", "HubSpot API", "Webhook"],
    category: "Automation",
    client: "B2B SaaS Company",
    duration: "4 weeks",
    teamSize: "Solo developer",
    completionDate: "May 2025",
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "AI Lead Scoring (1-10)",
      "Multi-Source Lead Ingestion",
      "Automated CRM Sync",
      "Slack Notifications",
      "AI-Generated Lead Briefings",
      "Nurture Sequence Automation",
      "Real-time Analytics Dashboard",
      "Custom Scoring Rules"
    ],
    challenges: [
      { title: "Scoring Accuracy", description: "Developing an AI scoring model that aligned with the client's ideal customer profile" },
      { title: "Integration Complexity", description: "Connecting multiple data sources and CRM systems reliably" },
      { title: "Real-time Processing", description: "Ensuring leads are scored and routed within minutes of submission" }
    ],
    results: [
      "85% reduction in qualification time",
      "3x increase in sales team efficiency",
      "45% improvement in lead-to-close rate",
      "24/7 autonomous operation"
    ]
  },
  3: {
    id: 3,
    title: "RAG-Powered Legal Assistant",
    description: "Production RAG system with 94% accuracy on legal queries using hybrid search",
    fullDescription: `Designed and deployed a Retrieval-Augmented Generation system for a legal tech company that needed accurate, reliable answers to complex legal questions.

    The system uses a hybrid search approach combining vector similarity (Pinecone) with BM25 keyword matching, achieving 94% accuracy — up from 67% with naive vector-only RAG.

    Key innovations include semantic chunking that respects document structure, a re-ranking layer using a cross-encoder model, and a validation agent that cross-references generated answers against retrieved context to prevent hallucinations.

    The frontend is built with React and provides a chat-like interface with source citations, confidence scores, and the ability to drill down into referenced documents.`,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop"
    ],
    technologies: ["RAG", "Pinecone", "Python", "FastAPI", "React", "LangChain"],
    category: "Deep Learning",
    client: "Legal Tech Startup",
    duration: "8 weeks",
    teamSize: "2 engineers",
    completionDate: "April 2025",
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Hybrid Search (Vector + BM25)",
      "Semantic Document Chunking",
      "Cross-Encoder Re-ranking",
      "Hallucination Prevention",
      "Source Citations",
      "Confidence Scoring",
      "Document Drill-down",
      "Admin Analytics"
    ],
    challenges: [
      { title: "Accuracy Requirements", description: "Legal domain requires extremely high accuracy — hallucinations are unacceptable" },
      { title: "Document Complexity", description: "Processing complex legal documents with nested structures and cross-references" },
      { title: "Latency Optimization", description: "Keeping response times under 3 seconds despite complex retrieval pipeline" }
    ],
    results: [
      "94% accuracy (up from 67%)",
      "Sub-3 second response times",
      "10,000+ documents indexed",
      "Deployed to 50+ legal professionals"
    ]
  },
  4: {
    id: 4,
    title: "Solutions Zilla Call Portal",
    description: "Enterprise call center management with AI-powered analytics and intelligent routing",
    fullDescription: `Solutions Zilla Call Portal is a comprehensive web application for BPO and call center operations, enhanced with AI-powered analytics and intelligent call routing.

    The portal features a sophisticated backend built with Laravel, providing secure user management, lead tracking, and detailed analytics. AI integration enables automatic call sentiment analysis, agent performance scoring, and predictive lead routing.

    The dashboard offers real-time insights into call center performance with customizable widgets, exportable reports, and automated alerting. The system handles thousands of leads daily with sub-second query performance.`,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
    ],
    technologies: ["Laravel", "Next.js", "MySQL", "TailwindCSS", "AI Analytics", "API Integration"],
    category: "Enterprise",
    client: "Solutions Zilla",
    duration: "3 months",
    teamSize: "2 developers",
    completionDate: "January 2025",
    liveUrl: "https://call.solutionszilla.com",
    githubUrl: "#",
    features: [
      "AI-Powered Analytics",
      "Intelligent Call Routing",
      "CRM Workflows",
      "Real-time Dashboard",
      "Sentiment Analysis",
      "Performance Scoring",
      "Lead Management",
      "API Integrations"
    ],
    challenges: [
      { title: "Scale", description: "Handling thousands of daily leads with real-time analytics and sub-second queries" },
      { title: "AI Integration", description: "Embedding AI capabilities into existing call center workflows seamlessly" },
      { title: "Security", description: "Implementing robust security for sensitive client and lead data" }
    ],
    results: [
      "30% improvement in lead conversion",
      "50% faster data processing",
      "AI-driven agent performance insights",
      "Real-time operational visibility"
    ]
  },
  5: {
    id: 5,
    title: "Focus Interiors — AI-Enhanced E-Commerce",
    description: "Luxury interior design platform with AI recommendations and automated SEO",
    fullDescription: `Focus Interiors is a premium interior design company. This project involved creating a sophisticated e-commerce platform enhanced with AI-powered product recommendations and automated SEO optimization.

    The AI recommendation engine analyzes user behavior, browsing patterns, and purchase history to suggest relevant products. Automated SEO tools generate optimized meta tags, alt text, and structured data for every product listing.

    Performance optimization was critical — the site achieves 95+ Lighthouse scores while serving high-resolution imagery through intelligent lazy loading and CDN optimization.`,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop"
    ],
    technologies: ["Shopify", "React", "OpenAI", "SEO Automation", "APIs"],
    category: "E-Commerce",
    client: "Focus Interiors (Pakistan)",
    duration: "2 months",
    teamSize: "Solo project",
    completionDate: "March 2024",
    liveUrl: "https://focusinteriors.com.pk",
    githubUrl: "#",
    features: [
      "AI Product Recommendations",
      "Automated SEO Optimization",
      "Premium Design Aesthetic",
      "Fast Loading Galleries",
      "Performance Optimization",
      "Mobile Responsive",
      "Structured Data",
      "Analytics Dashboard"
    ],
    challenges: [
      { title: "Performance", description: "Optimizing high-resolution images while maintaining luxury visual quality" },
      { title: "AI Integration", description: "Building recommendation engine within Shopify's ecosystem constraints" },
      { title: "SEO Competition", description: "Ranking for highly competitive interior design keywords" }
    ],
    results: [
      "35% increase in client inquiries",
      "95+ Lighthouse performance score",
      "Top 3 ranking for target keywords",
      "AI-driven product discovery"
    ]
  },
  6: {
    id: 6,
    title: "Five Stars Galway — Smart Booking",
    description: "Taxi booking platform with intelligent route optimization and automated dispatch",
    fullDescription: `Five Stars Galway Taxis is a premium taxi service in Ireland. The project focused on creating an intelligent booking platform with route optimization and automated dispatch capabilities.

    Google Maps integration provides accurate fare estimates and optimal routing. The booking system includes automated dispatch logic that assigns drivers based on proximity, availability, and predicted demand patterns.

    Local SEO optimization captures customers searching for taxi services in the Galway area, with the mobile-first design ensuring seamless booking from any device.`,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop"
    ],
    technologies: ["WordPress", "Google Maps API", "Booking System", "SEO", "Automation"],
    category: "Transport",
    client: "Five Stars Galway Taxis (Ireland)",
    duration: "1.5 months",
    teamSize: "Solo project",
    completionDate: "February 2024",
    liveUrl: "https://www.fivestarsgalwaytaxis.ie",
    githubUrl: "#",
    features: [
      "Online Booking System",
      "Google Maps Integration",
      "Fare Calculator",
      "Automated Dispatch",
      "Local SEO Optimization",
      "Mobile-First Design",
      "Real-time Availability",
      "Customer Reviews"
    ],
    challenges: [
      { title: "Route Optimization", description: "Implementing intelligent routing within booking system constraints" },
      { title: "Local SEO", description: "Standing out in a competitive local market with strong search presence" },
      { title: "Mobile UX", description: "Ensuring frictionless mobile booking experience for on-the-go users" }
    ],
    results: [
      "50% increase in online bookings",
      "40% reduction in phone calls",
      "Top 5 local search rankings",
      "Improved customer satisfaction"
    ]
  },
  7: {
    id: 7,
    title: "Solutions Zilla Digital",
    description: "AI-enhanced corporate website for IT and BPO operations with smart lead gen",
    fullDescription: `Solutions Zilla Digital is the main corporate presence for an IT and BPO service provider, featuring AI-enhanced lead generation and intelligent content management.

    The website serves as the primary lead generation platform, with AI-powered chatbot integration for instant visitor engagement and qualification. Service pages are optimized with structured data and dynamic content that adapts based on visitor industry and behavior.

    The content management system includes AI-assisted writing tools for blog posts and case studies, maintaining consistent brand voice while scaling content production.`,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
    ],
    technologies: ["WordPress", "AI Chatbot", "SEO Automation", "Analytics"],
    category: "IT Services",
    client: "Solutions Zilla",
    duration: "2 months",
    teamSize: "Solo project",
    completionDate: "September 2023",
    liveUrl: "https://digital.solutionszilla.com",
    githubUrl: "#",
    features: [
      "AI Chatbot Integration",
      "Smart Lead Generation",
      "Dynamic Content",
      "Service Portfolio",
      "Case Studies Section",
      "SEO Automation",
      "Performance Analytics",
      "Contact Integration"
    ],
    challenges: [
      { title: "AI Chatbot", description: "Training the chatbot to handle diverse service inquiries accurately" },
      { title: "Lead Quality", description: "Using AI to filter and qualify leads before they reach the sales team" },
      { title: "Content Scale", description: "Maintaining quality while scaling content production with AI assistance" }
    ],
    results: [
      "40% increase in qualified inquiries",
      "60% faster lead response time",
      "Enhanced market positioning",
      "AI-driven visitor engagement"
    ]
  }
};
