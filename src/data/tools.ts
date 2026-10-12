/**
 * Free tools under /tools: titles, search copy, the how-to sections and FAQs
 * that sit under each tool. Plain data with no imports, so scripts/prerender.ts
 * and scripts/generate-sitemap.ts can read it. Each tool's own options live in
 * src/data/tools/*.ts.
 */

export interface ToolSection {
  heading: string;
  body: string;
}

export interface ToolMeta {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** One line for the /tools index and related links. */
  summary: string;
  lead: string;
  guide: ToolSection[];
  faqs: { q: string; a: string }[];
}

export const TOOLS_INDEX = {
  metaTitle: "Free AI and Product Tools | Usama Munawar",
  metaDescription:
    "Free browser tools for founders and developers: an AI prompt builder, an MVP scope planner, an AI API cost calculator and a GitHub README generator.",
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "prompt-builder",
    name: "AI Prompt Builder",
    metaTitle: "Free AI Prompt Builder for ChatGPT, Claude & Gemini",
    metaDescription:
      "Build a clear, complete prompt in a minute: add context, task, tone, length and format, choose the answer's language, and copy it into any AI assistant.",
    summary: "Turn a rough request into a clear prompt for ChatGPT, Claude or Gemini, in any answer language.",
    lead: "Answer a few questions and get a clear, complete prompt for ChatGPT, Claude or Gemini. Free, no sign-up, and nothing you type leaves your browser.",
    guide: [
      {
        heading: "Why structured prompts work",
        body: "AI assistants fill gaps with guesses. A prompt that states the background, the task, the audience and the format leaves fewer gaps, so the first answer is closer to what you need and you spend less time rewriting it.",
      },
      {
        heading: "How to use the builder",
        body: "Pick a starting point or start blank. Describe the task in a sentence or two, add the background the assistant cannot know, then set the tone, length and format. The prompt updates as you type. Copy it into your assistant, then refine the answer with follow-ups such as \"shorter\" or \"more formal\".",
      },
      {
        heading: "Getting the answer in another language",
        body: "Choose an answer language and the prompt asks for the reply in that language, so you can write in English and get the answer in French, Arabic, Urdu or Spanish. For anything important, such as a contract or a public post, have a native speaker check the result.",
      },
    ],
    faqs: [
      {
        q: "Is the prompt builder free?",
        a: "Yes. There is no sign-up and no limit. It runs entirely in your browser, so nothing you type is sent to a server.",
      },
      {
        q: "Does it work with ChatGPT, Claude and Gemini?",
        a: "Yes. The prompt is plain text, so it works in any AI assistant, including ChatGPT, Claude, Gemini and Copilot.",
      },
      {
        q: "What makes a good prompt?",
        a: "Four things: the background, a clear task, details such as audience, tone and length, and the format you want back. The free guide on using AI in daily life covers each one with examples.",
      },
      {
        q: "Can I paste personal or confidential information?",
        a: "Keep passwords, ID numbers and financial details out of prompts, and check your workplace's rules before pasting company information into any AI tool.",
      },
    ],
  },
  {
    slug: "mvp-planner",
    name: "MVP Scope Planner",
    metaTitle: "MVP Scope Planner: Plan Your App's First Version",
    metaDescription:
      "Pick your app type and features, decide what goes in the first version, and get a one-page MVP plan with complexity, a timeline range and a suggested stack.",
    summary: "Decide what goes in your app's first version and get a one-page plan with complexity and a timeline range.",
    lead: "Choose what you are building and the features you have in mind. The planner splits them into a first version and later, rates the complexity, and gives you a one-page plan to copy or send.",
    guide: [
      {
        heading: "What an MVP should include",
        body: "A minimum viable product is the smallest version that lets real users complete the one job your product exists for. Everything else, from reviews to dashboards, can wait until people use the core. The most common reason a first version runs late is a feature list that was never cut.",
      },
      {
        heading: "How the planner estimates complexity",
        body: "Each feature carries a weight based on how much work it usually takes: sign-in is small, in-app chat and seller payouts are large. Platforms add to it, because a mobile app needs store releases and device testing. The timeline is a typical range for a first version of that size, not a quote; a real estimate needs a conversation about the details.",
      },
      {
        heading: "Turning the plan into a build",
        body: "Take the first-version list to whoever will build it and ask them to challenge it. If you would like a second opinion, send the plan with the form above and I will reply with what I would cut, what I would add, and what it would take.",
      },
    ],
    faqs: [
      {
        q: "How long does it take to build an MVP?",
        a: "Most first versions take somewhere between a few weeks and three months. The biggest factors are the number of features in the first version, whether it needs a mobile app, and integrations with other systems. The planner shows a typical range for the scope you choose.",
      },
      {
        q: "Should my MVP be a web app or a mobile app?",
        a: "If you are still testing whether people want it, a web app is usually faster and cheaper: no app store review, no installs, and one codebase. Build mobile first when the core experience depends on the phone, such as the camera, location or push notifications.",
      },
      {
        q: "Is the planner free?",
        a: "Yes. It runs in your browser and nothing is stored. The plan is only sent anywhere if you choose to email it, and then only to me.",
      },
      {
        q: "Can you build the MVP for me?",
        a: "Yes. That is what the Idea to launch service is for: a first version built quickly with AI-assisted development and reviewed by a senior engineer.",
      },
    ],
  },
  {
    slug: "ai-cost-calculator",
    name: "AI API Cost Calculator",
    metaTitle: "AI API Cost Calculator: OpenAI vs Claude vs Gemini",
    metaDescription:
      "Estimate your monthly AI API bill: enter requests and tokens, and compare OpenAI, Claude and Gemini models side by side, including caching and batch discounts.",
    summary: "Estimate your monthly AI API bill and compare OpenAI, Claude and Gemini models side by side.",
    lead: "Enter how many requests you expect and how long they are. The calculator compares the monthly cost across current OpenAI, Anthropic and Google models, using their published per-token prices.",
    guide: [
      {
        heading: "How AI API pricing works",
        body: "Providers charge per token, roughly three quarters of an English word, with separate prices for input (your prompt, instructions and any documents) and output (the model's answer). Output usually costs several times more than input, so long answers drive the bill more than long questions.",
      },
      {
        heading: "Ways to cut the bill",
        body: "Route simple tasks to a smaller model and keep the large one for hard questions. Cache instructions and documents that repeat across requests. Use batch processing for work that can wait a few hours. Cap the length of answers. Together, these often cut a bill by more than half.",
      },
      {
        heading: "Keeping the estimate honest",
        body: "Prices change, and real usage rarely matches a forecast. Treat the result as an order of magnitude, check the providers' pricing pages before you commit, and measure actual token usage in the first week of production.",
      },
    ],
    faqs: [
      {
        q: "How many tokens is a word?",
        a: "In English, one token is about three quarters of a word, so 1,000 tokens is roughly 750 words. Many other languages, including Arabic and Urdu, need more tokens for the same text.",
      },
      {
        q: "Which model is cheapest?",
        a: "It depends on your mix of input and output, which is why the table sorts the models by your monthly cost. The cheapest model is not always the best value: one that answers correctly the first time can cost less overall than a cheaper one that needs retries.",
      },
      {
        q: "Are these prices up to date?",
        a: "They were checked on the date shown under the table, from each provider's official pricing page. Prices change, so confirm on the provider's site before you budget.",
      },
      {
        q: "What does cached input mean?",
        a: "When the start of your prompt repeats across requests, such as the same instructions or document, providers can bill those tokens at a lower cached rate. It applies to the repeated part only.",
      },
    ],
  },
  {
    slug: "readme-generator",
    name: "GitHub README Generator",
    metaTitle: "GitHub README Generator: Profile and Project READMEs",
    metaDescription:
      "Create a GitHub profile README or a project README in minutes: skill icons, stats cards, setup steps and license, with a live preview. Free, no sign-up.",
    summary: "Write a GitHub profile or project README with a live preview, skill icons and stats cards.",
    lead: "Fill in a few fields and get a clean README for your GitHub profile or your project, with skill icons, stats cards and setup steps. Copy it or download README.md. Free, no sign-up.",
    guide: [
      {
        heading: "Profile README or project README?",
        body: "A profile README appears at the top of your GitHub profile once you create a public repository with the same name as your username and add a README.md to it. A project README is the front page of a repository: what the project does, how to install and run it, and how to contribute. This generator writes both.",
      },
      {
        heading: "What makes a good README",
        body: "Say what it is in the first line. Show it, with a screenshot or a demo link. Then answer the next three questions every visitor has: how do I run it, how do I use it, and who do I ask. Badges and stats are decoration; the setup steps are what people come for.",
      },
      {
        heading: "About the images in your README",
        body: "Skill icons come from skillicons.dev and stats cards from the community github-readme-stats service, and GitHub loads them each time your page is viewed. Both are popular and free. If a card ever fails to load, the rest of your README still works, and for an important profile you can host the stats service yourself.",
      },
    ],
    faqs: [
      {
        q: "How do I add a README to my GitHub profile?",
        a: "Create a new public repository named exactly like your GitHub username, tick \"Add a README file\", then paste the generated Markdown into README.md and commit. It appears at the top of your profile straight away.",
      },
      {
        q: "Is the README generator free?",
        a: "Yes. There is no sign-up and no limit, and everything runs in your browser. Nothing you type is stored.",
      },
      {
        q: "Can I edit the README afterwards?",
        a: "Yes. It is plain Markdown, so you can change anything in GitHub's editor or any text editor.",
      },
      {
        q: "Why does the preview look slightly different on GitHub?",
        a: "The preview follows standard GitHub Markdown, but GitHub applies its own styles and themes. Headings, lists, links, tables, code and images all carry over.",
      },
    ],
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
