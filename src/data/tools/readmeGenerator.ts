/**
 * Options for /tools/readme-generator and the functions that build the
 * Markdown. Plain Markdown only (no HTML), so it renders the same on GitHub
 * and in the site's own preview. Skill ids and stats themes were checked
 * against skillicons.dev and github-readme-stats on 2026-10-12.
 */

export const SKILLS: { id: string; label: string }[] = [
  { id: "js", label: "JavaScript" },
  { id: "ts", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "tailwind", label: "Tailwind" },
  { id: "sass", label: "Sass" },
  { id: "vite", label: "Vite" },
  { id: "nodejs", label: "Node.js" },
  { id: "express", label: "Express" },
  { id: "nestjs", label: "NestJS" },
  { id: "py", label: "Python" },
  { id: "django", label: "Django" },
  { id: "fastapi", label: "FastAPI" },
  { id: "php", label: "PHP" },
  { id: "laravel", label: "Laravel" },
  { id: "wordpress", label: "WordPress" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "java", label: "Java" },
  { id: "kotlin", label: "Kotlin" },
  { id: "swift", label: "Swift" },
  { id: "flutter", label: "Flutter" },
  { id: "dart", label: "Dart" },
  { id: "androidstudio", label: "Android Studio" },
  { id: "cs", label: "C#" },
  { id: "dotnet", label: ".NET" },
  { id: "cpp", label: "C++" },
  { id: "postgres", label: "PostgreSQL" },
  { id: "mysql", label: "MySQL" },
  { id: "mongodb", label: "MongoDB" },
  { id: "redis", label: "Redis" },
  { id: "sqlite", label: "SQLite" },
  { id: "prisma", label: "Prisma" },
  { id: "graphql", label: "GraphQL" },
  { id: "firebase", label: "Firebase" },
  { id: "supabase", label: "Supabase" },
  { id: "docker", label: "Docker" },
  { id: "kubernetes", label: "Kubernetes" },
  { id: "aws", label: "AWS" },
  { id: "gcp", label: "Google Cloud" },
  { id: "azure", label: "Azure" },
  { id: "vercel", label: "Vercel" },
  { id: "linux", label: "Linux" },
  { id: "bash", label: "Bash" },
  { id: "git", label: "Git" },
  { id: "githubactions", label: "GitHub Actions" },
  { id: "figma", label: "Figma" },
];

export const STATS_THEMES: { value: string; label: string }[] = [
  { value: "default", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "github_dark", label: "GitHub dark" },
  { value: "tokyonight", label: "Tokyo Night" },
  { value: "dracula", label: "Dracula" },
];

export const LICENSES = ["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause"];

export const TOOL_URL = "https://www.chaudharyusama.com/tools/readme-generator";

export interface ProfileForm {
  name: string;
  username: string;
  headline: string;
  about: string;
  working: string;
  learning: string;
  askMe: string;
  location: string;
  skills: string[];
  iconTheme: "dark" | "light";
  stats: boolean;
  topLangs: boolean;
  views: boolean;
  statsTheme: string;
  linkedin: string;
  x: string;
  website: string;
  email: string;
  credit: boolean;
}

export interface ProjectForm {
  name: string;
  tagline: string;
  description: string;
  demo: string;
  screenshot: string;
  features: string;
  skills: string[];
  prerequisites: string;
  install: string;
  usage: string;
  env: string;
  license: string;
  toc: boolean;
  contributing: boolean;
  author: string;
  authorUsername: string;
  credit: boolean;
}

export const PROFILE_DEFAULTS: ProfileForm = {
  name: "",
  username: "",
  headline: "",
  about: "",
  working: "",
  learning: "",
  askMe: "",
  location: "",
  skills: ["ts", "react", "nodejs", "postgres", "docker", "git"],
  iconTheme: "dark",
  stats: true,
  topLangs: true,
  views: false,
  statsTheme: "github_dark",
  linkedin: "",
  x: "",
  website: "",
  email: "",
  credit: true,
};

