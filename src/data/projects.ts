export const projectsData = {
  1: {
    id: 1,
    title: "AI-Powered Content Pipeline",
    description: "Multi-agent system that autonomously generates, reviews, and publishes content using GPT-4 + LangChain",
    fullDescription: `THE PROBLEM: A SaaS startup's content team was spending over twenty hours a week producing articles, landing pages, and email copy. The process was manual, inconsistent, and could not scale with the product roadmap. Every piece had to pass brand, legal, and SEO checks before publishing, which created a bottleneck that delayed campaigns by days.

    THE APPROACH: I designed a multi-agent pipeline that decomposes content work into discrete, verifiable stages. A main orchestrator agent receives the brief, then delegates research, drafting, SEO optimization, quality review, and publishing to specialized sub-agents. Each stage is observable, retryable, and logged.

    ARCHITECTURE: The orchestration layer is built with LangChain and a stateful graph pattern. The research agent pulls from a curated knowledge base stored in Pinecone, using hybrid vector plus keyword retrieval to ground every article in existing brand material and source documents. The draft agent uses GPT-4 with a structured output schema so headings, meta descriptions, and internal links are generated predictably. A reviewer agent scores each draft against a rubric that covers brand voice, factual accuracy, readability, and SEO criteria. A final publisher stage formats the content and pushes it to the CMS through a typed API.

    AUTOMATION AND OBSERVABILITY: n8n handles scheduling, human approval gates, and notifications. Every run is logged with input brief, generated draft, reviewer scores, and final action. Failed or low-scoring drafts are routed to a human editor queue rather than being published silently. Cost is controlled by routing simpler tasks to smaller models and only invoking GPT-4 for the draft generation step.

    RESULTS: The pipeline replaced the bulk of the manual content production workflow, cutting average time-to-publish from several days to under an hour for routine content. Engagement metrics improved because the output was more consistent and better structured. The system has been running in production with high uptime and clear audit history for every published piece.`,
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
    fullDescription: `THE PROBLEM: A B2B SaaS sales team was spending more than six hours a day manually qualifying inbound leads. Leads arrived from web forms, email, paid campaigns, and partner integrations, but there was no consistent scoring model. High-value leads sat in the same queue as low-fit ones, and response delays caused the company to lose opportunities to faster competitors.

    THE APPROACH: I built an automated lead qualification engine that scores, enriches, categorizes, and routes every lead in real time. The goal was to remove the repetitive triage work while surfacing the right leads to sales within minutes of submission.

    ARCHITECTURE: The system is built around an n8n workflow that receives leads from multiple sources through webhooks and API integrations. Each lead is enriched with company data, then scored by an LLM against an ideal customer profile that includes company size, industry, budget signals, and engagement patterns. The scoring model outputs a numeric score and a short rationale. High-scoring leads are routed to the CRM and to a Slack channel with an AI-generated briefing. Lower-scoring leads enter an automated nurture sequence. The whole pipeline is idempotent, with retries and a dead-letter queue for failures.

    INTEGRATIONS AND OBSERVABILITY: HubSpot receives the scored lead record and a set of custom properties. Sentry and execution logs track errors and scoring anomalies. The workflow exports to version-controlled JSON and is deployed to a self-hosted n8n instance. A React dashboard provides visibility into pipeline health, conversion rates, and score distribution over time.

    RESULTS: The qualification bottleneck disappeared. The sales team now spends its time on leads that have already been scored and briefed, response time dropped to minutes, and the lead-to-close rate improved because the right prospects were reached faster. The system runs continuously without human intervention.`,
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
    fullDescription: `THE PROBLEM: A legal tech startup needed to answer complex legal questions from a large corpus of case law, contracts, and regulations. Generic LLMs produced confident but incorrect answers, often citing non-existent cases or misinterpreting precedents. The firm could not adopt the tool until the answer quality was reliable and every response was traceable to source documents.

    THE APPROACH: I built a Retrieval-Augmented Generation system that grounds every answer in retrieved source material. The system uses a hybrid search approach and a validation layer to prevent hallucinations and surface confidence levels to the user.

    ARCHITECTURE: Documents are ingested through a semantic chunking pipeline that respects section boundaries, headings, and cross-references. Chunks are stored as dense vectors in Pinecone and also indexed for keyword search. At query time, the system runs both vector and BM25 retrieval, then reranks the combined results with a cross-encoder model. The top-k chunks are passed to a generation model with a strict prompt that requires citations and a confidence statement. A separate validation agent cross-references the generated answer against the retrieved context to flag unsupported claims.

    FRONTEND AND USER EXPERIENCE: The React interface shows the answer, a confidence score, and clickable citations that open the referenced document at the relevant passage. Users can inspect the source, which builds trust and makes the tool useful for research rather than just quick answers. Search history and feedback are stored to improve the retrieval model over time.

    RESULTS: The system achieved a measured accuracy of 94% on a held-out set of legal questions, up from 67% with a naive vector-only approach. Response times stayed under three seconds for typical queries. The firm deployed the tool to over fifty legal professionals, and source citations became the most-used feature.`,
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
      { title: "Accuracy Requirements", description: "Legal domain requires extremely high accuracy, hallucinations are unacceptable" },
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
    fullDescription: `THE PROBLEM: Solutions Zilla runs a BPO operation with over forty agents handling inbound and outbound calls. Calls were being routed manually, supervisors had no live visibility into agent state, and leads were frequently lost between the dialer and the CRM. The operation needed a single portal that could route calls intelligently, monitor agents in real time, and keep CRM records synchronized.

    THE APPROACH: I built a call center portal that combines an Asterisk-based dialer with a Laravel backend and a React dashboard. The dialer owns the voice layer, the backend owns the business logic, and the dashboard gives supervisors and agents a live view of the floor.

    ARCHITECTURE: Asterisk handles SIP registration, call bridging, and dialplan execution. The Laravel application connects to Asterisk over the Manager Interface and listens to call events in real time. Agent state, queue depth, and call outcomes are pushed through a Redis-backed WebSocket layer to the React dashboard. Campaign routing rules, lead ordering, and compliance windows live in the Laravel service rather than the dialplan, so they can be tested and versioned. CRM updates are written through queued jobs with retries, ensuring call records and dispositions are never lost because of a temporary API outage.

    INTELLIGENT ROUTING: Calls are routed based on agent availability, skill, language, and recent performance. A dropped call is automatically re-queued or flagged for callback. The system captures call recordings, CDRs, and dispositions, then builds daily and hourly reports for supervisors. A health monitor watches SIP trunk registration, queue length, and agent wrap-up time, alerting the team before a small issue becomes an outage.

    RESULTS: Call routing became faster and more consistent. Supervisors gained real-time visibility that reduced reaction time. Lead loss between the dialer and the CRM dropped to near zero, and the platform handled thousands of daily calls on a single mid-tier server.`,
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
    title: "Focus Interiors, AI-Enhanced E-Commerce",
    description: "Luxury interior design platform with AI recommendations and automated SEO",
    fullDescription: `Focus Interiors is a premium interior design company. This project involved creating a sophisticated e-commerce platform enhanced with AI-powered product recommendations and automated SEO optimization.

    The AI recommendation engine analyzes user behavior, browsing patterns, and purchase history to suggest relevant products. Automated SEO tools generate optimized meta tags, alt text, and structured data for every product listing.

    Performance optimization was critical, the site achieves 95+ Lighthouse scores while serving high-resolution imagery through intelligent lazy loading and CDN optimization.`,
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
    title: "Five Stars Galway, Smart Booking",
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
  },
  8: {
    id: 8,
    title: "Jabulani Hardware Store",
    description: "Complete South African hardware e-commerce platform with Stripe payments, Google login, and fast search",
    fullDescription: `Jabulani Hardware Store is a full-featured e-commerce platform built for a South African hardware and building materials retailer. The platform serves thousands of customers across South Africa with a comprehensive product catalog spanning construction materials, tools, plumbing, electrical, and home improvement categories.

    THE PROBLEM: The retailer was running an entirely offline operation with a paper-based stock ledger. Customers in outlying areas had no way to check availability before driving to the branch, and staff were spending hours a day answering price and stock calls. Any online store had to work on slow mobile connections and had to reflect real branch stock, otherwise it would generate more phone calls, not fewer.

    ARCHITECTURE: The backend is a Laravel application with a React storefront. Products, variants, and stock levels live in MySQL with a denormalized search table rebuilt by a queued job whenever inventory changes, which keeps the catalog query path free of joins. Redis handles session storage, cart state, and a short-lived cache layer on category and product pages. Product imagery is processed on upload into three responsive WebP sizes and served through a CDN, which is where most of the mobile performance gain came from.

    PAYMENTS AND AUTH: Stripe handles card payments with ZAR as the presentment currency, with webhooks driving order state transitions rather than the browser redirect, so a dropped connection after payment never leaves an order stranded. Google OAuth sits alongside email registration; roughly 60% of customers choose it, which measurably reduced abandonment at the account step.

    SEARCH: Product search targets sub-200ms across 5,000+ SKUs. Rather than reaching for a separate search cluster, the implementation uses a MySQL full-text index over a flattened product document plus a prefix index for autocomplete, with filters applied as indexed integer columns. It is a deliberately boring choice that the client's own team can operate without new infrastructure.

    RESULTS AND OPERATIONS: Performance was a top priority, the platform loads in under 2 seconds on 3G connections. The checkout flow was optimized through A/B testing, reducing cart abandonment by 35% with a streamlined 3-step process including guest checkout, saved addresses, and multiple payment options. The admin panel enables inventory management, order tracking, and sales analytics, and the whole stack runs on a single VPS with automated nightly database backups and queue monitoring.`,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=500&fit=crop"
    ],
    technologies: ["Laravel", "React", "Stripe", "Google Auth", "MySQL", "Redis", "CDN"],
    category: "E-Commerce",
    client: "Jabulani Group of Companies (South Africa)",
    duration: "2.5 months",
    teamSize: "Solo developer",
    completionDate: "February 2025",
    liveUrl: "https://store.jabulanigroupofcompanies.co.za",
    githubUrl: "#",
    features: [
      "Stripe Payment Integration",
      "Google OAuth Login",
      "Lightning-Fast Product Search",
      "Real-time Inventory Management",
      "Optimized Checkout Flow",
      "Admin Analytics Dashboard",
      "Mobile-First Responsive Design",
      "CDN-Optimized Product Images"
    ],
    challenges: [
      { title: "Payment Integration", description: "Implementing Stripe for the South African market with ZAR currency support and local payment methods" },
      { title: "Search Performance", description: "Building sub-200ms product search across 5,000+ SKUs with filtering, sorting, and autocomplete" },
      { title: "Mobile Optimization", description: "Ensuring fast load times on slower mobile networks common in South Africa" }
    ],
    results: [
      "35% reduction in cart abandonment",
      "Sub-2 second page loads on 3G",
      "60% of users login via Google Auth",
      "4.8/5 customer satisfaction rating"
    ]
  },
  9: {
    id: 9,
    title: "Solutions Zilla Software",
    description: "Professional software house website showcasing development services and client portfolio",
    fullDescription: `Solutions Zilla Software is the flagship website for a full-service software development company, designed to establish authority in the competitive IT services market and generate high-quality leads.

    The site features a modern, conversion-optimized design with dynamic service pages, interactive technology stack showcases, and detailed case study presentations. Each service page is tailored with industry-specific content and social proof.

    SEO was central to the strategy, the site ranks for key terms like "custom software development," "Laravel development company," and "IT outsourcing Pakistan." Technical SEO includes schema markup, optimized Core Web Vitals, and a comprehensive content strategy.

    The portfolio section includes filterable project showcases with before/after metrics, client testimonials with video integration, and detailed technology breakdowns that demonstrate expertise to potential clients.`,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
    ],
    technologies: ["WordPress", "Custom Theme", "SEO", "UI/UX Design", "Analytics", "Schema Markup"],
    category: "IT Services",
    client: "Solutions Zilla",
    duration: "6 weeks",
    teamSize: "Solo project",
    completionDate: "January 2025",
    liveUrl: "https://software.solutionszilla.com",
    githubUrl: "#",
    features: [
      "Conversion-Optimized Design",
      "Dynamic Service Pages",
      "Interactive Tech Stack Showcase",
      "Detailed Case Studies",
      "Client Testimonial Videos",
      "SEO & Schema Markup",
      "Lead Generation Forms",
      "Performance Analytics"
    ],
    challenges: [
      { title: "Brand Positioning", description: "Differentiating from hundreds of competing software companies with a unique value proposition" },
      { title: "SEO Competition", description: "Ranking for highly competitive software development keywords in a saturated market" },
      { title: "Conversion Rate", description: "Designing a journey that converts technical decision-makers into qualified leads" }
    ],
    results: [
      "45% increase in organic traffic",
      "3x more qualified lead submissions",
      "Top 5 ranking for target keywords",
      "2.5% visitor-to-lead conversion rate"
    ]
  }
};
