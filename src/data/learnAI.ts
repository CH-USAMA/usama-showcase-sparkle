/**
 * /learn-ai: a free, plain-English guide to using AI assistants day to day.
 * Plain data with no imports, so scripts/prerender.ts can read it too.
 * Square brackets in a prompt mark the parts the reader fills in.
 */

export const LEARN_AI_TITLE = "How to Use AI in Daily Life: Free Guide with Prompts";

export const LEARN_AI_DESCRIPTION =
  "A plain-English guide to using ChatGPT, Claude and Gemini every day: emails, planning, studying, research and work, with prompts you can copy and paste.";

export const LEARN_AI_PUBLISHED = "2026-10-12";

export interface PromptCard {
  title: string;
  prompt: string;
  note?: string;
}

export interface PromptGroup {
  id: string;
  title: string;
  intro: string;
  prompts: PromptCard[];
}

export const PROMPT_PARTS: { label: string; text: string }[] = [
  { label: "Context", text: "Who you are and what is going on, as you would explain it to a new colleague." },
  { label: "Task", text: "Exactly what you want: a reply, a plan, a summary, a comparison." },
  { label: "Details", text: "Length, tone, audience, and anything it must include or avoid." },
  { label: "Format", text: "Bullet points, a table, an email, numbered steps." },
];

export const WEAK_PROMPT = "Write an email to my landlord.";

export const STRONG_PROMPT =
  "I rent a flat and the kitchen tap has been leaking for two weeks. I reported it once by phone and nothing happened. Write a short, polite but firm email to my landlord asking for a repair date this week. Mention my first report on 2 October. Keep it under 120 words.";