export const PROJECT_DEFAULTS: ProjectForm = {
  name: "",
  tagline: "",
  description: "",
  demo: "",
  screenshot: "",
  features: "",
  skills: ["ts", "react", "nodejs", "postgres"],
  prerequisites: "Node.js 20 or newer\nA PostgreSQL database",
  install: "git clone https://github.com/your-username/your-project.git\ncd your-project\nnpm install\ncp .env.example .env\nnpm run dev",
  usage: "",
  env: "DATABASE_URL=Connection string for PostgreSQL\nAPI_KEY=Key for the external API",
  license: "MIT",
  toc: false,
  contributing: true,
  author: "",
  authorUsername: "",
  credit: true,
};

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const url = (s: string) => (/^https?:\/\//i.test(s.trim()) ? s.trim() : s.trim() ? `https://${s.trim()}` : "");
const skillLabel = (id: string) => SKILLS.find((s) => s.id === id)?.label ?? id;
const icons = (skills: string[], theme: string) =>
  `![${skills.map(skillLabel).join(", ")}](https://skillicons.dev/icons?i=${skills.join(",")}&theme=${theme}&perline=12)`;
const creditLine = "_Made with the free [GitHub README generator](" + TOOL_URL + ")._";

export function buildProfile(f: ProfileForm): string {
  const name = f.name.trim() || "Your Name";
  const user = f.username.trim().replace(/^@/, "");
  const out: string[] = [`# Hi, I'm ${name} 👋`];
  if (f.headline.trim()) out.push(`**${f.headline.trim()}**`);
  if (f.about.trim()) out.push(f.about.trim());

  const facts = [
    f.working.trim() && `- 🔭 Currently working on ${f.working.trim()}`,
    f.learning.trim() && `- 🌱 Learning ${f.learning.trim()}`,
    f.askMe.trim() && `- 💬 Ask me about ${f.askMe.trim()}`,
    f.location.trim() && `- 📍 Based in ${f.location.trim()}`,
  ].filter(Boolean);
  if (facts.length) out.push(facts.join("\n"));

  if (f.skills.length) out.push("## Tech stack", icons(f.skills, f.iconTheme));

  if (user && (f.stats || f.topLangs)) {
    const theme = f.statsTheme === "default" ? "" : `&theme=${f.statsTheme}`;
    const cards = [
      f.stats && `![GitHub stats](https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&hide_border=true${theme})`,
      f.topLangs && `![Top languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&hide_border=true${theme})`,
    ].filter(Boolean);
    out.push("## GitHub stats", cards.join("\n"));
  }

  const links = [
    f.linkedin.trim() && `[LinkedIn](${url(f.linkedin)})`,
    f.x.trim() && `[X](${url(f.x)})`,
    f.website.trim() && `[Website](${url(f.website)})`,
    f.email.trim() && `[Email](mailto:${f.email.trim()})`,
  ].filter(Boolean);
  if (links.length) out.push("## Connect", links.join(" · "));

  if (user && f.views) out.push(`![Profile views](https://komarev.com/ghpvc/?username=${user})`);
  if (f.credit) out.push(creditLine);
  return out.join("\n\n") + "\n";
}

export function buildProject(f: ProjectForm): string {
  const name = f.name.trim() || "Project Name";
  const out: string[] = [`# ${name}`];
  if (f.tagline.trim()) out.push(`**${f.tagline.trim()}**`);
  if (f.license) out.push(`![License: ${f.license}](https://img.shields.io/badge/license-${f.license.replace(/-/g, "--")}-blue)`);
  if (f.description.trim()) out.push(f.description.trim());
  if (f.demo.trim()) out.push(`**Live demo:** ${url(f.demo)}`);
  if (f.screenshot.trim()) out.push(`![${name} screenshot](${url(f.screenshot)})`);

  const features = lines(f.features);
  const prereqs = lines(f.prerequisites);
  const install = f.install.trim();
  const env = lines(f.env).map((l) => {
    const i = l.indexOf("=");
    return i > 0 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, ""];
  });
  const sections = [
    features.length && "Features",
    f.skills.length && "Tech stack",
    (prereqs.length || install) && "Getting started",
    f.usage.trim() && "Usage",
    env.length && "Environment variables",
    f.contributing && "Contributing",
    f.license && "License",
  ].filter(Boolean) as string[];

  if (f.toc && sections.length > 2) {
    out.push("## Contents", sections.map((s) => `- [${s}](#${s.toLowerCase().replace(/\s+/g, "-")})`).join("\n"));
  }
  if (features.length) out.push("## Features", features.map((x) => `- ${x}`).join("\n"));
  if (f.skills.length) out.push("## Tech stack", icons(f.skills, "dark"), f.skills.map(skillLabel).join(" · "));
  if (prereqs.length || install) {
    out.push("## Getting started");
    if (prereqs.length) out.push("### Prerequisites", prereqs.map((x) => `- ${x}`).join("\n"));
    if (install) out.push("### Installation", "```bash\n" + install + "\n```");
  }
  if (f.usage.trim()) out.push("## Usage", f.usage.trim());
  if (env.length) {
    out.push(
      "## Environment variables",
      ["| Variable | Description |", "|---|---|", ...env.map(([k, d]) => `| \`${k}\` | ${d.replace(/\|/g, "\\|")} |`)].join("\n")
    );
  }
  if (f.contributing) {
    out.push(
      "## Contributing",
      "Contributions are welcome. Open an issue to discuss what you would like to change, then send a pull request. Please add or update tests where it makes sense."
    );
  }
  if (f.license) out.push("## License", `Released under the ${f.license} license. See [LICENSE](LICENSE) for details.`);
  const author = f.author.trim();
  const authorUser = f.authorUsername.trim().replace(/^@/, "");
  if (author || authorUser) {
    out.push("## Author", authorUser ? `${author || authorUser}: [@${authorUser}](https://github.com/${authorUser})` : author);
  }
  if (f.credit) out.push(creditLine);
  return out.join("\n\n") + "\n";
}
