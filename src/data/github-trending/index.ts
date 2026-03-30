export interface TrendingRepo {
  id: string;
  full_name: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  topics: string[];
  category: string;
  readme_file: string;
  owner_avatar: string;
  updated_at: string;
}

export const trendingRepos: TrendingRepo[] = [
  {
    "id": "gh-freeCodeCamp--freeCodeCamp",
    "full_name": "freeCodeCamp/freeCodeCamp",
    "name": "freeCodeCamp",
    "description": "freeCodeCamp.org's open-source codebase and curriculum. Learn math, programming, and computer science for free.",
    "stars": 439366,
    "forks": 43861,
    "language": "TypeScript",
    "url": "https://github.com/freeCodeCamp/freeCodeCamp",
    "topics": [
      "careers",
      "certification",
      "community",
      "curriculum",
      "d3"
    ],
    "category": "Web Dev",
    "readme_file": "freeCodeCamp--freeCodeCamp.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/9892522?v=4",
    "updated_at": "2026-03-30T11:56:18Z"
  },
  {
    "id": "gh-facebook--react",
    "full_name": "facebook/react",
    "name": "react",
    "description": "The library for web and native user interfaces.",
    "stars": 244251,
    "forks": 50859,
    "language": "JavaScript",
    "url": "https://github.com/facebook/react",
    "topics": [
      "declarative",
      "frontend",
      "javascript",
      "library",
      "react"
    ],
    "category": "Web Dev",
    "readme_file": "facebook--react.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/69631?v=4",
    "updated_at": "2026-03-29T01:18:21Z"
  },
  {
    "id": "gh-tensorflow--tensorflow",
    "full_name": "tensorflow/tensorflow",
    "name": "tensorflow",
    "description": "An Open Source Machine Learning Framework for Everyone",
    "stars": 194392,
    "forks": 75251,
    "language": "C++",
    "url": "https://github.com/tensorflow/tensorflow",
    "topics": [
      "deep-learning",
      "deep-neural-networks",
      "distributed",
      "machine-learning",
      "ml"
    ],
    "category": "AI",
    "readme_file": "tensorflow--tensorflow.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/15658638?v=4",
    "updated_at": "2026-03-30T12:05:56Z"
  },
  {
    "id": "gh-Significant-Gravitas--AutoGPT",
    "full_name": "Significant-Gravitas/AutoGPT",
    "name": "AutoGPT",
    "description": "AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters.",
    "stars": 182944,
    "forks": 46213,
    "language": "Python",
    "url": "https://github.com/Significant-Gravitas/AutoGPT",
    "topics": [
      "agentic-ai",
      "agents",
      "ai",
      "artificial-intelligence",
      "autonomous-agents"
    ],
    "category": "AI",
    "readme_file": "Significant-Gravitas--AutoGPT.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/130738209?v=4",
    "updated_at": "2026-03-30T11:53:35Z"
  },
  {
    "id": "gh-ollama--ollama",
    "full_name": "ollama/ollama",
    "name": "ollama",
    "description": "Get up and running with Kimi-K2.5, GLM-5, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models.",
    "stars": 166460,
    "forks": 15231,
    "language": "Go",
    "url": "https://github.com/ollama/ollama",
    "topics": [
      "deepseek",
      "gemma",
      "gemma3",
      "glm",
      "go"
    ],
    "category": "AI",
    "readme_file": "ollama--ollama.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/151674099?v=4",
    "updated_at": "2026-03-30T02:25:00Z"
  },
  {
    "id": "gh-AUTOMATIC1111--stable-diffusion-webui",
    "full_name": "AUTOMATIC1111/stable-diffusion-webui",
    "name": "stable-diffusion-webui",
    "description": "Stable Diffusion web UI",
    "stars": 162027,
    "forks": 30210,
    "language": "Python",
    "url": "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    "topics": [
      "ai",
      "ai-art",
      "deep-learning",
      "diffusion",
      "gradio"
    ],
    "category": "AI",
    "readme_file": "AUTOMATIC1111--stable-diffusion-webui.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/20920490?v=4",
    "updated_at": "2026-03-02T07:00:53Z"
  },
  {
    "id": "gh-huggingface--transformers",
    "full_name": "huggingface/transformers",
    "name": "transformers",
    "description": "\ud83e\udd17 Transformers: the model-definition framework for state-of-the-art machine learning models in text, vision, audio, and multimodal models, for both inference and training. ",
    "stars": 158551,
    "forks": 32678,
    "language": "Python",
    "url": "https://github.com/huggingface/transformers",
    "topics": [
      "audio",
      "deep-learning",
      "deepseek",
      "gemma",
      "glm"
    ],
    "category": "AI",
    "readme_file": "huggingface--transformers.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/25720743?v=4",
    "updated_at": "2026-03-30T12:09:53Z"
  },
  {
    "id": "gh-f--prompts.chat",
    "full_name": "f/prompts.chat",
    "name": "prompts.chat",
    "description": "f.k.a. Awesome ChatGPT Prompts. Share, discover, and collect prompts from the community. Free and open source \u2014 self-host for your organization with complete privacy.",
    "stars": 154768,
    "forks": 20317,
    "language": "HTML",
    "url": "https://github.com/f/prompts.chat",
    "topics": [
      "ai",
      "artificial-intelligence",
      "awesome-list",
      "chatgpt",
      "chatgpt-prompts"
    ],
    "category": "AI",
    "readme_file": "f--prompts.chat.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/196477?v=4",
    "updated_at": "2026-03-30T04:05:06Z"
  },
  {
    "id": "gh-vercel--next.js",
    "full_name": "vercel/next.js",
    "name": "next.js",
    "description": "The React Framework",
    "stars": 138543,
    "forks": 30726,
    "language": "JavaScript",
    "url": "https://github.com/vercel/next.js",
    "topics": [
      "blog",
      "browser",
      "compiler",
      "components",
      "hybrid"
    ],
    "category": "Web Dev",
    "readme_file": "vercel--next.js.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/14985020?v=4",
    "updated_at": "2026-03-30T11:58:07Z"
  },
  {
    "id": "gh-langgenius--dify",
    "full_name": "langgenius/dify",
    "name": "dify",
    "description": "Production-ready platform for agentic workflow development.",
    "stars": 134991,
    "forks": 21023,
    "language": "TypeScript",
    "url": "https://github.com/langgenius/dify",
    "topics": [
      "agent",
      "agentic-ai",
      "agentic-framework",
      "agentic-workflow",
      "ai"
    ],
    "category": "AI",
    "readme_file": "langgenius--dify.md",
    "owner_avatar": "https://avatars.githubusercontent.com/u/127165244?v=4",
    "updated_at": "2026-03-30T10:45:10Z"
  }
];