export const PROMPT_GROUPS: PromptGroup[] = [
  {
    id: "messages",
    title: "Messages and emails",
    intro: "The blank reply box is where most people lose ten minutes. Let AI write the first draft, then make it sound like you.",
    prompts: [
      {
        title: "Reply to a tricky message",
        prompt:
          "Here is a message I received: [paste message]. I want to [say no / agree / ask for more time] without sounding rude. Write a reply in a warm, direct tone, under 100 words.",
      },
      {
        title: "Polish your own writing",
        prompt:
          "Improve the grammar and clarity of this text, but keep my words and my tone. Show the corrected version, then list the main changes you made: [paste text]",
      },
    ],
  },
  {
    id: "planning",
    title: "Planning your week, meals and trips",
    intro: "AI is good at turning a messy list into a plan, as long as you tell it your real constraints.",
    prompts: [
      {
        title: "A realistic weekly plan",
        prompt:
          "Here is everything I need to do this week: [list]. I work [hours] and I also have [commitments]. Make a realistic day-by-day plan, put the hardest tasks in the mornings, and leave some free time each day for things that run over.",
      },
      {
        title: "Meals and a shopping list",
        prompt:
          "Plan 5 simple dinners for [2] people, under 30 minutes each, using mostly [ingredients I already have]. Avoid [allergies or dislikes]. Then give me one shopping list grouped by supermarket section.",
      },
      {
        title: "A relaxed trip itinerary",
        prompt:
          "I am visiting [city] for [3] days in [month] with [who]. We enjoy [interests] and want a relaxed pace. Suggest a day-by-day plan with one main thing each morning and afternoon, and tell me what I should book in advance.",
        note: "Check opening hours and prices on the official websites before you go; AI can be out of date.",
      },
    ],
  },
  {
    id: "learning",
    title: "Learning anything",
    intro: "An AI assistant is a patient tutor that never minds the same question twice. Ask it to teach and to test you, not only to answer.",
    prompts: [
      {
        title: "Understand a new topic",
        prompt:
          "Explain [topic] to me as if I am a smart beginner. Use one everyday analogy, then give me the three ideas that matter most.",
      },
      {
        title: "Quiz yourself",
        prompt:
          "I am studying [topic or chapter]. Ask me 5 questions, one at a time, and wait for my answer each time. After each answer, tell me what I got right and what I missed.",
      },
      {
        title: "Practise a language",
        prompt:
          "Let's practise [language] at a beginner level. Have a simple conversation with me about [ordering food in a restaurant]. After each of my replies, gently correct my mistakes.",
      },
    ],
  },
  {
    id: "decisions",
    title: "Making decisions",
    intro: "AI will not know your life better than you do, but it is very good at asking the questions you skipped.",
    prompts: [
      {
        title: "Compare two options",
        prompt:
          "I am choosing between [option A] and [option B] for [purpose]. Before you answer, ask me up to five questions about my situation. Then compare the two in a table and tell me which you would pick and why.",
      },
      {
        title: "Find the weak spots in a plan",
        prompt:
          "I am planning to [decision]. Imagine it is a year from now and it went badly. What are the most likely reasons? For each one, what could I do now to prevent it?",
      },
    ],
  },
  {
    id: "documents",
    title: "Long documents, made short",
    intro: "Letters, terms, reports and long email threads: paste them in and ask for what you actually need to know.",
    prompts: [
      {
        title: "Summarise and pull out actions",
        prompt:
          "Summarise this in 5 bullet points, then list any deadlines, amounts of money or actions I need to take: [paste text]",
      },
      {
        title: "Understand a letter or contract",
        prompt:
          "Explain this [letter / contract / bill] in plain English. What am I agreeing to, what will it cost me, and what should I ask before I sign? [paste text]",
        note: "Use this to prepare your questions. For a legal or financial decision, confirm with a qualified person.",
      },
    ],
  },
  {
    id: "work",
    title: "At work",
    intro: "The quickest wins at work are the tasks you do every week and dislike: notes, formulas, outlines and first drafts.",
    prompts: [
      {
        title: "Meeting notes to action list",
        prompt:
          "Turn these rough meeting notes into a 3-line summary, a list of decisions, and an action list with an owner and a date for each item: [paste notes]",
      },
      {
        title: "A spreadsheet formula",
        prompt:
          "In Google Sheets, column A has dates and column B has amounts. Write a formula that totals column B for the current month, and explain how it works step by step.",
      },
      {
        title: "A presentation outline",
        prompt:
          "Create an outline for a 10-minute presentation on [topic] for [audience]. Give each slide a title and the one point it should make.",
      },
    ],
  },
  {
    id: "business",
    title: "Running a small business",
    intro: "For a one-person or small business, AI covers a lot of the writing that used to wait until the weekend.",
    prompts: [
      {
        title: "A week of social media posts",
        prompt:
          "I run [type of business] in [city]. Write 5 social media posts for this week about [offer or topic]. Friendly tone, one clear call to action in each, and no more than two hashtags per post.",
      },
      {
        title: "Answer an unhappy customer",
        prompt:
          "A customer wrote: [paste message]. Draft a reply that apologises for [issue], explains [what happens next], and keeps them as a customer. Calm and human, not corporate.",
      },
      {
        title: "A product description",
        prompt:
          "Write a product description for [product] aimed at [ideal customer]. Lead with the main benefit, then add 3 short bullet points with the key details: [features].",
      },
    ],
  },
  {
    id: "health-money",
    title: "Health and money: prepare, do not replace",
    intro: "AI is useful for getting ready for a conversation with a professional and for understanding your own numbers. It is not a doctor or a financial adviser.",
    prompts: [
      {
        title: "Prepare for a doctor's appointment",
        prompt:
          "I have a doctor's appointment about [symptom or concern]. Help me prepare: what should I write down beforehand, and what questions should I ask?",
      },
      {
        title: "See where your money goes",
        prompt:
          "Here are my monthly income and expenses: [list]. Group them into categories, show me where the money goes, and suggest three realistic places to cut back.",
        note: "Leave out account numbers and anything that identifies you; the amounts are all it needs.",
      },
    ],
  },
];

export const HABITS: string[] = [
  "Give it context, the way you would brief a new colleague. Most weak answers come from weak briefs.",
  "Ask it to ask you questions first: \"Before you answer, ask me what you need to know.\"",
  "Treat the first answer as a draft. Follow up with \"shorter\", \"more specific\" or \"put it in a table\".",
  "Paste the real material, such as the email or your notes, instead of describing it (but see the safety rules below).",
  "Ask where an answer comes from, and check the ones that matter yourself.",
  "Keep the prompts that work in a note and reuse them. That is how an hour a week becomes an hour a day.",
];

export const SAFETY: string[] = [
  "Never paste passwords, one-time codes, bank or card numbers, or ID and passport numbers.",
  "Think twice before pasting other people's personal details or your employer's confidential information, and follow your workplace's rules on AI tools.",
  "Check the privacy settings. Most assistants let you control whether your chats are used to train their models.",
  "AI can be confidently wrong. Check facts, figures, dates, quotes and anything medical, legal or financial against a reliable source.",
  "Watch out for AI-powered scams: urgent messages, or calls in a familiar voice asking for money. Confirm through another channel before you act.",
];
