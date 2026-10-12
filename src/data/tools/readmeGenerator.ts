/**
 * Options for /tools/readme-generator and the functions that build the
 * Markdown, with headings and sentences in the page's language
 * (src/i18n/tools/<locale>.ts, readme.out). Plain Markdown only (no HTML), so
 * it renders the same on GitHub and in the site's own preview. Skill ids and stats themes were checked
 * against skillicons.dev and github-readme-stats on 2026-10-12.
 */

import type { ToolsText } from "../../i18n/tools/en";

type ReadmeText = ToolsText["readme"];
type Out = ReadmeText["out"];

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

export const STATS_THEMES = ["default", "dark", "github_dark", "tokyonight", "dracula"];

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

export const projectDefaults = (t: ReadmeText): ProjectForm => ({
  name: "",
  tagline: "",
  description: "",
  demo: "",
  screenshot: "",
  features: "",
  skills: ["ts", "react", "nodejs", "postgres"],
  prerequisites: t.defaults.prerequisites,
  install: "git clone https://github.com/your-username/your-project.git\ncd your-project\nnpm install\ncp .env.example .env\nnpm run dev",
  usage: "",
  env: t.defaults.env,
  license: "MIT",
  toc: false,
  contributing: true,
  author: "",
  authorUsername: "",
  credit: true,
});

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const url = (s: string) => (/^https?:\/\//i.test(s.trim()) ? s.trim() : s.trim() ? `https://${s.trim()}` : "");
const skillLabel = (id: string) => SKILLS.find((s) => s.id === id)?.label ?? id;
const icons = (skills: string[], theme: string) =>
  `![${skills.map(skillLabel).join(", ")}](https://skillicons.dev/icons?i=${skills.join(",")}&theme=${theme}&perline=12)`;
/** Heading anchors as GitHub makes them: lower case, punctuation dropped, spaces to hyphens. Letters in any script stay. */
const anchor = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");

export function buildProfile(f: ProfileForm, o: Out): string {
  const name = f.name.trim() || o.defaultName;
  const user = f.username.trim().replace(/^@/, "");
  const out: string[] = [o.hi(name)];
  if (f.headline.trim()) out.push(`**${f.headline.trim()}**`);
  if (f.about.trim()) out.push(f.about.trim());

  const facts = [
    f.working.trim() && o.working(f.working.trim()),
    f.learning.trim() && o.learning(f.learning.trim()),
    f.askMe.trim() && o.askMe(f.askMe.trim()),
    f.location.trim() && o.location(f.location.trim()),
  ].filter(Boolean);
  if (facts.length) out.push(facts.join("\n"));

  if (f.skills.length) out.push(`## ${o.techStack}`, icons(f.skills, f.iconTheme));

  if (user && (f.stats || f.topLangs)) {
    const theme = f.statsTheme === "default" ? "" : `&theme=${f.statsTheme}`;
    const cards = [
      f.stats && `![${o.statsAlt}](https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&hide_border=true${theme})`,
      f.topLangs && `![${o.topLangsAlt}](https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&hide_border=true${theme})`,
    ].filter(Boolean);
    out.push(`## ${o.githubStats}`, cards.join("\n"));
  }

  const links = [
    f.linkedin.trim() && `[LinkedIn](${url(f.linkedin)})`,
    f.x.trim() && `[X](${url(f.x)})`,
    f.website.trim() && `[${o.website}](${url(f.website)})`,
    f.email.trim() && `[${o.email}](mailto:${f.email.trim()})`,
  ].filter(Boolean);
  if (links.length) out.push(`## ${o.connect}`, links.join(" · "));

  if (user && f.views) out.push(`![${o.profileViews}](https://komarev.com/ghpvc/?username=${user})`);
  if (f.credit) out.push(o.credit(TOOL_URL));
  return out.join("\n\n") + "\n";
}

export function buildProject(f: ProjectForm, o: Out): string {
  const name = f.name.trim() || o.projectName;
  const out: string[] = [`# ${name}`];
  if (f.tagline.trim()) out.push(`**${f.tagline.trim()}**`);
  if (f.license) out.push(`![${o.licenseAlt(f.license)}](https://img.shields.io/badge/license-${f.license.replace(/-/g, "--")}-blue)`);
  if (f.description.trim()) out.push(f.description.trim());
  if (f.demo.trim()) out.push(`**${o.liveDemo}:** ${url(f.demo)}`);
  if (f.screenshot.trim()) out.push(`![${o.screenshotAlt(name)}](${url(f.screenshot)})`);

  const features = lines(f.features);
  const prereqs = lines(f.prerequisites);
  const install = f.install.trim();
  const env = lines(f.env).map((l) => {
    const i = l.indexOf("=");
    return i > 0 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, ""];
  });
  const sections = [
    features.length && o.features,
    f.skills.length && o.techStack,
    (prereqs.length || install) && o.gettingStarted,
    f.usage.trim() && o.usage,
    env.length && o.envVars,
    f.contributing && o.contributing,
    f.license && o.license,
  ].filter(Boolean) as string[];

  if (f.toc && sections.length > 2) out.push(`## ${o.contents}`, sections.map((s) => `- [${s}](#${anchor(s)})`).join("\n"));
  if (features.length) out.push(`## ${o.features}`, features.map((x) => `- ${x}`).join("\n"));
  if (f.skills.length) out.push(`## ${o.techStack}`, icons(f.skills, "dark"), f.skills.map(skillLabel).join(" · "));
  if (prereqs.length || install) {
    out.push(`## ${o.gettingStarted}`);
    if (prereqs.length) out.push(`### ${o.prerequisites}`, prereqs.map((x) => `- ${x}`).join("\n"));
    if (install) out.push(`### ${o.installation}`, "```bash\n" + install + "\n```");
  }
  if (f.usage.trim()) out.push(`## ${o.usage}`, f.usage.trim());
  if (env.length) {
    out.push(
      `## ${o.envVars}`,
      [`| ${o.variable} | ${o.description} |`, "|---|---|", ...env.map(([k, d]) => `| \`${k}\` | ${d.replace(/\|/g, "\\|")} |`)].join("\n")
    );
  }
  if (f.contributing) out.push(`## ${o.contributing}`, o.contributingText);
  if (f.license) out.push(`## ${o.license}`, o.licenseText(f.license));
  const author = f.author.trim();
  const authorUser = f.authorUsername.trim().replace(/^@/, "");
  if (author || authorUser) {
    out.push(`## ${o.author}`, authorUser ? `${author || authorUser}: [@${authorUser}](https://github.com/${authorUser})` : author);
  }
  if (f.credit) out.push(o.credit(TOOL_URL));
  return out.join("\n\n") + "\n";
}
