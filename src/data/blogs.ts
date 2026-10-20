
/* SEED DATA. Blog posts now live in the Turso database and are edited at
   /admin. This file only seeds an empty database (npm run content:seed) and
   is the offline fallback when no database is configured. */
import type { BlogPost } from "./types";
export type { BlogPost };

export const blogsData: BlogPost[] = [
  {
    id: "40",
    title: "15 Free AI and Online Tools Worth Bookmarking in 2026 (With Real Limits)",
    seo_title: "15 Free AI and Online Tools Worth Bookmarking in 2026",
    slug: "free-ai-tools-websites-2026",
    excerpt: "15 free AI and browser tools I would bookmark in 2026: what each one does, what the free plan really includes, the limits, and the privacy points to check.",
    content: `## The short version

These are 15 free tools I would bookmark. I checked each one on its own website, pricing page, help centre or GitHub repository in October 2026, and I note what the free plan gives you and where it stops.

Not all of them are AI. AudioMass, PairDrop, BentoPDF, Photopea, Tally and Cobalt are plain web apps, and several run entirely in your browser, which is often the better choice for private files.

| Tool | What it does | Free plan | Sign-up needed |
|---|---|---|---|
| Duck.ai | Private chat with several AI models | Free within a daily limit | No |
| Perplexity | AI answers with cited sources | Basic searches, a few Pro Searches | For history and settings |
| Qwen Chat | Alibaba's general AI assistant | Free to use | Log in offered |
| Gamma | AI slides, documents and web pages | 400 one-off credits, Gamma badge | Yes |
| Napkin AI | Turns text into diagrams and charts | 500 AI credits a week, Napkin branding | Yes |
| Goblin Tools | Small AI helpers for tasks and tone | Free website, no ads | No |
| Google Vids | Video editor with AI help | 50 AI credits a month (personal account) | Google account |
| Lumen5 | Turns text into short videos | 5 videos a month, 720p, branded outro | Yes |
| AudioMass | Audio editor in the browser | Free, open source (MIT) | No |
| Cobalt | Saves media from public links | Free, open source (AGPL-3.0), no ads | No |
| BentoPDF | PDF toolkit that runs in the browser | Free, open source (AGPL-3.0) | No |
| TinyWow | 200+ file, PDF, image and AI tools | Free with ads, Premium removes them | No |
| PairDrop | Sends files between nearby devices | Free, open source (GPL-3.0) | No |
| Photopea | Photoshop-style image editor | Free with ads, Premium removes them | No |
| Tally | Forms you build like a document | Unlimited forms and submissions (fair use) | Not to start |

Free plans change often. Treat the limits here as a snapshot from October 2026 and check the pricing page before you rely on one for work.

## AI assistants and research

### Duck.ai

![Duck.ai home screen with the "Ask anything privately" chat box and model picker](/blog/free-ai-tools/duck-ai.webp "1280x800")

Duck.ai is DuckDuckGo's chat interface for several AI models, including smaller models from OpenAI, Anthropic and Mistral and open models such as gpt-oss and Gemma. Text chat, voice chat and image generation are free within a daily limit, and DuckDuckGo says no account is needed. Paid Plus and Pro subscriptions raise the limits and add larger models.

Privacy is the reason to use it. DuckDuckGo says it removes your IP address and other metadata before a prompt reaches the model provider, does not store chats by default, and has agreements with providers not to train on chats and to delete them after the reply (with stated exceptions, such as legal requirements).

- **Good for:** quick questions you would rather not attach to your main AI account.
- **Watch out:** the daily limit is not a fixed number of messages, and bigger models use it up faster. Anonymised is not the same as secret, so still leave out names and client data.

[duck.ai](https://duck.ai/)

### Perplexity

![Perplexity search page asking "What do you want to know?"](/blog/free-ai-tools/perplexity.webp "1280x800")

Perplexity answers questions by searching the web and citing its sources, so you can click through and check. The free plan includes what Perplexity calls practically unlimited basic searches and a small number of Pro Searches (its plans page listed 3 a day when I checked, while the pricing page talks about limited usage), limited file uploads, and no access to advanced models or image generation.

- **Good for:** research where you need to see where a claim came from.
- **Watch out:** "AI Data Retention" is on by default for free accounts, which lets Perplexity use your searches to improve its models. You can switch it off under Settings, Preferences, but it only applies from that point on. Always open the cited source before you quote it.

[perplexity.ai](https://www.perplexity.ai/)

### Qwen Chat

![Qwen Chat home screen with the model selector and message box](/blog/free-ai-tools/qwen.webp "1280x800")

Qwen Chat is Alibaba's assistant built on its Qwen models. The Qwen site says it is "free to use, open to all", and it covers the usual ground: chat, reading files and images, web search and image generation. It is a useful second opinion next to ChatGPT or Gemini.

- **Good for:** comparing answers across models, and coding or writing help without a subscription.
- **Watch out:** the privacy policy says the service is operated from Singapore, your input is processed by Alibaba Cloud (Singapore), and "de-identified user content" may be used for model training. It also asks you to avoid entering sensitive personal data. Take that advice literally.

[chat.qwen.ai](https://chat.qwen.ai/)

## Writing, slides and visuals

### Gamma

![Gamma Help Center home page with getting-started articles](/blog/free-ai-tools/gamma.webp "1280x800")

Gamma turns a prompt, notes or a document into a presentation, a document or a simple web page, which you edit with blocks and can export to PDF or PowerPoint.

The free plan is a one-off allowance: 400 credits when you sign up, and Gamma's help centre says free credits do not refresh. You can earn more by referring people (200 each). Free generation is capped at 10 slides per prompt, and free exports and shared decks carry a "Made with Gamma" badge, which the paid Plus plan removes.

- **Good for:** a first draft of a pitch or a workshop deck that you then rewrite in your own words.
- **Watch out:** 400 credits go quickly if you regenerate a lot. Plan the outline yourself first, then generate once.

[gamma.app](https://gamma.app/)

### Napkin AI

![Napkin AI landing page: Get visuals from your text](/blog/free-ai-tools/napkin.webp "1280x800")

Napkin takes text you paste or write and suggests visuals for it: diagrams, flowcharts, mind maps, infographics and simple charts. You pick one and adjust colours, icons and layout, with little prompting involved.

The free plan gives 500 AI credits a week, unlimited editing, and unlimited PNG and PDF exports, with Napkin branding on the visuals. SVG and PowerPoint export and removing the branding need the paid Plus plan.

- **Good for:** turning a paragraph in a proposal or a blog post into a clear diagram in a few minutes.
- **Watch out:** check that the diagram says what your text says. A neat visual can quietly drop a step.

[napkin.ai](https://www.napkin.ai/)

### Goblin Tools

![Goblin Tools home page showing Magic ToDo, Formalizer, Judge and other tools](/blog/free-ai-tools/goblin-tools.webp "1280x800")

Goblin Tools is a set of small, single-purpose AI helpers, built mainly for neurodivergent people but useful for anyone. Magic ToDo breaks a vague task into steps, Formalizer rewrites text in a different tone, Judge reads the tone of a message, and Compiler turns a brain dump into actions.

The website is free without ads or paywalls, and accounts are optional (they add history and sync). The mobile apps cost a small amount, and a Pro subscription adds some advanced features. The creator says output should be treated as guesswork, not truth.

- **Good for:** getting unstuck on a task you keep putting off, or checking whether a reply sounds harsher than you meant.
- **Watch out:** the privacy policy says text for its AI tools is sent to OpenAI to process. Do not paste anything confidential.

[goblin.tools](https://goblin.tools/)

## Video and audio

### Google Vids

![Google Vids product page: AI video creation for work, with a free trial banner](/blog/free-ai-tools/google-vids.webp "1280x800")

Google Vids is Google's video editor in the browser, with templates, recording, and AI features such as voice-overs, generated clips and preset avatars. Google says it is "available to try at no cost" with a Google account.

For a free personal account, Google's help page lists 50 AI credits a month (reset on the 1st, no roll-over), and AI video clips and avatars share a limit of 6 a month. Personal accounts only get preset avatars, many AI features are English only, and creating and editing work on desktop browsers only. Higher limits come with Workspace plans or Google AI subscriptions.

- **Good for:** a short product walkthrough or training video from a few slides and a screen recording.
- **Watch out:** the limits differ by account type and Google says they may change, so check the help page for your plan.

[vids.google.com](https://vids.google.com/)

### Lumen5

![Lumen5 home page about turning blogs and documents into videos](/blog/free-ai-tools/lumen5.webp "1280x800")

Lumen5 turns a blog post, article or script into a short video. Its pricing page still lists a free plan at $0: 5 videos a month, 720p, videos up to 2 minutes, and a Lumen5 branded outro at the end. No card is needed to start. The paid Basic plan removes the branding, and 1080p starts on the Starter plan.

- **Good for:** a quick social video from a post you have already written.
- **Watch out:** the outro and 720p are fine for testing an idea, less so for a client deliverable.

[lumen5.com](https://lumen5.com/)

### AudioMass

![AudioMass about page showing the waveform editor with its equaliser open](/blog/free-ai-tools/audiomass.webp "1280x800")

AudioMass is not AI. It is a free, open-source audio and waveform editor that runs in your browser with no backend, so your audio stays on your machine. It handles cutting, trimming, fades, normalising, compression, reverb, delay, click and hum repair, and now has a multitrack mode. It exports MP3 (and WAV for multitrack mixdowns) and keeps working offline once loaded. The code is MIT licensed on GitHub, and you can host it yourself.

- **Good for:** trimming a voice note, cleaning a podcast intro or cutting a ringtone without installing anything.
- **Watch out:** it is a lightweight editor. For long multitrack projects, a desktop tool like Audacity is still easier.

[audiomass.co](https://audiomass.co/)

### Cobalt

![Cobalt downloader with the "paste the link here" box](/blog/free-ai-tools/cobalt.webp "1280x800")

Cobalt is not AI either. You paste a link from a supported site (its list includes Vimeo, Bluesky, Reddit, SoundCloud, TikTok and others) and it gives you the video, audio or image file. It has no ads, trackers or paywalls, it is open source under AGPL-3.0, and the project says it keeps no logs and streams media to you without storing it on its servers.

- **Good for:** saving your own uploads, or a clip you have permission to reuse.
- **Watch out:** YouTube has been unreliable on the main cobalt.tools instance because of YouTube's own restrictions (the project's GitHub issue about it is still open), so check the status page. Only download media you have the right to use: Cobalt's terms make you responsible for what you save and share.

[cobalt.tools](https://cobalt.tools/)

## Files, PDFs and sharing

### BentoPDF

![BentoPDF landing page: The PDF Toolkit built for privacy](/blog/free-ai-tools/bentopdf.webp "1280x800")

BentoPDF is a PDF toolkit with more than 100 tools (merge, split, compress, convert, sign, fill forms, remove metadata and more) that runs in your browser. The site says files are processed on your device and never sent to a server, with no sign-up, no file limits and no watermarks. It is open source under AGPL-3.0, with a paid commercial licence for closed-source use, and it can be self-hosted as static files.

- **Good for:** contracts, ID scans, invoices and anything else you should not upload to a random PDF site.
- **Watch out:** because the work happens on your device, very large files depend on your computer's memory.

[bentopdf.com](https://www.bentopdf.com/)

### TinyWow

![TinyWow home page listing free PDF, image, video and AI tools](/blog/free-ai-tools/tinywow.webp "1280x800")

TinyWow bundles more than 200 tools: PDF conversion and editing, image tools (including background removal), video tools and AI writing tools. The home page says "No Limits, No Sign-Up", and Premium ($9 a month) removes ads and promises unlimited usage.

- **Good for:** one-off conversions when you need a format you do not usually deal with.
- **Watch out:** unlike BentoPDF, files are uploaded and processed on TinyWow's servers. It says all files are deleted after 1 hour, but keep sensitive documents for a local tool anyway.

[tinywow.com](https://tinywow.com/)

### PairDrop

![PairDrop waiting screen: "Open PairDrop on other devices to send files"](/blog/free-ai-tools/pairdrop.webp "1280x800")

PairDrop is a free, open-source (GPL-3.0) way to send files between devices in the browser, similar to AirDrop but across Windows, Android, iPhone, Mac and Linux. Open it on both devices on the same network and they appear to each other. You can also pair devices with a code or join a temporary public room to send over the internet. No setup, no sign-up.

Transfers use WebRTC, peer to peer and encrypted in transit. The FAQ says files on the same network never go to a server, and the service does not use a database. Paired devices behind strict networks may be relayed through PairDrop's TURN server.

- **Good for:** getting a photo from your phone to a work laptop without emailing it to yourself.
- **Watch out:** everyone in a public room sees each other's devices, so leave the room when you are done.

[pairdrop.net](https://pairdrop.net/)

## Images

### Photopea

![Photopea landing page: Free Online Photo Editor, fully local](/blog/free-ai-tools/photopea.webp "1280x800")

Photopea is a Photoshop-style editor in the browser that opens PSD files (its main format) along with AI, Figma, INDD, HEIC and many others. It says files are processed on your device and never leave it, and it works offline. It is free, with ads, and logging in is optional. A Premium account, a one-time payment for a set period, removes the ads and adds credits for the AI tools (background removal and replacing part of an image from a text description).

- **Good for:** editing a PSD from a designer when you do not have Photoshop, or resizing and cleaning up images for a website.
- **Watch out:** if you close the tab without saving, the work is gone. The AI tools work with credits and are a different case from plain editing, so do not assume they stay on your device too.

[photopea.com](https://www.photopea.com/)

## Forms

### Tally

![Tally home page: The simplest way to create forms, no signup required](/blog/free-ai-tools/tally.webp "1280x800")

Tally lets you build a form by typing, the way you write a document, and adding blocks for questions. The free plan includes unlimited forms and submissions within fair use, plus conditional logic, signatures, calculations and file uploads (10 MB per file). You can start a form without signing up. Tally says it is GDPR compliant and hosted in Europe. The Pro plan ($24 a month) removes Tally branding and adds custom domains, partial submissions and larger uploads.

- **Good for:** contact forms, client intake questionnaires, event sign-ups and quick surveys, connected to Notion, Google Sheets or a webhook.
- **Watch out:** free forms show Tally branding. If you collect personal data, you still need your own privacy notice.

[tally.so](https://tally.so/)

## How I would use them together

- **Research to slides:** ask Perplexity for sources, read the originals, write the outline yourself, then let Gamma draft the deck and Napkin turn the key paragraph into a diagram.
- **Private document work:** use BentoPDF to merge, compress or sign, and PairDrop to move the file from your phone. Neither uploads your files to a third party's storage.
- **A short explainer video:** write the script, record the voice in any recorder, clean it in AudioMass, then build the video in Google Vids or Lumen5.
- **Lead capture:** a Tally form that sends answers to Google Sheets or a webhook is a perfectly good start before you need a CRM.
- **Sensitive questions:** Duck.ai for anything you would rather not keep in an account history.

## Privacy checklist before you paste anything into a free AI tool

1. **Assume it is stored** unless the tool's own privacy page says otherwise.
2. **Check training settings.** Some tools train on free users' content by default (Perplexity's toggle is on by default, Qwen's policy allows de-identified training).
3. **Remove names, emails, phone numbers, account numbers and client details** before pasting. Replace them with placeholders.
4. **Prefer tools that run in the browser** (BentoPDF, Photopea, AudioMass) for private files.
5. **Check the source** of any fact an AI gives you before you publish it.

I cover these habits in [staying safe with AI](/learn-ai), and the free [AI prompt builder](/tools/prompt-builder) helps you write a clear prompt in your browser before it goes near an AI tool.

## More free tools, and help if you need it

I also keep a set of [free tools](/tools) on this site, with no sign-up and everything running in your browser: a prompt builder, an MVP planner, AI API and [call center cost calculators](/tools/call-center-cost-calculator), an [automation ROI calculator](/tools/automation-roi-calculator), a [meta tag generator](/tools/meta-tag-generator) and a README generator.

If you want AI built into your own product or workflow, with your data handled properly, see [AI integration](/services/ai-integration), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-free-ai-tools.webp",
    published_at: "2026-10-21T10:00:00Z",
    author: "Usama Munawar",
    tags: ["AI Tools", "Free Tools", "Productivity", "Privacy", "Open Source"],
  },
  {
    id: "39",
    title: "Node.js 26 LTS: What's New, What Breaks, and the New Release Schedule",
    seo_title: "Node.js 26 LTS: What's New, What Breaks and How to Upgrade",
    slug: "nodejs-26-lts-whats-new-upgrade",
    excerpt: "Node.js 26 becomes LTS on 28 October 2026: Temporal by default, V8 14.6, what was removed since Node 24, support dates and the new yearly schedule.",
    content: `## The short version

Node.js 26 is scheduled to become the Active LTS line on 28 October 2026. As I write this (21 October), it is still the Current release: every 26.x build so far, up to 26.12.0 on 14 October, is published without an LTS label, and the codename is not yet assigned. The Node.js Release repository lists **Lithium** as the planned name, with the usual note that future names can change.

What matters for backend and full-stack teams:

- **Temporal is enabled by default**, so you get a proper date and time API without a polyfill.
- **V8 14.6** (Node 24 ships V8 13.6), with \`Map.prototype.getOrInsert()\` and \`Iterator.concat()\`.
- **Removals across Node 25 and 26**: the \`_stream_*\` modules, \`res.writeHeader()\`, \`fs.F_OK\` and friends, \`SlowBuffer\`, the \`--experimental-transform-types\` flag, and Corepack is no longer bundled.
- **Native addons need rebuilding**: \`NODE_MODULE_VERSION\` is 147, up from 137 on Node 24.
- **Node 22 reaches end of life on 30 April 2027.** That is the deadline that should drive your planning, not the 26 launch.
- **From Node 27, every release becomes LTS**: one major a year, plus a new Alpha channel.

My advice: test on 26 now, move production after the LTS promotion and once your host supports it, and upgrade anything still on 22 first.

## Support timeline

Dates from the Node.js Release schedule:

| Line | Codename | Released | Active LTS | Maintenance | End of life |
|---|---|---|---|---|---|
| 22 | Jod | 24 April 2024 | 29 October 2024 | 21 October 2025 | 30 April 2027 |
| 24 | Krypton | 6 May 2025 | 28 October 2025 | 20 October 2026 | 30 April 2028 |
| 26 | Lithium (planned) | 5 May 2026 | 28 October 2026 | 20 October 2027 | 30 April 2029 |

Node 24 was scheduled to move into maintenance on 20 October 2026; it keeps getting security fixes until April 2028 but fewer backports. Node 25 never became LTS and reached end of life on 1 June 2026. Node 20 reached end of life on 30 April 2026.

One more date for this week: the project announced security releases for the 26.x, 24.x and 22.x lines on or shortly after 21 October 2026, with the highest severity rated HIGH. Whatever line you run, take that patch first.

## What is new since Node 24

### Temporal, on by default

This is the change I care about most. \`Date\` is a common source of bugs in code that handles billing periods, bookings or time zones. Temporal separates the concepts \`Date\` mixes together (a calendar date, an exact instant, a date and time in a named zone), and its objects are immutable.

\`\`\`js
const start = Temporal.PlainDate.from('2026-10-28');
console.log(start.add({ months: 30 }).toString()); // 2029-04-28

const now = Temporal.Now.zonedDateTimeISO('Europe/London');
console.log(now.toString());
\`\`\`

On Node 22 and 24, \`Temporal\` is not there by default (\`typeof Temporal\` is \`'undefined'\`). If you publish a library or share code with older runtimes, keep a fallback or a polyfill until you drop them.

### V8 14.6

Node 26 ships V8 14.6 (Chromium 146). Two additions I expect to use in ordinary backend code:

\`\`\`js
// Group jobs by tenant without the "if (!map.has(key))" dance
const byTenant = new Map();
for (const job of jobs) {
  byTenant.getOrInsertComputed(job.tenantId, () => []).push(job);
}

// Iterate several sources as one
for (const row of Iterator.concat(activeUsers, invitedUsers)) {
  sendDigest(row);
}
\`\`\`

From the Node 25 release, which used V8 14.1, you also get built-in base64 and hex on \`Uint8Array\` (\`bytes.toBase64()\`, \`Uint8Array.fromBase64()\`), and the project highlighted faster \`JSON.stringify\`. I have not benchmarked that, so measure your own payloads before you credit it with anything.

### Undici 8 behind fetch

Node 26.0.0 moved the built-in HTTP client, Undici, to version 8. Most code only touches it through \`fetch()\`. If you import \`undici\` directly, set custom dispatchers or agents, or pin an Undici version, read its release notes before upgrading.

### TypeScript: strip-only

Type stripping has been on by default since 22.18 and 23.6, and is marked stable from 24.12 and 25.2. Node 26 removes \`--experimental-transform-types\`, so anything that needs code generation fails:

\`\`\`bash
$ node --experimental-transform-types server.ts
node: bad option: --experimental-transform-types

$ node server.ts   # with an enum inside
SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode
\`\`\`

Enums, namespaces with runtime code and parameter properties need either a rewrite (a union type or a plain object) or a real compile step with \`tsc\` or a tool such as \`tsx\`.

### Smaller changes

- **Web Storage** came out from behind a flag in Node 25. On 26.12.0, \`localStorage\` is \`undefined\` and prints a warning unless you pass \`--localstorage-file\`. The API docs describe a \`DOMException\` instead, so do not build anything on either behaviour.
- **Permission model**: Node 25 added \`--allow-net\` alongside the existing file system and child process permissions.
- **\`ErrorEvent\`** is a global from Node 25.
- **npm** stays on major version 11 (26.12.0 ships npm 11.20.0).

## What breaks

These are the semver-major removals and deprecations between 24 and 26 that I would search a codebase for. Most are old APIs, so they tend to turn up in older dependencies rather than in your own code.

| Old | Replacement | Status |
|---|---|---|
| \`require('_stream_readable')\` and the other \`_stream_*\` modules | \`node:stream\` | Removed in 26 (DEP0193) |
| \`res.writeHeader()\` | \`res.writeHead()\` | Removed in 26 (DEP0063) |
| \`fs.F_OK\`, \`fs.R_OK\`, \`fs.W_OK\`, \`fs.X_OK\` | \`fs.constants.F_OK\` etc. | Removed in 25 (DEP0176) |
| \`SlowBuffer\` | \`Buffer.allocUnsafeSlow()\` | Removed in 25 (DEP0030) |
| Short AES-GCM auth tags without \`authTagLength\` | Pass \`authTagLength\` to \`createDecipheriv()\` | End of life in 26 (DEP0182) |
| \`module.register()\` | \`module.registerHooks()\` | Runtime warning in 26 (DEP0205) |
| Passing a \`CryptoKey\` to \`node:crypto\` APIs | A \`KeyObject\`, or keep the key in Web Crypto | Runtime warning in 26 (DEP0203) |

Two of these have official codemods:

\`\`\`bash
npx codemod@latest @nodejs/fs-access-mode-constants
npx codemod@latest @nodejs/slow-buffer-to-buffer-alloc-unsafe-slow
\`\`\`

The \`module.register()\` warning matters if you use custom loaders or a tool that installs them for you (instrumentation and test tooling are the usual places). It still works, but it will be removed in a later version, so check that your tools have moved to \`registerHooks()\`.

### Corepack is no longer bundled

Since Node 25, Corepack is not shipped with Node. If your projects use pnpm or Yarn through the \`packageManager\` field and \`corepack enable\`, CI and Docker builds on 26 will fail at that step until you install it yourself:

\`\`\`dockerfile
FROM node:26-bookworm-slim
RUN npm install -g corepack && corepack enable
\`\`\`

### Native addons

\`NODE_MODULE_VERSION\` is 147 on Node 26 and 137 on Node 24, so any addon compiled against the Node ABI has to be rebuilt or needs a prebuilt binary for 26. Addons built on Node-API are ABI stable and are meant to run on later majors without recompiling (their own external libraries may still need attention). In practice: delete \`node_modules\`, reinstall on 26, and do not reuse a Docker layer cache from a Node 24 image.

## The new release schedule

Node.js 26 is the last major to follow the odd/even model. From Node 27, the project moves to one major release a year:

- **Alpha** for six months (October to March), for library authors and CI, with semver-major changes allowed and versions like \`27.0.0-alpha.1\`.
- **Current** for six months (April to October).
- **LTS** for 30 months, so 36 months of support from the first Current release.
- **Every release becomes LTS.** There are no more short-lived odd versions to skip.
- **Version numbers follow the calendar year** of the first Current release: 27.0.0 in 2027, 28.0.0 in 2028.

For Node 27, the Alpha starts on 28 October 2026 (the same day 26 becomes LTS), 27.0.0 is planned for April 2027, LTS for October 2027, and end of life for 30 April 2030.

If you only ever run LTS, very little changes: one upgrade window a year, every October, with a predictable 30-month runway. If you maintain packages, add the Alpha line to your CI matrix early, which is exactly what the project asks for. The odd releases used to be where breakage showed up first; now the Alpha is.

## Hosting and tooling checks

Check these before you change any production runtime:

- **Docker**: the official \`node:26\`, \`node:26-bookworm-slim\`, \`node:26-trixie-slim\` and \`node:26-alpine\` tags exist. On 14 October, \`node:lts\` still pointed at the same image as \`node:24\`. If you build from \`node:lts\`, expect it to follow 26 after the promotion without any change on your side, so pin the major instead.
- **AWS Lambda**: \`nodejs26.x\` is in public preview, which AWS says is not for production workloads. Its target for general availability is November 2026.
- **Vercel**: the Node.js versions page lists 24.x (the default) and 22.x. I would wait until 26.x appears there, then set it with \`engines\`.

Make the version explicit everywhere it is read:

\`\`\`json
{
  "engines": { "node": "26.x" }
}
\`\`\`

\`\`\`yaml
strategy:
  matrix:
    node: [22, 24, 26]
\`\`\`

## Upgrade checklist

1. **Apply this week's security release** on the line you run today.
2. **Run the test suite on 26 with deprecations as errors**: \`NODE_OPTIONS=--throw-deprecation npm test\`. That turns every runtime warning above into a failing test with a stack trace.
3. **Search for the removed APIs** in the table, including inside \`node_modules\`, and update the dependencies that use them.
4. **Rebuild native addons** from a clean install.
5. **Install Corepack** explicitly if you rely on it.
6. **Check TypeScript execution** if you run \`.ts\` files directly: no enums, no transform flag.
7. **Check loader hooks and instrumentation** for \`module.register()\`.
8. **Confirm your platform supports 26** (Docker base image, Lambda, Vercel, your CI runners).
9. **Pin the major** in \`engines\`, \`.nvmrc\` and the Dockerfile so local, CI and production agree.
10. **Ship to staging first**, then production after 28 October, with the previous image ready to roll back.

## Should you upgrade now?

- **On Node 22**: yes, plan it this quarter. You have until April 2027. Going straight to 26 is reasonable if your host supports it; otherwise 24 is a safe stop.
- **On Node 24**: no rush. It is supported until April 2028. Test on 26 now and move when your platforms are ready.
- **New projects**: start on 26 once it is LTS and your host offers it.

If a Node service is already open for other work, such as moving an MCP server to [MCP's stateless spec](/blog/mcp-2026-07-28-stateless-spec-migration), that is a good moment to change the runtime too. If you are still deciding whether Node is the right backend at all, I wrote up how I choose in [Laravel vs Node.js](/blog/laravel-vs-nodejs-backend-systems).

## Need a hand?

Upgrading a production Node.js backend, or building a new product on it? See [Idea to launch](/services/mvp-development), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-nodejs-26.webp",
    published_at: "2026-10-21T09:00:00Z",
    author: "Usama Munawar",
    tags: ["Node.js", "Node.js 26", "LTS", "Upgrade", "Backend"],
  },
  {
    id: "38",
    title: "Asterisk 24 LTS: What Changed and How to Upgrade a Production Call Centre",
    seo_title: "Asterisk 24 LTS: What Changed and How to Upgrade",
    slug: "asterisk-24-lts-upgrade-guide",
    excerpt: "Asterisk 24 is the next LTS, supported to October 2031: what changed since 22 and 20, the support dates, and how to upgrade a production call centre.",
    content: `## The short version

Asterisk 24 is the next long-term support (LTS) release. At the time of writing (21 October 2026) the final 24.0.0 has not been tagged yet: release candidate 2 came out on 8 October, and the GA release is due this month.

Three things matter if you run a call centre on Asterisk:

- **Asterisk 20 moved to security fixes only on 19 October 2026** and reaches end of life on 19 October 2027. Asterisk 21 reached end of life on 18 October 2026. If you are on either, start planning now.
- **Most of the new features in 23 and 24 were also backported to 22 and 20.** The real difference between 22 and 24 is a set of removals (users.conf, DeadAGI, a few old functions and options) and a longer support window.
- **Asterisk 22 is still fully supported until October 2028.** There is no rush to leave it. If you are on 20, going straight to 24 buys you the most time, but it also means crossing the big Asterisk 21 removals (chan_sip, app_macro, res_monitor).

## Is Asterisk 24 out yet?

Not as of today. The official GitHub releases page lists 24.0.0-rc1 (17 September) and 24.0.0-rc2 (8 October), both marked as pre-releases. The Asterisk Versions page on docs.asterisk.org lists 24.x as a pre-release with a planned release date of 15 October 2026. RC2 was a small update: three bug fixes covering ChanSpy bridging and PJSIP presence and dialog-info notifications.

The RC is fine for a staging box. I would not put a release candidate on a production call centre; wait for 24.0.0, and ideally the first point release after it.

## Support timeline

These dates come from the Asterisk Versions page. LTS releases get four years of full support plus one year of security fixes; standard releases get at least one year of full support plus one year of security fixes. After end of life, a branch gets nothing.

| Version | Type | Released | Security fixes only from | End of life |
|---|---|---|---|---|
| 20 | LTS | 19 October 2022 | 19 October 2026 | 19 October 2027 |
| 21 | Standard | 18 October 2023 | 18 October 2025 | 18 October 2026 |
| 22 | LTS | 16 October 2024 | 16 October 2028 | 16 October 2029 |
| 23 | Standard | 15 October 2025 | 15 October 2026 | 15 October 2027 |
| 24 | LTS | Due October 2026 | 15 October 2030 | 15 October 2031 |

The 24 dates are based on the planned 15 October release, so treat them as approximate until the GA is out.

Asterisk 23 was a standard release and is already security only. I would not plan a production move to 23 now: 24 contains everything in it and is supported for four years longer.

## What actually changed between 22 and 24

I compared the release branches directly. Since the 22 branch was cut, almost every new feature that landed on the main branch was also cherry-picked into the 22 and 20 branches. So if you keep 22 patched, you already have most of what is "new in 24". The changes you only get by moving up are the removals made for Asterisk 23.

### Removed in Asterisk 23 (and therefore gone in 24)

From the Asterisk 23.0.0 upgrade notes:

- **users.conf** is gone. Every channel driver must be configured through its own file, and the res_phoneprov settings moved to \`phoneprov_users.conf\`.
- **DeadAGI** is gone (deprecated since Asterisk 15). Use \`AGI()\`, which handles the same cases.
- **VALID_EXTEN** is gone. Use \`DIALPLAN_EXISTS\`.
- **QUEUE_MEMBER_COUNT** is gone. Use \`QUEUE_MEMBER(<queue>,logged)\`.
- **Music on hold:** the old \`random\` option and the \`r\` flag on \`application=\` are gone. Use \`sort=random\`.
- **Voicemail:** \`maxmessage\` and \`minmessage\` are gone (use \`maxsecs\` and \`minsecs\`), and the \`cz\` language code is gone (use \`cs\`).
- **Logger:** \`rotatetimestamp\` is gone. Use \`rotatestrategy\`.
- **CLI:** \`no debug channel\` is gone. Use \`core set debug channel\`.

In dialplan terms, the fixes look like this:

\`\`\`ini
; Before (fails on 23 and 24)
 same => n,GotoIf($[\${VALID_EXTEN(sales,\${EXTEN},1)}]?known)
 same => n,Set(AGENTS=\${QUEUE_MEMBER_COUNT(support)})

; After
 same => n,GotoIf($[\${DIALPLAN_EXISTS(sales,\${EXTEN},1)}]?known)
 same => n,Set(AGENTS=\${QUEUE_MEMBER(support,logged)})
\`\`\`

\`\`\`ini
; musiconhold.conf
[default]
mode=files
directory=moh
sort=random   ; replaces random=yes
\`\`\`

### A config behaviour change worth testing

Two changes in 23 affect configs that use templates. When a module looks up a setting by name, it now gets the value that overrides the template, not the template's value. And when a setting is updated (through AMI, for example), the change now applies even if the section inherits from a template. The upgrade notes say breakage is unlikely, but if your configs lean heavily on templates, or your application edits config files through AMI, test that on staging.

### Coming from Asterisk 20: the Asterisk 21 removals

If you are jumping from 20, you also cross everything Asterisk 21 removed. The ones that hit call centres:

- **chan_sip** is gone. Every trunk and phone has to be on PJSIP.
- **app_macro** is gone. Dialplan has to use \`Gosub\` instead of \`Macro\`. The \`Queue()\` argument order also shifted when the macro argument was removed, so check any \`Queue()\` call that passes a gosub.
- **res_monitor** is gone, along with the \`w\` and \`W\` options of \`Queue()\`. Call recording has to use \`MixMonitor\`.
- **NoCDR**, **ImportVar**, **SetAMAFlags**, **chan_skinny**, **chan_mgcp** and **chan_alsa** are gone too.

For most older call centres, the chan_sip to PJSIP move is the real project; the Asterisk upgrade itself is the smaller part. I covered how the Asterisk and application layers fit together in [Asterisk + Laravel call centre](/blog/asterisk-laravel-voip-call-center).

### Newer features you may already have

These arrived during the 23 and 24 cycle and were backported, so check the version, not the major number:

- **chan_websocket**, a channel driver that sends call media over a websocket, also usable with ARI external media (from 20.16.0 and 22.6.0). This is the simplest route for streaming audio to an AI service; I wrote about that in [AI voice agents on Asterisk](/blog/ai-voice-agents-asterisk).
- **ARI REST requests over the same websocket** used for events (from 20.14.0 and 22.4.0).
- **PJSIP endpoint maintenance mode** (\`res_pjsip_maintenance\`, from 20.20.0 and 22.10.0): new calls to or from an endpoint are refused while calls in progress carry on.
- **Per-endpoint RTP port ranges** with \`rtp_port_start\` and \`rtp_port_end\` (from 20.20.0 and 22.10.0), useful for firewall rules per trunk.
- **The internal web server's \`/httpstatus\` page is now off by default** (a security fix, from 20.18.2 and 22.8.2). Set \`enable_status=yes\` in http.conf if you relied on it.

## Should you move to 24, or stay on 22?

- **On 20 or 21:** yes, plan it now. 21 is out of support and 20 is security only. Go to 24 once it is GA, or to 22 if your distribution does not support 24 yet.
- **On 22:** no hurry. Keep taking 22.x point releases and plan 24 for a quiet period in 2027. You lose nothing by waiting for 24 to settle.
- **On FreePBX:** Sangoma's FreePBX 17 documentation says it ships with Asterisk 22 by default. I could not find an official statement about Asterisk 24, so check your distribution's support before upgrading Asterisk underneath it.

## How I would plan the upgrade

### 1. Take an inventory

Before touching anything, I record what is running and search the config for anything removed:

\`\`\`bash
asterisk -rx "core show version"
asterisk -rx "module show" > modules-before.txt
asterisk -rx "pjsip show registrations" > registrations-before.txt

# Removed in 23
grep -rnE 'VALID_EXTEN|QUEUE_MEMBER_COUNT|DeadAGI|rotatetimestamp|maxmessage|minmessage' /etc/asterisk/
grep -rnE '^\\s*random\\s*=' /etc/asterisk/musiconhold.conf
ls -l /etc/asterisk/users.conf

# Removed in 21 (only if coming from 20)
grep -rnE 'Macro\\(|,Monitor\\(|NoCDR|ImportVar|SetAMAFlags|[(&]SIP/' /etc/asterisk/
\`\`\`

Run the same searches over your AGI scripts and any dialplan your application generates or stores in a database. That is where old function names tend to hide.

### 2. Build a staging box

Same operating system, same Asterisk build options, a copy of the real config, and a test trunk or a second account on the same carrier. Build from source or packages exactly as you will in production, so the module list matches.

### 3. Test the call paths that make money

I test the flows the business depends on, not just "a call connects":

- Inbound to IVR, queue and agent, including queue announcements and position messages.
- Outbound campaigns, including the dialer's AGI or ARI calls and caller ID.
- Call recordings: a file is written, has audio on both legs, and lands where your application expects it.
- SIP trunk registration and failover to the backup trunk.
- Codecs: confirm what is negotiated with each trunk and phone type, and listen for one-way audio.
- AMI and ARI clients: logins, the events you consume, and the actions your CRM sends.
- CDR, CEL and queue_log rows: your reports read them, so check they still arrive with the fields you expect.

### 4. Update the database schema if you use realtime

If your PJSIP or queue configuration lives in a database, the alembic scripts need running. Recent releases add columns (per-endpoint RTP ports, PJSIP taskpool options) and change others:

\`\`\`bash
cd contrib/ast-db-manage
cp config.ini.sample config.ini   # then set sqlalchemy.url
alembic -c config.ini upgrade head
\`\`\`

One to schedule carefully: a new revision widens the queue_log \`time\` column to microseconds on MySQL and MariaDB. The upgrade note says it rewrites the table and blocks queue_log writes while it runs, which on a large table means a maintenance window. PostgreSQL is not affected.

### 5. Cut over with a way back

On cut-over day I drain traffic rather than dropping it. If the old server has \`res_pjsip_maintenance\` loaded, it can refuse new calls while existing ones finish:

\`\`\`bash
asterisk -rx "pjsip set maintenance on all"
asterisk -rx "core show channels count"
\`\`\`

Maintenance state is held in memory only and clears on restart. For rollback, keep the old server, or a snapshot of it, untouched until the new one has run a full business day, and know exactly which DNS record, trunk IP allow-list or carrier setting you would switch back.

## Upgrade checklist

1. Confirm 24.0.0 is GA (and check whether a 24.0.1 has followed).
2. Check your distribution or FreePBX supports 24; if not, target 22.
3. Read the upgrade notes for 23.0.0 and every 24 release you will cross.
4. Run the inventory searches and fix removed functions, options and users.conf.
5. Coming from 20: finish chan_sip to PJSIP, Macro to Gosub, Monitor to MixMonitor first.
6. Build staging, run the call path tests, check recordings, codecs and trunk failover.
7. Run alembic on a copy of the database; time the queue_log change.
8. Back up \`/etc/asterisk\`, the database, AGI scripts and sounds.
9. Cut over in a quiet window, drain calls, keep the old server for rollback.
10. Watch registrations, channel counts and error logs for the first few days.

If you are still weighing up whether to run Asterisk at all, [Asterisk vs Twilio](/blog/asterisk-vs-twilio-cost-breakdown) covers the cost side, and the free [call center cost calculator](/tools/call-center-cost-calculator) runs the numbers for your own volume.

## Need a hand?

Planning an Asterisk upgrade, or moving off chan_sip and macros? See [VoIP and Asterisk](/services/voip-asterisk), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-asterisk-24.webp",
    published_at: "2026-10-21T09:10:00Z",
    author: "Usama Munawar",
    tags: ["Asterisk", "Asterisk 24", "VoIP", "Call Center", "Upgrade"],
  },
  {
    id: "37",
    title: "PHP 8.6 for Laravel Developers: Partial Function Application, clamp() and What Breaks",
    seo_title: "PHP 8.6 for Laravel Developers: What's New, What Breaks",
    slug: "php-8-6-whats-new-laravel-developers",
    excerpt: "PHP 8.6 lands on 19 November 2026: partial function application, clamp(), readonly defaults, what breaks, the deprecations and an upgrade checklist.",
    content: `## The short version

PHP 8.6 is scheduled for general availability on 19 November 2026. The release candidates are out now (RC3 shipped on 8 October, RC4 is planned for 22 October), so the feature list is frozen. This is the right moment to test against it, not to run it in production.

For a Laravel developer the release comes down to three things:

- **Partial function application** lets you write \`Str::limit(?, 120)\` where you used to write a closure. It is the biggest language change, and it pairs with the pipe operator that arrived in PHP 8.5.
- **Small additions you will use**: a native \`clamp()\`, default values on readonly properties, a \`SortDirection\` enum and a \`Time\\Duration\` class.
- **Stricter behaviour and a long deprecation list**: many functions now throw a \`ValueError\` on bad input, the session extension has safer defaults, and old aliases such as \`is_integer()\` and \`spl_object_hash()\` are deprecated.

None of it forces a rewrite. The work is mostly packages, CI and the deprecation log.

## Release timeline

These dates come from the official PHP 8.6 release schedule.

| Milestone | Date |
|---|---|
| Alpha 1 | 2 July 2026 |
| Beta 1 | 13 August 2026 |
| RC2 (RC1 was skipped) | 24 September 2026 |
| RC3 | 8 October 2026 |
| RC4 and RC5 (planned) | 22 October and 5 November 2026 |
| General availability | 19 November 2026 |

The RC announcements say release candidates are not for production, so put them in CI and on staging.

## Partial function application

Partial function application (PFA) means calling a function with some arguments filled in and the rest replaced by placeholders. Instead of running the function, PHP returns a \`Closure\` that waits for the missing arguments. \`?\` stands for exactly one argument, and \`...\` stands for "everything else".

\`\`\`php
use Illuminate\\Support\\Str;

// Before: a closure that only exists to fix one argument
$excerpts = $posts->pluck('body')->map(fn (string $body) => Str::limit($body, 120));

// PHP 8.6
$excerpts = $posts->pluck('body')->map(Str::limit(?, 120));
\`\`\`

The generated closure copies parameter names, types and defaults from the original, so reflection and stack traces see a real signature. It works with functions, static and instance methods, closures and invokable objects. It does not work with \`new\`, so partially apply a static factory method instead.

### Why \`?\` is safer than \`...\` in Laravel callbacks

This is the detail that matters most in Laravel code. \`Collection::map()\` calls your callback with two arguments, the value and the key (under the hood, \`Arr::map()\` runs \`array_map($callback, $array, $keys)\`). A first-class callable passes both along:

\`\`\`php
// Bug: the key (0, 1, 2...) lands in Str::limit()'s $limit parameter
$posts->pluck('body')->map(Str::limit(...));

// Fine: one placeholder, so the key is dropped
$posts->pluck('body')->map(Str::limit(?, 120));
\`\`\`

The RFC spells this out. Without a \`...\` placeholder, extra arguments passed to the generated closure are ignored. With \`...\`, they are forwarded to the underlying function, which is how an optional parameter ends up receiving a value you never meant to pass. My rule: \`?\` for callbacks, \`...\` only when you deliberately want "fill in these and pass the rest through".

One more difference from an arrow function: the arguments you supply are evaluated when the closure is created, not each time it is called. \`Str::limit(?, config('blog.excerpt_length'))\` reads the config once. Usually that is what you want, but it is not the same as \`fn ($body) => Str::limit($body, config('blog.excerpt_length'))\`.

### With the pipe operator

PHP 8.5 added \`|>\`, which needs a single-argument callable on its right-hand side. PFA fills the gap that first-class callables left:

\`\`\`php
$summary = $post->body
    |> strip_tags(...)
    |> Str::squish(?)
    |> Str::limit(?, 160);
\`\`\`

According to the RFC, a single-placeholder PFA directly on the right of a pipe is optimised into a direct call, so there is no closure overhead. The UPGRADING notes also say that \`array_map()\` with a first-class callable or PFA callback is now compiled into the equivalent \`foreach\` loop.

## clamp()

\`\`\`php
// Before
$perPage = min(max($request->integer('per_page', 15), 1), 100);

// PHP 8.6
$perPage = clamp($request->integer('per_page', 15), min: 1, max: 100);
\`\`\`

\`clamp($value, $min, $max)\` returns the value if it is in range, otherwise the nearest bound. It accepts any comparable values, including strings and \`DateTimeImmutable\`, and it throws a \`ValueError\` if \`$min\` is greater than \`$max\` or either bound is \`NAN\`.

Laravel already has \`Number::clamp()\`, which is \`min(max($number, $min), $max)\` and only takes \`int|float\`. It does not complain when the bounds are the wrong way round; the native function throws. If your bounds come from config or user input, add a test before you swap one for the other.

The name is now taken, too. A global \`function clamp()\` declared without a \`function_exists()\` guard, in your code or in a package, will be a fatal redeclaration error on PHP 8.6. Namespaced functions are unaffected.

## Readonly properties with defaults

\`\`\`php
interface PaymentGateway
{
    public string $name { get; }
}

final readonly class StripeGateway implements PaymentGateway
{
    public string $name = 'stripe';

    public function __construct(private StripeClient $client) {}
}
\`\`\`

Until now a readonly property could not declare a default value. In 8.6 it can, which suits fixed metadata on classes that implement interface properties (added in PHP 8.4). The default counts as the initialising assignment, so the constructor cannot overwrite it: assigning it again throws "Cannot modify readonly property".

## Other additions worth knowing

- **\`SortDirection\` enum** in the global namespace, with \`SortDirection::Ascending\` and \`SortDirection::Descending\`. It is deliberately unbacked, so map it to \`'asc'\` or \`'desc'\` with \`match\` until the framework accepts it directly. A global class called \`SortDirection\` in your own code now clashes; \`App\\Enums\\SortDirection\` does not.
- **\`Time\\Duration\`**, an immutable "stopwatch" duration with nanosecond precision: \`Time\\Duration::fromMilliseconds(500)\`, \`fromSeconds()\`, \`fromIso8601DurationString('PT1M30S')\`, \`add()\`, \`sub()\`, \`multiplyBy()\`, \`divideBy()\`, and comparison with \`<\` and \`>\`. Existing functions such as \`sleep()\` do not accept it (the RFC only wires it into the new polling API), so for now it is a value object for your own timeouts and retry policies.
- **\`#[\\Override]\` on class constants and enum cases**, and \`__debugInfo()\` on enums.
- **JSON error locations**: \`json_last_error_msg()\` and \`JsonException\` messages now include where the error is, which helps when a webhook payload fails to decode.
- **Performance work**: \`printf()\` with only \`%s\` and \`%d\` compiles to string interpolation, and \`array_sum()\`, \`str_pad()\` and JSON encoding are faster. I have no benchmark of my own, so measure your app.

## What breaks

### Stricter argument checks

Across the standard library and extensions, input that used to be accepted, truncated or overflowed now throws. A selection that can reach a web app:

- \`file_exists()\`, \`is_file()\`, \`filesize()\`, \`getenv()\`, \`parse_str()\` and friends throw a \`ValueError\` when given a string containing NUL bytes. If raw user input reaches a filesystem check, validate it first.
- \`number_format()\` throws a \`ValueError\` when \`$decimals\` is outside the integer range, and \`sleep()\` and \`usleep()\` throw instead of overflowing.
- \`preg_grep()\` returns \`false\` on a PCRE error instead of a partial array, like the other \`preg_*\` functions.
- \`fclose()\`, \`file_put_contents()\` and \`copy()\` now return \`false\` when flushing or closing the stream fails. That is a fix, but code that checks the return value may start reporting failures it used to miss.
- \`trim()\`, \`ltrim()\` and \`rtrim()\` now strip form feed (\`\\f\`) by default.

### Session defaults

\`session.use_strict_mode\` is now \`1\`, \`session.cookie_httponly\` is \`1\` and \`session.cookie_samesite\` is \`Lax\`. Laravel's session layer does not use PHP's native sessions (there is no \`session_start()\` in \`Illuminate\\Session\`), and the default \`config/session.php\` already sets \`http_only\` to \`true\` and \`same_site\` to \`'lax'\`. A standard Laravel app should not notice. Other code on the same runtime that calls \`session_start()\` will, especially anything relying on cross-site POST requests carrying the session cookie (the RFC names SP-initiated SAML SSO as an example).

### Magic properties and exit codes

- \`??\` and \`empty()\` on a magic property no longer call \`__get()\` when \`__isset()\` has already written the property into the object. This only matters for classes whose \`__isset()\` does that, so check any custom magic classes.
- On a hard out-of-memory failure PHP now calls \`abort()\` instead of \`exit(1)\`, so the exit code becomes 134 and a core dump may be written. If your queue worker supervision or alerting matches on exit codes, check it.

### Deprecations

Deprecations are not errors, but they fill logs and they are the list of what PHP 9 will remove. The ones I would grep a Laravel codebase and its \`vendor\` folder for:

| Deprecated in 8.6 | Use instead |
|---|---|
| \`is_integer()\`, \`is_long()\` | \`is_int()\` |
| \`is_double()\`, \`doubleval()\` | \`is_float()\`, \`floatval()\` |
| \`spl_object_hash()\` | \`spl_object_id()\` |
| \`strcoll()\`, \`SORT_LOCALE_STRING\` | \`Collator::compare()\`, \`Collator::sort()\` |
| Objects passed to \`http_build_query()\` | \`get_object_vars()\` first |
| \`return\` inside \`finally\` | Return after the \`try\` block |
| Returning a value from \`__construct()\` | Remove the return value |
| \`SplFileObject::fgetcsv()\`, \`fputcsv()\` | Plain \`fgetcsv()\` and \`fputcsv()\`, or a CSV library |
| Mbregex (\`mb_ereg*\` and friends) | \`preg_*\` with the \`u\` modifier |

\`return\` in \`finally\` is the one with a real bug behind it: it silently swallows the exception or overwrites the return value from the \`try\` block.

Laravel can collect these: the default \`config/logging.php\` sends deprecations to \`LOG_DEPRECATIONS_CHANNEL\`, which is \`null\` out of the box. Point it at a real channel on staging and run your test suite and a few days of traffic against 8.6.

## Does Laravel support PHP 8.6?

Not officially yet, as far as I can verify. Laravel 13's \`composer.json\` requires \`"php": "^8.3"\` and Laravel 12's requires \`^8.2\`, with no upper bound, so Composer will install either on 8.6. But as I write, the 13.x branch's CI tests PHP 8.3, 8.4 and 8.5 only. Wait for the framework to list 8.6 before you run it in production, and check every package: some pin an upper PHP bound. Composer will tell you which:

\`\`\`shell
composer prohibits php 8.6
\`\`\`

If you are still on PHP 8.2, the urgent move is not 8.6. PHP 8.2's security support ends on 31 December 2026, so get to 8.4 or 8.5 first. If you are also behind on the framework, my [Laravel 13](/blog/laravel-13-whats-new-upgrade-from-12) guide covers that upgrade.

## Upgrade checklist

1. **Know your starting point.** On PHP 8.2, move to 8.4 or 8.5 first.
2. **Add an 8.6 RC job to CI**, allowed to fail, so you see problems weeks before GA.
3. **Run \`composer prohibits php 8.6\`** and list the packages that block you.
4. **Turn on deprecation logging** on staging with \`LOG_DEPRECATIONS_CHANNEL\`.
5. **Grep for name clashes**: global \`function clamp(\`, a global \`SortDirection\` class, and \`let\`, \`is\` or \`_\` used as class, function or constant names (now deprecated).
6. **Grep for the deprecated functions** in the table above, in \`app/\` and \`vendor/\`.
7. **Check non-Laravel session code** and anything that relies on cross-site POST requests.
8. **Check worker supervision** for assumptions about exit codes.
9. **Update static analysis and code style tools** before you use \`?\` placeholders, or they may fail to parse your code.
10. **Ship the PHP bump on its own**, after GA and after your framework and packages confirm support, with the previous runtime one deploy away.

New code, such as a [Laravel AI SDK](/blog/laravel-ai-sdk-agents-tools-semantic-search) feature or a [Laravel MCP server](/blog/laravel-mcp-server), is a good place to try PFA and pipes first.

## Need a hand?

Planning a PHP or Laravel upgrade on a production app? See [Laravel development](/services/laravel-development), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-php-8-6.webp",
    published_at: "2026-10-21T09:20:00Z",
    author: "Usama Munawar",
    tags: ["PHP", "PHP 8.6", "Laravel", "Upgrade", "Partial Function Application"],
  },
  {
    id: "36",
    title: "I Built an Agent Skill That Drafts LinkedIn Posts and Leaves Publishing to Me",
    seo_title: "LinkedIn Post Agent Skill: Draft, Lint, Approve",
    slug: "linkedin-post-agent-skill-open-source",
    excerpt: "An open-source agent skill that drafts one research-backed LinkedIn post at a time, lints it for AI-sounding writing and never posts for you. How it works and why.",
    content: `## The idea in one paragraph

Most LinkedIn automation optimises for volume: schedule thirty posts, let a bot publish them, hope for reach. I wanted the opposite. I built an open-source agent skill, [linkedin-post-skill](https://github.com/CH-USAMA/linkedin-post-skill), that drafts one research-backed post at a time, checks the caption for AI-sounding writing, and then stops and hands the result to me. It never posts on a schedule. A human reads the draft and presses Post.

It is MIT licensed, works as a \`SKILL.md\` skill for Claude, and works with any agent that can read a markdown playbook and run Python.

## What it produces

The skill drafts three kinds of asset, all sized for a phone:

- **A single image** (1080x1350) with one idea, big text and icon-led layout.
- **A short video** of about 12 to 15 seconds, rendered from the same canvas, with elements revealed over time.
- **A PDF carousel** of 6 to 10 slides, generated from a small JSON file, plus a cover image.

Alongside the asset, it writes the caption, a first comment that carries any links, and alt text, and presents them as a ready-to-post block with numbered steps.

## Lanes by weekday, so you do not repeat yourself

Instead of "post something every day", the skill assigns each posting day a lane:

| Day | Lane | Default asset |
|---|---|---|
| Monday | News take on your stack, verified from the last 7 days | Image plus a short reveal video |
| Wednesday | First-person story from your real work | Image (before and after, or a timeline) |
| Friday | Skimmable practical: a checklist or X vs Y | PDF carousel |

It keeps a history file with one JSON line per draft, and every topic in that file counts as used, whatever its status. That is what stops it from drafting the same idea twice.

## Integrity rules instead of engagement tricks

The part I care most about is what the skill refuses to do:

- **No invented numbers, clients, quotes or anecdotes.** Where a fact is missing, it uses a placeholder and asks.
- **Ranked sources.** Official documentation and release notes come first. Every fact is verified or labelled as unverified.
- **No unattended actions.** It never reacts, reposts, deletes or comments on other people's posts by itself. It can draft two comments for me to review and paste.
- **No personal data in the repo.** Voice notes, history and analytics live in a private state folder that is git-ignored.

LinkedIn has no official API for posting to a personal profile, and automating the browser or using third-party posting tools can break its User Agreement and get an account restricted. So scheduled runs only draft and notify. Publishing stays manual, one post at a time.

## A linter for AI-sounding writing

Agents write in a recognisable voice: "leverage", "seamless", "it's not just X, it's Y", a rocket emoji, a wall of hashtags. A small Python script, \`slop_lint.py\`, checks a caption against a list of these tells and exits non-zero when it finds any:

\`\`\`bash
python3 skill/daily-linkedin-post/tools/slop_lint.py caption.txt
\`\`\`

It checks:

- AI-sounding words such as "delve", "leverage", "robust" and "game-changing"
- Structural tells such as "not just X, it's Y" and "not only X but also Y"
- One-word rhetorical question lines and "Here's what I learned" announcements
- Em and en dashes and double hyphens
- Links before the \`First comment:\` marker
- Hashtag count (three to five), the length of line 1 (140 characters or fewer) and total word count (120 to 220 words)

The loop is simple: write the caption, lint it, fix what it flags, lint again until it is clean. The lists sit at the top of the script, so you can edit them to match your own voice.

## Carousels from a JSON file

A carousel is a JSON file, and one command turns it into a 1080x1350 PDF with a cover PNG:

\`\`\`bash
python3 skill/daily-linkedin-post/tools/carousel.py examples/slides.json out.pdf
\`\`\`

There are four slide types: \`cover\`, \`point\`, \`compare\` and \`cta\`. A \`point\` slide takes a number, a title, a few lines, optional code lines, an icon and a colour. Colours carry meaning (coral for a mistake, emerald for the fix, amber for an insight), and icons are Lucide names such as \`database\`, \`timer\` or \`shield-check\`, downloaded by the setup script rather than bundled.

Because the format is just data, an agent can write it reliably, and you can edit a slide by hand without touching any layout code.

## How a run works

1. **Read state:** the history, the idea backlog and a voice file with your tone and sample posts.
2. **Choose today's lane** and a topic that has not been used.
3. **Research** with ranked sources and note the URL for the first comment.
4. **Design** the asset: one idea per image or slide.
5. **Write and lint** the caption.
6. **Save the files** and log a draft in the history.
7. **Present** the ready-to-post block.
8. **You approve and post**, then mark it as posted and, a day later, add the numbers.

Measurement is manual on purpose: record impressions, reactions, comments, reposts and saves, and review monthly by engagement rate and by reach relative to followers, not by raw impressions.

## Try it

The project page has the short version: [LinkedIn Post Agent Skill](/project/24). The code is on [GitHub](https://github.com/CH-USAMA/linkedin-post-skill), MIT licensed.

\`\`\`bash
git clone https://github.com/CH-USAMA/linkedin-post-skill.git
cd linkedin-post-skill
bash setup.sh
python3 skill/daily-linkedin-post/tools/slop_lint.py examples/caption.txt
\`\`\`

You need Python 3.9 or newer, \`pip\`, and \`npm\` (only to fetch the icons). On macOS or Windows you may need to adjust the font paths at the top of \`style.py\`. Then copy the skill folder into your agent's skills directory, copy the starter state folder somewhere private, and fill in your voice file. The repository has guides for usage, the weekly workflow, customising lanes and colours, and the safety notes.

## Why this matters beyond LinkedIn

The pattern is useful for any task where an agent can do 90 percent of the work and a person must own the last step:

- A **draft, lint, approve** loop beats full automation wherever your name is on the output.
- **State files** (history, ideas, voice) give an agent memory without a database.
- **Deterministic checks** like a linter catch the failures a model will not notice in its own writing.
- **Small tools with a JSON interface** are easier for agents to use than a big framework.

I use the same thinking when I build automation for clients: let software handle the instant first step and the repetitive formatting, and keep a person in control of anything that carries a reputation, a payment or a promise. For a related example see [AI lead follow-up automation](/blog/ai-lead-follow-up-automation-n8n), and for choosing between a workflow tool and custom code see [n8n vs custom code](/blog/n8n-vs-custom-code-automation). If you want search visibility to work alongside your social content, [how to rank on Google and in AI search](/blog/seo-ai-search-rank-google-chatgpt-2026) covers it.

## Want an agent workflow built for your team?

I build agent skills, automations and AI features with guardrails: drafting and review loops, document pipelines, lead handling and internal tools. See [AI integration](/services/ai-integration) and [automation with n8n](/services/automation-n8n), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-linkedin-post-skill.webp",
    published_at: "2026-10-15T11:00:00Z",
    author: "Usama Munawar",
    tags: ["AI Agents", "Claude", "LinkedIn", "Open Source", "Automation"],
  },
  {
    id: "35",
    title: "Automating Word Documents in an Offline Desktop App: Python, docxtpl and Offline Speech",
    seo_title: "Word Document Automation in Python: An Offline App",
    slug: "python-word-document-automation-offline-desktop-app",
    excerpt: "How an offline Windows app fills an office's own Word formats from short typed or spoken input: docxtpl, formatters, Vosk speech, encrypted backup and licensing.",
    content: `## The problem: the same document, a hundred times

A lot of office work is one document written over and over. A findings letter, a decision, a notice: the layout is fixed, most of the wording is fixed, and only a handful of details change, such as names, dates, amounts and a case number. People retype it, copy an old file and edit it, and every copy is a chance to leave the wrong name or amount in the text.

I built Complaint Documents, an offline Windows desktop app, for exactly this situation in regional offices that write findings and decisions every day. This article explains how the pieces fit together, because the same design works for any office that produces documents from templates: legal, HR, insurance, schools, clinics and government.

You can see the project page here: [Complaint Documents](/project/23).

## Principle 1: keep the original document, change only the words

The most important requirement was that the output must look exactly like the office's own document: same fonts, justified paragraphs, spacing, page size and margins. Generating a new document from scratch would never match. Instead, the app fills the office's own Word file.

In Python, \`docxtpl\` does this. You open the real \`.docx\`, put template tags where the changing words are (\`{{ case_no }}\`, \`{{ amount }}\`), and render:

\`\`\`python
from docxtpl import DocxTemplate

doc = DocxTemplate("templates/finding.docx")
doc.render({
    "case_no": "WMS-CCI/217/2026",
    "amount": "Rs.205,293/-",
})
doc.save("output/CCI-217-2026.docx")
\`\`\`

Everything that is not a tag stays untouched, because it is the original document. \`python-docx\` covers the extra edits the template engine cannot do, such as page headers that carry the case number on page two onwards.

## Principle 2: let people type short, print long

Staff should not have to type \`WMS-CCI/217/2026\` or \`Rs.205,293/-\` correctly every time. The app takes a short form and produces the office's form:

| You type | The document shows |
|---|---|
| \`CCI-217-26\` | \`WMS-CCI/217/2026\` |
| \`10-09-2026\` | \`10.09.2026\` |
| \`205293\` | \`Rs.205,293/-\` |
| From \`02/2026\`, to \`07/2026\` | \`02/2026 to 07/2026 (06 months)\` |

Each box type has a small formatter. A simplified version of the case number and amount formatters looks like this:

\`\`\`python
def format_case_no(raw: str) -> str:
    kind, number, year = raw.strip().upper().split("-")
    return f"WMS-{kind}/{number}/20{year}"

def format_amount(raw: str) -> str:
    return f"Rs.{int(raw.replace(',', '')):,}/-"
\`\`\`

The real versions handle many more cases, but the idea is the same: validate on entry, format once, and use the formatted value everywhere in the document. Before the file is created, the app also flags empty boxes and likely typing mistakes, which catches errors when they are cheap to fix.

Sentences adapt to the details as well. The complainant's gender switches he and his to she and her only where it refers to the complainant, and one hearing or several changes whether the text says "a hearing was held" or "hearings were held". That is conditional text inside the template, not code scattered through the app.

## Principle 3: make the second case faster than the first

Good document automation remembers things:

- Typing a case number that is already saved fills in its details.
- A reference number seen in an earlier case shows a note, fills in the consumer's details and offers the follow-on formats in one click.
- Values typed while generating are saved to the case, so they are never typed twice.
- A batch screen loads cases from an Excel sheet with \`openpyxl\`, shows them in a table, lets you preview one row and then generates a document for every row.
- Every generated file is listed by date, with preview, open in Word, print, read aloud and ZIP export.

None of this is clever. It is the difference between a tool that saves ten seconds and one that changes how the office works.

## Principle 4: work offline, including the voice input

Many offices cannot count on a steady internet connection, and sending case details to a cloud service is not something they want. So the app runs entirely on the PC, including speech input.

Speech recognition uses Vosk, an offline engine. Audio comes from the microphone with \`sounddevice\`, and the recognizer turns it into text that fills the focused box:

\`\`\`python
import json
from vosk import Model, KaldiRecognizer

model = Model("models/en")
recognizer = KaldiRecognizer(model, 16000)

# feed microphone chunks as they arrive
if recognizer.AcceptWaveform(chunk):
    text = json.loads(recognizer.Result())["text"]
\`\`\`

The recognizer's text then goes through the same box formatters as typing. Saying "checking date fifteenth December" ends up as a correctly formatted date, because voice is just another way to fill the same field.

## Principle 5: protect the data and the product

A desktop app that holds case details needs a plan for the PC dying and for the software being copied:

- **Encrypted backup.** Case details are backed up automatically in encrypted form (using Python's \`cryptography\` library) and can be restored on a new PC.
- **Licensing.** Each PC needs a licence key, activated online once; after that the app works offline. The download itself sits behind the licence check on a small Next.js site.
- **Packaging.** PyInstaller builds a Windows installer, so office PCs get a single Setup file and no Python install. Updates and new formats arrive automatically.

## Why a desktop app and not a web app?

A web app would have been easier to update, but it was the wrong fit here:

- The documents have to open in Microsoft Word on the office PC, and \`pywin32\` can drive Word directly for previews and printing.
- Case details stay on the machine unless they are backed up.
- It must keep working when the network does not.

If your office has reliable internet and no data-residency concerns, the same document engine works as a web app too. The principles above do not change; only the packaging does.

## What this looks like in practice

The user picks the finding by typing part of its name (small spelling mistakes are fine), fills in the boxes in the same order as the document, and presses Create File. The Word file is saved, named by case number and opened. The form clears for the next case.

The stack, in one line: Python with PySide6 for the interface, docxtpl and python-docx for the Word files, openpyxl for Excel, pywin32 for Word, Vosk for offline speech, \`cryptography\` for backups and PyInstaller for the installer.

## Could this work for your office?

If your team keeps retyping the same documents, this pattern can save hours a week and remove a whole class of mistakes. I build document automation as desktop tools, web apps or workflows depending on the case. See [automation with n8n](/services/automation-n8n), [AI integration](/services/ai-integration) and [MVP development](/services/mvp-development), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call. If you are weighing a workflow tool against custom software, [n8n vs custom code](/blog/n8n-vs-custom-code-automation) explains how I decide.`,
    featured_image: "/blog/blog-document-automation.webp",
    published_at: "2026-10-15T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Python", "Document Automation", "Desktop Apps", "Offline Speech", "Automation"],
  },
  {
    id: "30",
    title: "How to Rank on Google and Get Cited by ChatGPT and AI Overviews in 2026",
    seo_title: "How to Rank on Google and in AI Search (2026 Guide)",
    slug: "seo-ai-search-rank-google-chatgpt-2026",
    excerpt: "A practical 2026 guide to ranking on the first page of Google and being cited in AI answers: what Google says, what studies show, and ten steps that actually work.",
    content: `## The short version

Search in 2026 has two front doors: the classic ranked results, and AI answers (Google's AI Overviews and AI Mode, ChatGPT search, Perplexity and others) that quote a handful of sources. The good news is that you do not need two strategies. Google's own guidance on its generative AI search features says optimizing for them is optimizing for the search experience, and so it is still SEO. There is no special markup, no AI-only file and no rewrite that unlocks them.

What changes is how much your pages need to be easy to quote.

## What the evidence says (and does not say)

- **Google's position.** Its Search Central guidance on generative AI features says the same foundations apply: meet the technical requirements, follow the spam policies, write helpful content, and keep important information in text. It also warns against trying to manufacture mentions.
- **ChatGPT search leans on Bing's index.** Industry studies report that most ChatGPT citations come from pages that rank well in Bing, which is one more reason to be in Bing Webmaster Tools, not only Google Search Console.
- **Schema is not a magic switch.** One large study of pages that added structured data found no measurable lift in citations. Keep schema for accuracy and rich results, not as an AI hack.
- **\`llms.txt\` is optional.** Treat it as harmless documentation, not a ranking tactic.
- **Treat third-party citation studies as hypotheses.** Samples, prompts and dates vary widely, and overlap between platforms is low.

## Ten things that actually move the needle

### 1. Pick one clear search intent per page

A page that tries to rank for everything ranks for nothing. For each page, write down the question it answers and who is asking. "Laravel developer for a SaaS rebuild" is a page. "Web development services" is a vague category.

### 2. Put the answer first

Lead each section with a direct answer in plain sentences, then the detail. Humans skim; AI systems quote passages. A clear two-sentence answer under a descriptive heading is the unit that gets lifted into a snippet or an AI response.

### 3. Show real experience

Google's quality guidance rewards first-hand experience. Case studies with specific constraints, decisions and outcomes beat generic advice. Name the stack, the problem and what changed. This is where a portfolio has an advantage over a template agency site.

### 4. Get the technical basics right

Fast pages, mobile layout, a sitemap, working canonical tags, one H1 per page, descriptive titles under about 60 characters and meta descriptions that read like a promise. Pages must be crawlable without needing clicks or logins; server-rendered or prerendered HTML is the safest.

### 5. Submit to both search engines

Verify the site in Google Search Console and Bing Webmaster Tools, submit the sitemap in both, and use IndexNow so Bing (and other participating engines) hear about new pages quickly. Google does not use IndexNow, so use URL Inspection to request indexing for important new pages.

### 6. Build topical depth, then link it together

Five good articles on one theme, linked to each other and to the service page they support, beat fifty unrelated posts. Link from every article to the relevant service page and back, with descriptive anchor text.

### 7. Use current, specific facts

Cite versions, dates and numbers, and name the primary source. Posts that say "Laravel 13, released March 2026" or quote a spec revision are both more useful and more quotable than evergreen fluff. Update posts when facts change and show the date.

### 8. Be consistent about who you are

Use the same name, bio, location and links everywhere: site, GitHub, LinkedIn, Google Business Profile if you have one, directories and guest posts. Search and AI systems resolve entities, and inconsistent details weaken the match.

### 9. Earn mentions off your own site

Reviews, client testimonials with names, podcast or guest posts, open-source contributions and mentions in communities your clients read. A few relevant, real mentions are worth more than a pile of low-quality directory links, and buying them risks a penalty.

### 10. Measure and iterate

Check Search Console for queries, impressions and the pages that nearly rank (positions 8 to 20), then improve those first: sharpen the title, add the missing section, add internal links. Search Console now reports on generative AI features too, so watch that report as it matures.

## A realistic timeline

New pages are usually crawled within days, but rankings for competitive phrases take months. Start with specific, lower-competition queries where you can be the best answer: a named technology plus a named use case, a comparison you have real experience with, or a city plus a service. Those win first and build the authority for broader terms.

## A simple monthly routine

1. Publish two useful articles tied to services you sell.
2. Update one older article with fresh facts.
3. Add internal links from new pages to old ones and back.
4. Review Search Console and Bing Webmaster Tools, and fix anything flagged.
5. Ask one happy client for a named testimonial or a mention.

## Want help with this?

I build sites that render fully for search and AI crawlers, and I help teams plan content around what they actually sell. See [Laravel development](/services/laravel-development), [AI integration](/services/ai-integration) and [MVP development](/services/mvp-development), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-seo-ai-search.webp",
    published_at: "2026-10-15T09:00:00Z",
    author: "Usama Munawar",
    tags: ["SEO", "AI Search", "GEO", "Digital Marketing", "Google"],
  },
  {
    id: "31",
    title: "AI Lead Follow-Up Automation: Reply to Every Enquiry in Minutes",
    seo_title: "AI Lead Follow-Up Automation with n8n: A Practical Guide",
    slug: "ai-lead-follow-up-automation-n8n",
    excerpt: "How to capture, qualify and answer every lead within minutes using n8n and AI, what to keep human, the guardrails that matter, and the numbers to track.",
    content: `## Why speed decides who wins the lead

Most businesses lose leads without ever knowing it. An enquiry arrives at 9 pm, gets seen the next afternoon, and by then the prospect has talked to two competitors. The widely cited lead response research from MIT and InsideSales found that contacting a lead within five minutes made a conversation dramatically more likely than waiting half an hour. Treat the exact multiples with caution, since they come from an older study and vendors quote them freely, but the direction is consistent across sales research: the first quick, relevant reply has a large advantage.

Automation fixes the part humans are bad at, which is being instantly available at any hour. It should not replace the human conversation. It should make sure the conversation starts.

## What an AI lead follow-up system does

1. **Captures every enquiry** from your website form, chat, email and WhatsApp in one place.
2. **Replies in minutes** with something specific, not a generic "thanks for your interest".
3. **Qualifies the lead** by asking two or three questions and scoring the answers.
4. **Routes it**: hot leads go straight to a calendar link and a phone alert, medium leads to a nurture sequence, poor fits get a polite answer and a useful link.
5. **Logs everything** to your CRM so nothing depends on someone remembering.

## A workable architecture

A typical build with n8n looks like this:

- A **webhook** receives the lead from your form, chat or ad platform.
- An **AI agent step** reads the message, scores the lead against your criteria, and drafts a reply.
- A **switch** routes the lead into one of a few branches (book now, nurture, decline).
- Branches send the email or message, create or update the CRM record, and alert you on Slack, email or WhatsApp for hot leads.
- A **scheduled follow-up** nudges anyone who has not replied after a day or two.

n8n is a good fit when you want to move fast and keep control of the workflow. When the logic gets heavy (pricing rules, per-client permissions, audit trails), the same flow is better as code in your own backend; I compare the two in [n8n vs custom code](/blog/n8n-vs-custom-code-automation). If your product is on Laravel, queues and the new first-party AI tooling make this natural to build in-house; see [Laravel AI SDK](/blog/laravel-ai-sdk-agents-tools-semantic-search).

## Rules that keep it from going wrong

- **Say it is automated when it matters.** Be honest if a reply was drafted by software, especially in regulated fields.
- **Keep a human in the loop for money and exceptions.** Pricing, contracts, complaints and anything unusual go to a person. Companies that over-automated complex support cases have reversed course.
- **Ground replies in your real content.** Give the agent your services, price ranges, availability and FAQs, and tell it to say "I will check and come back to you" instead of guessing.
- **Do not send what you cannot back up.** Review a sample of replies every week for the first month.
- **Respect consent and privacy.** Store only what you need, honour unsubscribes, and follow the rules for your market (GDPR, TCPA and similar).
- **Have a fallback.** If the AI provider is down, the lead should still reach your inbox and phone.

## How to measure it

Track a few numbers before and after launch, and ignore vanity metrics:

| Metric | Why it matters |
|---|---|
| Median time to first reply | The thing you are fixing |
| Enquiry to booked call rate | The business outcome |
| Qualified meetings per month | Quality, not just volume |
| Hours of manual follow-up saved | The cost side |
| Error or escalation rate | Whether the AI is safe to keep running |

Be sceptical of headline claims from tool vendors, such as "300% more leads". Your own before and after numbers over 60 to 90 days are the only figures that count.

## What to automate first

If you only do one thing this month, do this: an instant, personal acknowledgement for every web enquiry, with a link to book a call and an alert to your phone. It takes days, not weeks, and it removes the biggest leak. Qualification scoring, nurture sequences and chat come next.

## Want this set up for your business?

I build lead capture, AI qualification and CRM automation with n8n and custom Laravel or Node.js backends. See [AI integration](/services/ai-integration) and [automation with n8n](/services/automation-n8n), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-ai-lead-follow-up.webp",
    published_at: "2026-10-15T09:10:00Z",
    author: "Usama Munawar",
    tags: ["AI Automation", "n8n", "Lead Generation", "Digital Marketing", "CRM"],
  },
  {
    id: "32",
    title: "Laravel 13: What's New and Whether to Upgrade from Laravel 12",
    seo_title: "Laravel 13: What's New and How to Upgrade from 12",
    slug: "laravel-13-whats-new-upgrade-from-12",
    excerpt: "Laravel 13 shipped on March 17, 2026 with a first-party AI SDK and vector search. The support timeline, what changed, an upgrade checklist, and who should move now.",
    content: `## The short answer

Laravel 13 was released on March 17, 2026 and requires PHP 8.3 or newer. If you are on Laravel 12, the upgrade is usually small and worth doing this quarter, mostly because of the support calendar. If you are still on Laravel 11, you are already out of security support and the upgrade is no longer optional.

## Support timeline

The dates below come from the official Laravel support policy: bug fixes for 18 months, security fixes for two years.

| Version | PHP | Released | Bug fixes until | Security fixes until |
|---|---|---|---|---|
| 11 | 8.2 to 8.4 | March 12, 2024 | September 3, 2025 | March 12, 2026 |
| 12 | 8.2 to 8.5 | February 24, 2025 | August 13, 2026 | February 24, 2027 |
| 13 | 8.3 to 8.5 | March 17, 2026 | Q3 2027 | Q1 2028 |

Two things follow from this. Laravel 11 is end of life. Laravel 12 stopped getting bug fixes in August and is now security only, which is fine for a while but means a non-security bug you hit will not be patched upstream.

## What is new in Laravel 13

### A first-party AI SDK

The headline change is the Laravel AI SDK (\`laravel/ai\`): one API for text generation, agents, embeddings, images, audio, transcription and vector stores, with providers including OpenAI, Anthropic and Gemini behind it. If you have been wiring AI features with hand-rolled HTTP clients or a third-party wrapper, this is the part that changes your architecture. I cover it with working code in [Laravel AI SDK: build an agent with tools and semantic search](/blog/laravel-ai-sdk-agents-tools-semantic-search).

### Vector search in the query builder

Eloquent can now query vector columns directly with \`whereVectorSimilarTo()\`, backed by PostgreSQL and the pgvector extension. That makes semantic search a normal query instead of a separate service. If you are choosing a database for a new product, this tips the balance toward PostgreSQL for AI-heavy features; the trade-offs are in [MySQL vs PostgreSQL for Laravel SaaS](/blog/mysql-vs-postgresql-laravel-saas).

### Smaller changes worth knowing

- **PHP attributes** are available as an optional alternative to class properties in many places in the framework. Nothing forces you to migrate existing code.
- **JSON:API resources** for APIs that follow the JSON:API specification.
- **Queue routing** to send jobs to the right connection and queue centrally.
- **\`Cache::touch()\`** to extend a cached item's lifetime without rewriting it.
- **Stricter request forgery protection** (CSRF), which is the change most likely to need a look in apps with unusual form or API setups.

Check the official release notes and upgrade guide for the exact list before you start; point releases keep adding to it.

## Upgrade checklist

1. **Check your PHP version.** Laravel 13 needs 8.3 or newer. Moving PHP is often the bigger job, so do it first and ship it on its own.
2. **Read the upgrade guide** top to bottom and note anything that touches code you actually use.
3. **Check your packages.** Every first-party and third-party package needs a release that allows Laravel 13. Billing, admin panels and permissions packages are the usual blockers.
4. **Bump the constraint** to \`^13.0\`, run \`composer update\`, and fix what breaks.
5. **Run the test suite**, then exercise the paths tests rarely cover: queues, scheduled commands, webhooks, mail, file uploads and anything that posts a form from another origin.
6. **Deploy to staging**, run it for a few days, then production, with the previous release one command away.

Most Laravel 12 applications upgrade with limited code changes. The time goes into PHP, packages and verification, not framework code.

## Should you upgrade now?

- **Yes, now:** you are on Laravel 11, or you want to build AI features and would rather use the first-party SDK than maintain your own client.
- **Soon:** you are on Laravel 12 with a healthy test suite. Plan it into the next quiet sprint, and do it before the February 2027 security cut-off puts it under time pressure.
- **Not yet:** a key package has no Laravel 13 release, or the app has no tests and no staging. Fix that first; the upgrade will be easier afterwards.

## Need a hand?

Upgrading a production Laravel app, or adding AI features to one? See [Laravel development](/services/laravel-development) and [AI integration](/services/ai-integration), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-laravel-13.webp",
    published_at: "2026-10-15T09:20:00Z",
    author: "Usama Munawar",
    tags: ["Laravel", "Laravel 13", "PHP 8.5", "Upgrade", "AI SDK"],
  },
  {
    id: "33",
    title: "Laravel AI SDK: Build an Agent with Tools and Semantic Search",
    seo_title: "Laravel AI SDK: Agents, Tools and Semantic Search",
    slug: "laravel-ai-sdk-agents-tools-semantic-search",
    excerpt: "A hands-on guide to the Laravel AI SDK: install it, write an agent with structured output and tools, add pgvector semantic search, and fail over between providers.",
    content: `## What the Laravel AI SDK is

The Laravel AI SDK (\`laravel/ai\`) is the first-party package for AI features in Laravel 13. It gives you one API for text and agents, embeddings, reranking, images, audio, transcription, files and vector stores, and it sits on top of several providers, so the model is a configuration choice and not a rewrite.

Provider support, as listed in the documentation:

| Feature | Providers |
|---|---|
| Text | OpenAI, Anthropic, Gemini, Azure, Groq, xAI, DeepSeek, Mistral, Ollama |
| Images | OpenAI, Gemini, xAI |
| Speech (TTS and STT) | OpenAI, ElevenLabs, Mistral (STT only) |
| Embeddings | OpenAI, Gemini, Azure, Cohere, Mistral, Jina, VoyageAI |
| Reranking | Cohere, Jina |

The documentation for this package was still marked as covering an upcoming version when I wrote this, so treat the examples below as the shape of the API and check the current docs before you copy them into production.

## Install it

\`\`\`shell
composer require laravel/ai
php artisan vendor:publish --provider="Laravel\\Ai\\AiServiceProvider"
php artisan migrate
\`\`\`

The migration creates the tables the SDK uses to store conversations. Add your provider keys to \`.env\` (for example \`ANTHROPIC_API_KEY\` or \`OPENAI_API_KEY\`) and set default models in \`config/ai.php\`.

## An agent is a class

The core idea is that an agent is a dedicated PHP class holding the instructions, context, tools and output schema for one job. Generate one with Artisan:

\`\`\`shell
php artisan make:agent SalesCoach --structured
\`\`\`

Then fill it in:

\`\`\`php
class SalesCoach implements Agent, HasStructuredOutput
{
    use Promptable;

    public function instructions(): Stringable|string
    {
        return 'You are a sales coach, analyzing transcripts and providing feedback and an overall sales strength score.';
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'feedback' => $schema->string()->required(),
            'score' => $schema->integer()->min(1)->max(10)->required(),
        ];
    }
}
\`\`\`

Prompting it returns a structured response you read like an array:

\`\`\`php
$response = (new SalesCoach)->prompt('Analyze this sales transcript...');

return $response['score'];
\`\`\`

Structured output is the feature I would reach for first. A score, a category or a list of extracted fields that your code can rely on is far more useful in a product than a paragraph of prose.

## Give the agent tools

Tools let the agent call your code while it answers. Generate one with \`php artisan make:tool\`, which creates a class in \`app/Ai/Tools\`:

\`\`\`php
class RandomNumberGenerator implements Tool
{
    public function description(): Stringable|string
    {
        return 'This tool may be used to generate cryptographically secure random numbers.';
    }

    public function handle(Request $request): Stringable|string
    {
        return (string) random_int($request['min'], $request['max']);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'min' => $schema->integer()->min(0)->required(),
            'max' => $schema->integer()->required(),
        ];
    }
}
\`\`\`

Return it from the agent's \`tools()\` method and the model can decide when to call it. The same rule applies as for any tool a model can call: validate the arguments, scope every query to the signed-in user, and never expose an operation you would not expose to a form. I go deeper on that for MCP in [Laravel MCP server](/blog/laravel-mcp-server).

## Semantic search with pgvector

For "search by meaning" you store an embedding next to each record and query by similarity. On PostgreSQL with pgvector, the migration is:

\`\`\`php
Schema::ensureVectorExtensionExists();

Schema::create('documents', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('content');
    $table->vector('embedding', dimensions: 1536);
    $table->timestamps();
});
\`\`\`

Adding \`->index()\` to the vector column creates an HNSW index with cosine distance, and the model casts the column to \`array\`. Querying is one method:

\`\`\`php
$documents = Document::query()
    ->whereVectorSimilarTo('embedding', 'best wineries in Napa Valley')
    ->limit(10)
    ->get();
\`\`\`

\`whereVectorSimilarTo\` filters by a minimum cosine similarity between 0.0 and 1.0 (you can pass \`minSimilarity: 0.4\`) and orders by similarity. Given a plain string, Laravel generates the embedding for you. If you need more control there are lower-level methods: \`whereVectorDistanceLessThan\`, \`selectVectorDistance\` and \`orderByVectorDistance\`.

This is a good fit for retrieval in a support assistant or a knowledge base without running a separate vector database, as long as you are on PostgreSQL. If you are choosing between databases, see [MySQL vs PostgreSQL for Laravel SaaS](/blog/mysql-vs-postgresql-laravel-saas). For the wider design questions around chunking, evaluation and failure modes, see [production RAG systems: lessons learned](/blog/production-rag-systems-lessons).

## Failover between providers

Provider outages and rate limits are routine. The SDK lets you pass a list of providers and falls back to the next one on a service interruption or rate limit:

\`\`\`php
$response = (new SalesCoach)->prompt(
    'Analyze this sales transcript...',
    provider: [Lab::OpenAI, Lab::Anthropic],
);
\`\`\`

That one argument is a cheap resilience win for any feature that must keep working.

## Production notes

- **Queue long calls.** Agents can be queued, so slow model calls never block a web request.
- **Test with fakes.** The SDK provides fakes for agents, images, audio, embeddings and more, so your tests never hit a paid API.
- **Budget and log.** Cap output length, record token usage per user or tenant, and rate-limit expensive endpoints from day one.
- **Keep prompts in code review.** Instructions live in a class, so changes show up in pull requests like any other behaviour change.

## Need this built?

Adding AI features to a Laravel product? See [AI integration](/services/ai-integration) and [Laravel development](/services/laravel-development), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-laravel-ai-sdk.webp",
    published_at: "2026-10-15T09:30:00Z",
    author: "Usama Munawar",
    tags: ["Laravel", "AI SDK", "Agents", "pgvector", "AI Integration"],
  },
  {
    id: "34",
    title: "MCP's 2026-07-28 Spec: What Stateless Means for Your Server",
    seo_title: "MCP 2026-07-28 Spec: Stateless Servers Explained",
    slug: "mcp-2026-07-28-stateless-spec-migration",
    excerpt: "The biggest Model Context Protocol update since launch removes sessions and the initialize handshake. What changed, what is deprecated, and a migration checklist.",
    content: `## What changed

The 2026-07-28 revision of the Model Context Protocol is the largest since the protocol launched. The headline: MCP is now stateless. There is no session handshake and no session id, so an MCP server behaves much more like an ordinary HTTP API and scales like one.

It replaces the 2025-11-25 revision. The four Tier-1 SDKs (TypeScript, Python, Go and C#) already support it. If you run an MCP server, or connect agents to one, this is what changes.

## The big changes, in plain terms

### 1. No sessions

Protocol-level sessions and the \`Mcp-Session-Id\` header are gone from the Streamable HTTP transport. The list endpoints (\`tools/list\`, \`resources/list\`, \`prompts/list\`) no longer vary per connection. If your server needs state across calls, it now hands out explicit, server-minted handles that the client passes back as ordinary tool arguments. State becomes something you design on purpose, not something hidden in the connection.

### 2. No initialize handshake

The \`initialize\` and \`notifications/initialized\` exchange is removed. Every request carries its protocol version and client capabilities in \`_meta\`:

- \`io.modelcontextprotocol/protocolVersion\`
- \`io.modelcontextprotocol/clientCapabilities\`

Clients should also send \`clientInfo\`, and servers should identify themselves in each result's \`_meta\`. A version mismatch returns \`UnsupportedProtocolVersionError\`.

Servers must implement a new \`server/discover\` call that advertises supported protocol versions, capabilities and identity. Clients can call it first to pick a version.

### 3. Multi Round-Trip Requests

Servers used to send their own requests mid-call (\`roots/list\`, \`sampling/createMessage\`, \`elicitation/create\`). That needed a live bidirectional connection, which is exactly what stateless servers do not have. The replacement is Multi Round-Trip Requests: the server returns an \`InputRequiredResult\` (\`resultType: "input_required"\`) describing what it needs, and the client retries the original request with \`inputResponses\`. Every result now carries a required \`resultType\` field, \`"complete"\` for ordinary results.

### 4. Subscriptions and streams

\`resources/subscribe\` and the HTTP GET endpoint are replaced by a single \`subscriptions/listen\` stream, where clients opt in to specific change notifications. SSE stream resumability (\`Last-Event-ID\`) is removed: if a response stream breaks, the client re-issues the request with a new request id.

### 5. Caching and routing

- Results from the list and read calls must now include \`ttlMs\` (a freshness hint) and \`cacheScope\` (\`public\` or \`private\`), so clients can cache instead of polling.
- Servers should return tools in a deterministic order, which also helps LLM prompt caching.
- Streamable HTTP POST requests must carry \`Mcp-Method\` and \`Mcp-Name\` headers, so gateways and load balancers can route without parsing bodies.

### 6. Auth and schema

- Authorization servers should include the \`iss\` parameter (RFC 9207), and clients must validate it before redeeming a code.
- Client credentials are bound to the issuer that created them.
- Dynamic Client Registration (RFC 7591) is deprecated in favour of Client ID Metadata Documents.
- Tool \`inputSchema\` and \`outputSchema\` now accept any JSON Schema 2020-12 keywords.

### 7. Extensions and deprecations

Tasks (long-running work) moved out of the core into an official extension, \`io.modelcontextprotocol/tasks\`. Roots, Sampling and Logging are deprecated, along with the old HTTP+SSE transport. Deprecated features stay for at least twelve months under the new lifecycle policy. Suggested replacements: pass paths through tool parameters instead of Roots, call your LLM provider directly instead of Sampling, and log to stderr or OpenTelemetry instead of the Logging feature.

## Old and new at a glance

| Before (2025-11-25) | Now (2026-07-28) |
|---|---|
| Session id header, per-connection state | No sessions; explicit handles in tool arguments |
| \`initialize\` handshake | Version and capabilities in \`_meta\` on every request |
| Server-initiated requests | Multi Round-Trip Requests (\`input_required\`) |
| \`resources/subscribe\`, GET stream | \`subscriptions/listen\` |
| Experimental tasks in core | Tasks extension |
| Sampling, Roots, Logging | Deprecated |

## Migration checklist for server authors

1. **Upgrade your SDK** to a release that supports 2026-07-28, and keep answering older clients while they catch up.
2. **Remove session assumptions.** Anything stored per connection (a cursor, a cart, an open file) needs an explicit handle that you issue and the client returns.
3. **Implement \`server/discover\`.**
4. **Replace server-initiated requests** with the multi round-trip pattern.
5. **Add \`ttlMs\` and \`cacheScope\`** to list and read results, and make tool order deterministic.
6. **Re-check authorization**: issuer validation, the issuer-bound client credentials, and a Client ID Metadata Document if you register clients.
7. **Stop using Sampling, Roots and Logging** in new code.
8. **Test with a real client**, then with an old one.

## What this means in practice

Stateless servers are easier to run: any instance can answer any request, so you can put them behind a normal load balancer, scale them horizontally and deploy without draining sessions. The cost is that state is now your job. For a Laravel server, \`laravel/mcp\` already speaks this revision; I walk through building one in [Laravel MCP server](/blog/laravel-mcp-server). For agents that also use phone lines, see [AI voice agents on Asterisk](/blog/ai-voice-agents-asterisk).

## Need an MCP server built or migrated?

See [AI integration](/services/ai-integration), or email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute call.`,
    featured_image: "/blog/blog-mcp-2026.webp",
    published_at: "2026-10-15T09:40:00Z",
    author: "Usama Munawar",
    tags: ["MCP", "AI Integration", "Claude", "Architecture", "Agents"],
  },
  {
    id: "26",
    title: "Laravel vs Django for SaaS: Choosing the Right Backend in 2026",
    seo_title: "Laravel vs Django for SaaS: Choosing a Backend in 2026",
    slug: "laravel-vs-django-for-saas",
    excerpt: "A practical comparison of Laravel and Django for building multi-tenant SaaS products, covering ecosystem, billing, background jobs, hiring, and long-term maintenance cost.",
    content: `## The honest answer

Both frameworks will get you to a working SaaS. The decision is rarely about raw capability and almost always about ecosystem fit, team hiring, and how much of the boring plumbing you get for free.

I build most SaaS backends on Laravel. That is a considered choice, not a habit, and Django remains the better pick in a few specific situations.

## Side by side

| Dimension | Laravel (PHP) | Django (Python) |
|---|---|---|
| Language | PHP 8.3+ | Python 3.12+ |
| ORM | Eloquent, active record style | Django ORM, data mapper leaning |
| Background jobs | Queues plus Horizon, first party | Celery, separate stack to run |
| Billing | Cashier for Stripe and Paddle | Third party packages, more glue |
| Admin panel | Filament, Nova | Django admin, built in |
| Real time | Reverb, Echo, broadcasting built in | Channels, extra setup |
| Data and ML work | Requires a separate service | Native, best in class |
| Hosting cost | Very low, shared or single VPS friendly | Low, slightly heavier tooling |

## Where Laravel wins for SaaS

- **Billing on day one.** Cashier handles subscriptions, trials, proration, and webhooks. In Django you assemble that yourself.
- **Queues and scheduling are first party.** Horizon gives you throughput, retries, and failure visibility without adding Celery, a broker, and a monitoring layer.
- **Multi tenancy is a solved pattern.** Mature packages cover both single database and database per tenant models.
- **Team velocity.** Migrations, validation, policies, mail, notifications, and testing all ship in the box with one convention.

## Where Django wins

- **Anything data or ML heavy.** If your product core is recommendations, forecasting, or model inference, staying in Python removes an entire service boundary.
- **Admin heavy internal tools.** The Django admin is still the fastest path to a usable back office for a small team.
- **Scientific and geospatial workloads.** GeoDjango and the Python data ecosystem have no real PHP equivalent.

## The multi tenancy question

Most SaaS products start with a single database and a tenant column. That is fine, and it is easy in both frameworks. The pain arrives when a large customer asks for data isolation. Laravel has better ready made tooling for switching connections per tenant at the middleware layer, which is why migrations to a database per tenant model tend to be less disruptive.

Whichever you choose, enforce tenancy at the query layer, not in controllers. A global scope or a manager class that every query passes through is the only defence that survives a growing codebase.

## Cost of ownership

Laravel applications run comfortably on a single well configured VPS for a long time. Add Octane and Redis and a modest server handles a lot of traffic. Django is not expensive either, but Celery, a broker, and a separate ASGI setup mean more moving parts to monitor.

## How I decide

1. Is the product core a data or machine learning problem? Choose Django.
2. Is it a transactional business application with subscriptions, roles, dashboards, and integrations? Choose Laravel.
3. Does the founding team already know one language well? That outweighs every point above.

## Final thought

Frameworks rarely fail a SaaS. Unclear tenancy boundaries, unmonitored queues, and untested billing logic do. Pick the stack your team can maintain at two in the morning and spend the saved energy on the parts that actually decide whether the product survives.`,
    featured_image: "/blog/blog-laravel-vs-django.jpg",
    published_at: "2026-02-10",
    author: "Usama Munawar",
    tags: ["Laravel", "Django", "SaaS", "Architecture"],
  },
  {
    id: "25",
    title: "n8n vs Make.com for Enterprise Automation: A Field Comparison",
    seo_title: "n8n vs Make.com for Enterprise Automation",
    slug: "n8n-vs-make-enterprise-automation",
    excerpt: "Self hosted n8n or managed Make.com? A practical comparison for teams running business critical automation, covering cost at scale, data residency, error handling, and when to write custom code instead.",
    content: `## The decision in one paragraph

Make.com is the faster start and the cleaner experience for business teams. n8n is the better long term home for engineering owned automation, especially when volume grows, data cannot leave your infrastructure, or workflows need real code inside them.

## Side by side

| Dimension | n8n (self hosted) | Make.com (managed) |
|---|---|---|
| Pricing model | Server cost, unlimited executions | Per operation, scales with volume |
| Data residency | Your infrastructure, full control | Vendor cloud |
| Custom code | JavaScript and Python nodes | Limited scripting |
| Version control | Workflows as JSON in Git | Built in versioning, no Git |
| Connectors | Large and growing, plus generic HTTP | Very large, highly polished |
| Ease for non engineers | Moderate | Excellent |
| Operational burden | You run and monitor it | None |

## Where cost actually diverges

Per operation pricing is fine until a workflow iterates. A single sync that touches two thousand records can consume thousands of operations per run. Teams are usually surprised not by the price per operation, but by how quickly loops multiply them.

Self hosted n8n moves that cost into a fixed server bill. For a client processing high volume record syncs, that shift was the entire business case, and it also removed the pressure to design awkward workflows purely to save operations.

## Data residency and compliance

If workflows carry personal data, payment details, or call records, the question is not convenience but where the data rests and who can access it. Self hosted n8n inside your own network, behind your own authentication, answers that cleanly. With a managed platform you inherit the vendor's processing terms and regions.

## Error handling is where automations live or die

Whichever tool you choose, the workflow is not production ready until it has:

- **Retries with backoff** on every external call.
- **A dead letter path** so failed items land somewhere a human will actually look.
- **Idempotency keys** so a retry never creates a duplicate record.
- **Alerting** into the channel your team already watches, not an email nobody opens.

n8n gives you error workflows and full control over retry logic. Make has solid built in error handlers, but complex recovery logic quickly becomes hard to read on the canvas.

## When to stop automating and write code

I move a workflow into application code when any of these are true:

1. It has more than roughly twenty five nodes and branching logic nobody can explain in a sentence.
2. It performs financial calculations or anything that must be unit tested.
3. It runs so often that queue level control and observability matter more than a visual canvas.
4. The same logic is duplicated across three or more workflows.

A Laravel job with tests is easier to maintain than a sprawling canvas, and it can still be triggered from the automation tool.

## How I usually combine them

Business teams get a managed tool for lightweight internal workflows they own. Engineering runs self hosted n8n for anything integrated with the product, with workflows exported to Git and deployed alongside the application. Critical financial and data integrity logic lives in application code and is called over an API.

## Final thought

Automation tools are excellent glue and poor foundations. Use them to connect systems quickly, keep the business critical logic in tested code, and make sure every workflow tells you loudly when it breaks.`,
    featured_image: "/blog/blog-n8n-vs-make.jpg",
    published_at: "2026-02-04",
    author: "Usama Munawar",
    tags: ["Automation", "n8n", "Make.com", "Integration"],
  },
  {
    id: "24",
    title: "Redis vs Database Caching in Laravel: When to Use Each",
    slug: "redis-vs-database-caching-laravel",
    excerpt: "A practical guide to choosing between Redis and database query caching in Laravel, covering cache invalidation, cache stamps, TTL strategy, and the exact rules I use on production SaaS backends.",
    content: `## The short answer

Use **Redis** for high-read, low-write data that can live outside the database: user sessions, API rate-limit counters, real-time leaderboards, and precomputed dashboard tiles. Use **database query caching** only as a short-term safety net for slow, rarely-changing queries that are expensive to recalculate.

Redis is a separate memory store. Database query caching is a bandage. Know which one you are reaching for.

## Side by side

| Dimension | Redis cache | Database query cache |
|---|---|---|
| Speed | Sub-millisecond | Milliseconds to tens of milliseconds |
| Throughput | Very high, limited by network and memory | Bounded by database load |
| Invalidation | Explicit by key or tag; you control it | Automatic or TTL-based; often opaque |
| Data types | Strings, hashes, lists, sets, sorted sets | Only query result sets |
| Best for | Sessions, counters, rankings, temporary locks | Rarely-changing heavy aggregations |
| Risk | Memory pressure, eviction surprises | Stale data, cache stampede on expiry |

## When Redis is the right choice

- **User sessions and authentication state**: Redis gives shared, fast, TTL-managed session storage across multiple Laravel Octane workers or servers.
- **Rate limiting and counters**: Increment operations are atomic and fast, which is perfect for API throttling and abuse detection.
- **Real-time features**: Sorted sets and pub/sub are the backbone of leaderboards, notification counts, and live dashboards.
- **Job queue storage**: Laravel Horizon runs on Redis and provides the best observability for queue workers.

## When database query caching makes sense

Query caching is useful when a query is slow to run, the underlying data changes infrequently, and the result is acceptable for a few seconds. A typical example is a cached aggregate for a public dashboard that refreshes every minute.

I almost always set a short TTL, 60 seconds or less, and I never rely on database query caching for data that is user-specific or business-critical. The invalidation story is too weak.

## How I avoid cache stampedes

A cache stampede happens when a popular cache key expires and every request tries to rebuild it at once. In Laravel, I use:

- **Randomized TTLs**: Add a small jitter so keys do not all expire simultaneously.
- **Cache warmers**: Precompute expensive values in scheduled commands before the cache expires.
- **Locking with Cache::lock**: Let only one process rebuild the value while others serve stale data briefly or wait.
- **Cache tags**: When available, invalidate related keys in one operation instead of hunting individual keys.

## My production rules

1. Default to no cache. Write the query correctly first.
2. If the query is still slow, add a short TTL query cache as a buffer.
3. If the data is accessed frequently or shared across users, move it to Redis with explicit invalidation.
4. Always log cache hit rates and eviction rates so you know when the cache is helping or hiding a deeper problem.

## What I watch in Laravel Horizon

When Redis is used for queues, I monitor queue length, throughput, failed jobs, and worker memory. A healthy queue drains faster than it fills; a flat or growing queue is a signal that the job design, worker count, or downstream dependency needs attention.

## Final thought

Caching is a powerful tool, but it is also a liability when it becomes an invisible layer of state. The best systems I have built use Redis deliberately, with named keys, documented TTLs, and clear invalidation paths. That is how you keep a fast system from becoming a mysterious one.`,
    featured_image: "/blog/blog-redis-vs-db.webp",
    published_at: "2026-01-23",
    author: "Usama Munawar",
    tags: ["Laravel", "Redis", "Performance", "Backend", "Caching"],
  },
  {
    id: "23",
    title: "MySQL vs PostgreSQL for Laravel SaaS: Which I Choose and Why",
    slug: "mysql-vs-postgresql-laravel-saas",
    excerpt: "A practical comparison of MySQL and PostgreSQL for Laravel SaaS applications, covering JSON handling, scaling patterns, backups, and the decision framework I use on production systems.",
    content: `## The short answer

For most Laravel SaaS products I build, **MySQL** is the default because it is predictable, well supported by the Laravel ecosystem, and cheaper to run at small scale. I move to **PostgreSQL** when the product needs advanced JSON operations, full-text search, complex analytics, or strict data integrity guarantees.

Both are excellent databases. The wrong choice is usually the one that optimizes for a scenario you have not reached yet.

## Side by side

| Dimension | MySQL 8 | PostgreSQL 16 |
|---|---|---|
| Laravel ecosystem | First-class: migrations, Eloquent, Scout, Passport | Excellent support, some packages default to MySQL |
| Hosting cost | Cheaper on shared and managed VPS platforms | Slightly more expensive on managed providers |
| JSON columns | Functional JSON functions in MySQL 8 | Richer JSONB indexing and operations |
| Full-text search | Available, but less flexible | Native full-text and trigram search |
| Complex queries | Good | Better window functions, CTEs, and analytical queries |
| Replication | Mature and widely documented | Streaming replication, logical replication very strong |
| Operational familiarity | Easier to find DBAs and tooling | Slightly steeper on some shared hosts |

## When MySQL is the right choice

- **Standard SaaS CRUD**: user accounts, subscriptions, orders, roles, permissions, and content management.
- **Teams already comfortable with MySQL**: fewer surprises during incidents and easier hiring.
- **Cost-sensitive hosting**: many shared and managed Laravel hosts optimize for MySQL.
- **Simple read replicas**: MySQL replication is mature and easy to set up for read scaling.

## When PostgreSQL is the right choice

- **Heavy JSON or unstructured data**: JSONB indexing and querying is significantly better than MySQL JSON.
- **Built-in search**: you can avoid a separate search engine for many use cases.
- **Analytics-heavy features**: window functions, CTEs, and advanced aggregations are cleaner.
- **Strict integrity requirements**: foreign keys, constraints, and triggers are more robustly enforced.

## How I handle the choice in practice

I start every project with MySQL unless the requirements explicitly call for PostgreSQL features. This keeps the team moving fast and keeps hosting simple. If a feature later demands PostgreSQL, I treat it as a migration milestone rather than a day-one decision.

For large read-heavy workloads, I add read replicas. For heavy search, I integrate Meilisearch or Elasticsearch rather than overloading the primary database. For caching, I use Redis. The database should not be asked to solve every performance problem.

## Backup and disaster recovery

Regardless of the database, I set up:

- **Automated daily backups** with tested restores.
- **Point-in-time recovery** where the hosting provider supports it.
- **Separate offsite backup copies** for business-critical data.
- **Runbook documents** so the team knows exactly how to restore without improvisation.

## Final thought

MySQL versus PostgreSQL is often a debate about future-proofing. My rule is to choose the database that fits the product as it exists today, with a clear migration path if the requirements change. A fast, well-indexed MySQL database will outperform a poorly tuned PostgreSQL database every time. The skill matters more than the brand.`,
    featured_image: "/blog/blog-mysql-vs-postgres.webp",
    published_at: "2026-01-22",
    author: "Usama Munawar",
    tags: ["Laravel", "MySQL", "PostgreSQL", "Database", "SaaS"],
  },
  {
    id: "20",
    title: "Laravel vs Node.js for Backend Systems: How I Choose in 2026",
    slug: "laravel-vs-nodejs-backend-systems",
    excerpt: "A practical, production-tested comparison of Laravel and Node.js across queues, real-time, team velocity, hosting cost, and long-term maintenance, with the decision rules I actually use on client projects.",
    content: `## The short answer

Choose **Laravel** when the system is business-logic heavy: billing, multi-tenancy, RBAC, admin panels, reporting, integrations. Choose **Node.js** when the system is connection heavy: real-time fan-out, streaming, event gateways, or when the whole team already lives in TypeScript.

Most products I ship are Laravel with a small Node service where it earns its place.

## Side by side

| Dimension | Laravel (PHP 8.3+) | Node.js (TypeScript) |
|---|---|---|
| Business logic velocity | Eloquent, policies, form requests, and Nova/Filament admin cut weeks off CRUD-heavy work | Everything is assembled from libraries; more choices, more glue |
| Background jobs | Queues, batching, rate limiting, and retries are first-class | BullMQ or similar; solid, but you own more of the operational surface |
| Real-time | Reverb or Pusher; good for dashboards and chat | Native strength for high-connection-count workloads |
| Type safety | Strong typing plus static analysis (PHPStan) | End-to-end types shared with the frontend |
| Hosting cost | Single VPS with Octane handles serious traffic cheaply | Similar, but memory-per-connection scales differently |
| Hiring | Large, stable Laravel talent pool | Larger overall pool, wider quality spread |

## Where each one actually breaks

**Laravel breaks** when you push tens of thousands of persistent socket connections through the same app, or when a request needs to hold state across many seconds of streaming. That is not a PHP failure; it is the wrong tool.

**Node breaks** when a small team has to grow a large domain model fast. Without strong conventions, six months in you have five ways to validate input and three ways to talk to the database.

## The queue question

This is the deciding factor more often than raw performance. A typical backend I build has invoicing, webhook retries, PDF generation, notification fan-out, and nightly reconciliation. In Laravel this is a day of work with \`ShouldQueue\`, \`Bus::batch()\`, and horizon-style monitoring:

\`\`\`php
Bus::batch([
    new SyncInvoices($tenant),
    new ReconcilePayments($tenant),
])->onQueue('billing')->allowFailures()->dispatch();
\`\`\`

In Node the same thing works, but you are choosing and operating the queue library yourself.

## My decision rules

1. Billing, tenancy, admin, or compliance in scope? Laravel.
2. More than about 10k concurrent sockets? A dedicated Node or Go service behind the Laravel app.
3. Team already TypeScript-only and the domain is thin? Node.
4. Uncertain? Laravel core, Node at the edges. It is the cheapest architecture to reverse.

## What this looks like in production

On a recent dispatch platform, Laravel owned tenancy, jobs, billing, and the API, while a ~400-line Node service handled live driver location fan-out. One VPS, one database, two processes. Nothing exotic, and nothing that a future maintainer needs a tour to understand.

**Need a second opinion on a stack decision?** Email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute architecture call.`,
    featured_image: "/blog/blog-laravel-vs-node.webp",
    published_at: "2026-07-28T09:00:00Z",
    author: "Usama Munawar",
    tags: ["Laravel", "Node.js", "Backend Architecture", "PHP", "Comparison"]
  },
  {
    id: "21",
    title: "Asterisk vs Twilio: Real Cost Breakdown for Call Center Backends",
    seo_title: "Asterisk vs Twilio: Call Center Cost Breakdown",
    slug: "asterisk-vs-twilio-cost-breakdown",
    excerpt: "Self-hosted Asterisk/FreePBX versus Twilio for outbound and inbound call operations: per-minute economics, engineering cost, break-even volume, and when each option is the responsible choice.",
    content: `## Why this comparison keeps coming up

Every team building a call center backend asks the same question: rent the telephony stack from Twilio, or run Asterisk on your own servers? The honest answer depends almost entirely on **call volume** and **how much control the workflows need**.

## The cost structure is different, not just cheaper

Twilio is priced per minute with near-zero setup effort. Asterisk is priced as server plus SIP trunk minutes with real engineering effort up front.

| Cost component | Twilio | Self-hosted Asterisk / FreePBX |
|---|---|---|
| Per-minute rate | Platform rate, all-inclusive | Wholesale SIP trunk rate, typically a fraction of platform pricing |
| Infrastructure | None | VPS or bare metal, plus monitoring and backups |
| Setup engineering | Days | Two to four weeks for a production-grade build |
| Ongoing ops | Managed | Yours: patching, failover, capacity |
| Custom dialplan logic | Constrained by the API surface | Unlimited, down to the channel |
| Recording storage | Billed per unit | Your own storage economics |

## Break-even, in plain terms

The break-even point is where the monthly per-minute saving exceeds the amortized build and operating cost. In the projects I have delivered, that crossover typically lands in the range of **20,000 to 40,000 outbound minutes per month**. Below that, Twilio is usually the rational choice. Well above it, self-hosting pays for itself within the first year and keeps paying.

Two things move that line:

- **Concurrency**: high simultaneous channel counts favour self-hosting.
- **Custom routing**: if the dialplan has to make decisions from your own database on every call leg, Asterisk removes a whole layer of API round trips.

## What self-hosting actually requires

This is the part people underestimate. A production Asterisk deployment needs:

- A hardened FreePBX or bare Asterisk install with fail2ban and restricted SIP exposure
- Redundant SIP trunks from at least two carriers, with automatic failover
- AMI or ARI integration into your application layer
- Call recording storage with retention rules and access control
- Monitoring on channel counts, ASR, ACD, and trunk health

\`\`\`ini
; simplified predictive dialer entry point
exten => _X.,1,NoOp(Outbound campaign leg)
 same => n,Set(CDR(campaign)=\${CAMPAIGN_ID})
 same => n,AGI(agi://127.0.0.1/route_lead.agi)
 same => n,Dial(SIP/trunk_primary/\${EXTEN},30,g)
 same => n,Dial(SIP/trunk_backup/\${EXTEN},30,g)
 same => n,Hangup()
\`\`\`

## When Twilio is the right call

- Volume is under a few thousand minutes a month
- You need global numbers in many countries next week
- The team has no one who wants to own telephony infrastructure
- Compliance requires a managed provider's attestation

## When Asterisk is the right call

- Sustained high outbound volume with predictive or progressive dialing
- Deep CRM-driven routing, whisper, barge, and custom IVR trees
- Per-minute cost is a visible line item on the P&L
- Call recordings must stay on infrastructure you control

## The hybrid most teams end up with

Self-hosted Asterisk for the high-volume core, plus a managed provider for international DIDs and overflow. It captures most of the saving without betting the whole operation on one carrier.

**Working out which side of the line you're on?** Email devusamaworks@gmail.com or WhatsApp +92 303 8004684 and we can size it together on a free 30-minute call.`,
    featured_image: "/blog/blog-asterisk-vs-twilio.webp",
    published_at: "2026-07-21T09:00:00Z",
    author: "Usama Munawar",
    tags: ["Asterisk", "Twilio", "VoIP", "FreePBX", "Comparison"]
  },
  {
    id: "22",
    title: "n8n vs Custom Code: Where Automation Platforms Stop Paying Off",
    seo_title: "n8n vs Custom Code: When Automation Stops Paying Off",
    slug: "n8n-vs-custom-code-automation",
    excerpt: "When a visual automation platform like n8n is the correct engineering decision, when it becomes technical debt, and the migration path from workflow to service without a rewrite.",
    content: `## The trap on both sides

Teams either automate everything in a visual tool until it becomes an unmaintainable spaghetti canvas, or they refuse to use one and hand-code integrations that nobody wants to own. Both are expensive. The useful question is where the line sits.

## Comparison

| Factor | n8n workflow | Custom code (Laravel job / service) |
|---|---|---|
| Time to first version | Hours | Days |
| Non-developer editability | High | None |
| Version control and review | Exportable JSON, awkward to diff | Native git workflow |
| Testing | Manual, mostly | Unit and integration tests |
| Error handling | Per-node retries, easy to leave incomplete | Explicit, typed, observable |
| Throughput | Fine for thousands per day | Scales with your queue workers |
| Complex branching | Gets visually unmanageable fast | Ordinary code |

## Use n8n when

- The workflow crosses three or more third-party SaaS tools
- Business users need to see, and sometimes tweak, what happens
- Volume is modest and latency tolerance is measured in minutes
- The process is still changing weekly

## Move to code when any of these are true

1. The canvas has more than roughly 25 nodes or nested branching that no one can read at a glance.
2. The workflow touches money, invoices, payouts, or anything requiring an audit trail.
3. It runs more than a few times per second, or a backlog would cause customer-visible failures.
4. Correctness depends on transactions across your own database.
5. You need real tests before every change.

## The migration path that does not hurt

Do not rewrite the whole canvas. Extract the risky core into an endpoint and let n8n keep the boring edges:

\`\`\`php
// Laravel takes over the transactional core
Route::post('/automation/invoice-sync', function (Request $request) {
    $data = $request->validate([
        'tenant_id' => ['required', 'uuid'],
        'invoice_id' => ['required', 'string'],
    ]);

    SyncInvoice::dispatch($data['tenant_id'], $data['invoice_id'])
        ->onQueue('billing');

    return response()->json(['queued' => true]);
});
\`\`\`

n8n still receives the webhook, still notifies Slack, still writes to the spreadsheet the operations team loves. Your database work is now transactional, tested, retryable, and visible in logs.

## A rule of thumb that has held up

**If the workflow failing silently for a day would cost real money, it belongs in code.** Everything else is a candidate for the canvas, and that is genuinely most internal automation.

## What this saves in practice

On one operations platform, moving four billing-critical workflows out of a 60-node canvas into queued Laravel jobs eliminated a recurring class of duplicate-charge incidents and cut the automation run time from minutes to seconds, while the remaining 40 nodes of notification and reporting logic stayed exactly where the ops team could edit them.

**Not sure which of your workflows crossed the line?** Email devusamaworks@gmail.com or WhatsApp +92 303 8004684 for a free 30-minute automation audit.`,
    featured_image: "/blog/blog-n8n-vs-custom.webp",
    published_at: "2026-07-14T09:00:00Z",
    author: "Usama Munawar",
    tags: ["n8n", "Automation", "Laravel", "Architecture", "Comparison"]
  },

  {
    id: "10",
    title: "Vibe Coding in 2025: How I Build Apps 10x Faster with Claude, Lovable & Cursor",
    seo_title: "Vibe Coding in 2025 with Claude, Lovable and Cursor",
    slug: "vibe-coding-2025-claude-lovable-cursor",
    excerpt: "Vibe coding is revolutionizing software development. Learn how I use Claude AI, Lovable, Cursor, and Replit to ship production-ready Laravel and React apps in hours, not weeks.",
    content: `## What is Vibe Coding?

**Vibe coding** is the future of software development, using AI-powered tools to write, debug, and deploy code at unprecedented speed. Instead of typing every line manually, you describe what you want and let AI handle the implementation.

## My Vibe Coding Stack

| Tool | What I Use It For |
|------|-------------------|
| **Claude (Anthropic)** | Complex reasoning, architecture decisions, code review |
| **Lovable** | Full-stack React app generation with instant preview |
| **Cursor AI** | AI-first code editor for Laravel, PHP, and TypeScript |
| **Replit** | Quick prototypes and collaborative coding |

## How Vibe Coding Works in Practice

### Step 1: Describe Your Vision
Instead of writing boilerplate, I describe the feature to Claude or Lovable:

\`\`\`
"Build a Laravel REST API for appointment booking with MySQL, 
including WhatsApp notification integration and Stripe payments"
\`\`\`

### Step 2: AI Generates the Foundation
Claude generates the Laravel migrations, models, controllers, and routes. Lovable builds the React frontend simultaneously.

### Step 3: Refine with Cursor
I use Cursor AI to refine business logic, add edge cases, and optimize database queries in MySQL.

## Real Results

- **Healthcare SaaS**, Built in 2 weeks instead of 3 months
- **E-commerce Platform**, Stripe + Google Auth in 3 days
- **AI Chatbot System**, Production-ready in 1 week

## Is Vibe Coding Replacing Traditional Development?

No, it's **augmenting** it. You still need deep knowledge of Laravel, PHP, MySQL, React, and system architecture. Vibe coding just removes the tedious parts so you can focus on solving real problems.

**The developers who embrace vibe coding will outpace those who don't.**`,
    featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    published_at: "2025-08-01T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Vibe Coding", "Claude", "Lovable", "Cursor AI", "AI Tools"]
  },
  {
    id: "11",
    title: "Laravel + MySQL Best Practices: Building Scalable SaaS Applications in 2025",
    seo_title: "Laravel + MySQL Best Practices for Scalable SaaS",
    slug: "laravel-mysql-best-practices-scalable-saas-2025",
    excerpt: "A comprehensive guide to building production-ready SaaS applications with Laravel and MySQL, covering multi-tenancy, query optimization, caching, and deployment strategies.",
    content: `## Why Laravel + MySQL is Still King for SaaS

In 2025, **Laravel** remains the most productive PHP framework for building SaaS applications. Combined with **MySQL**, it offers:

- Elegant ORM (Eloquent) for complex data relationships
- Built-in queue system for background jobs
- Robust authentication and authorization
- Excellent testing tools

## Architecture Patterns I Use

### Multi-Tenant Architecture

\`\`\`php
// Laravel Multi-Tenant Middleware
class TenantMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $tenant = Tenant::where('domain', $request->getHost())->first();
        
        if (!$tenant) {
            abort(404, 'Tenant not found');
        }
        
        app()->instance('tenant', $tenant);
        config(['database.connections.mysql.database' => $tenant->database]);
        
        return $next($request);
    }
}
\`\`\`

### MySQL Query Optimization

\`\`\`sql
-- Composite indexes for common queries
CREATE INDEX idx_appointments_tenant_date 
ON appointments(tenant_id, appointment_date, status);

-- Use EXPLAIN to analyze slow queries
EXPLAIN SELECT * FROM orders 
WHERE tenant_id = 1 AND status = 'pending' 
ORDER BY created_at DESC LIMIT 20;
\`\`\`

## Performance Tips

1. **Use Redis for caching**, Cache frequently accessed queries
2. **Implement database read replicas**, Scale reads horizontally
3. **Use Laravel Horizon**, Monitor and manage queues
4. **Optimize Eloquent**, Avoid N+1 queries with eager loading

## Real-World Projects

I've built multiple SaaS platforms with this stack:
- **iSmart Clinic**, Multi-tenant healthcare platform
- **Solutions Zilla**, Call center management system
- **Custom CRMs**, For businesses across Pakistan and globally

**Laravel + MySQL isn't going anywhere.** It's the backbone of modern PHP development.`,
    featured_image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    published_at: "2025-07-25T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Laravel", "PHP", "MySQL", "SaaS", "Web Development"]
  },
  {
    id: "12",
    title: "Claude vs ChatGPT for Developers: Which AI Tool Should You Use in 2025?",
    seo_title: "Claude vs ChatGPT for Developers: Which to Use in 2025?",
    slug: "claude-vs-chatgpt-developers-ai-tools-2025",
    excerpt: "An honest comparison of Claude (Anthropic) and ChatGPT (OpenAI) for software development, code generation, debugging, architecture planning, and vibe coding workflows.",
    content: `## The AI Tools Every Developer Needs

As an AI engineer who uses both **Claude** and **ChatGPT** daily, here's my honest breakdown for developers.

## Claude (Anthropic)

### Strengths
- **Superior code understanding**, Handles large codebases better
- **Better reasoning**, Excels at architecture decisions
- **Longer context window**, Can process entire projects
- **More nuanced responses**, Less generic, more tailored

### Best For
- Complex Laravel/PHP refactoring
- System design and architecture
- Code review and bug analysis
- Technical writing and documentation

## ChatGPT (OpenAI)

### Strengths
- **Broader knowledge**, More training data
- **Better at creative tasks**, UI/UX suggestions
- **Plugin ecosystem**, Extensive integrations
- **Image generation**, DALL-E integration

### Best For
- Quick code snippets
- Exploring new technologies
- Generating boilerplate code
- Learning new frameworks

## My Daily Workflow

\`\`\`
Morning: Claude for architecture planning & complex coding
Afternoon: Cursor AI (Claude-powered) for implementation
Evening: ChatGPT for research & exploring ideas
\`\`\`

## The Verdict

**Use both.** Claude is my go-to for serious development work, Laravel APIs, MySQL optimization, React architecture. ChatGPT is great for brainstorming and quick lookups.

The real power is in **combining them with vibe coding tools** like Lovable and Cursor for maximum productivity.`,
    featured_image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=400&fit=crop",
    published_at: "2025-07-20T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Claude", "ChatGPT", "AI Tools", "Vibe Coding", "Developer Tools"]
  },
  {
    id: "1",
    title: "Building Multi-Agent Systems with OpenAI & LangChain",
    slug: "building-multi-agent-systems-openai-langchain",
    excerpt: "A deep dive into architecting main agent and sub-agent patterns for complex AI workflows, from task decomposition to autonomous execution.",
    content: `## Why Multi-Agent Systems?

Single LLM calls hit their limits fast. When you need an AI system that can **research, plan, execute, and verify**, you need agents that collaborate.

I recently built a production system where a **Main Orchestrator Agent** delegates tasks to specialized sub-agents:

- **Research Agent**, scrapes and summarizes web data
- **Code Agent**, writes and tests code autonomously  
- **Review Agent**, validates outputs against requirements

\`\`\`python
from langchain.agents import AgentExecutor
from langchain.tools import Tool

class OrchestratorAgent:
    def __init__(self):
        self.sub_agents = {
            "research": ResearchAgent(),
            "code": CodeAgent(),
            "review": ReviewAgent()
        }
    
    async def execute(self, task):
        plan = await self.decompose(task)
        results = []
        for step in plan:
            agent = self.sub_agents[step.agent_type]
            result = await agent.run(step.instruction)
            results.append(result)
        return self.synthesize(results)
\`\`\`

## The MCP Protocol

Model Context Protocol (MCP) is changing how agents interact with tools. Instead of hardcoding tool integrations, MCP provides a **standardized interface** for agents to discover and use tools dynamically.

This is huge for building extensible agent systems that can adapt to new capabilities without code changes.

## Real-World Use Case

I deployed this architecture for a client's **automated content pipeline**, the system generates, reviews, optimizes, and publishes content with minimal human intervention. Result: **10x faster content production** with higher quality scores.

The future isn't single AI calls, it's **orchestrated intelligence**.`,
    featured_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    published_at: "2025-07-15T10:00:00Z",
    author: "Usama Munawar",
    tags: ["AI", "LangChain", "Multi-Agent", "MCP"]
  },
  {
    id: "2",
    title: "Automating Everything with n8n + AI: A Practical Guide",
    slug: "automating-everything-n8n-ai",
    excerpt: "How I use n8n workflows combined with OpenAI, custom APIs, and webhooks to automate business processes end-to-end.",
    content: `## Why n8n?

n8n is the **open-source automation powerhouse** that lets you build complex workflows visually. Combined with AI, it becomes an **autonomous business engine**.

## My Go-To Automation Stack

- **n8n** for workflow orchestration
- **OpenAI API** for intelligent processing
- **Supabase** for data persistence
- **Custom webhooks** for real-time triggers

## Example: Automated Lead Qualification

\`\`\`javascript
// n8n Function Node
const lead = $input.first().json;

const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${$env.OPENAI_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'Score this lead 1-10 based on fit...'
    }, {
      role: 'user', 
      content: JSON.stringify(lead)
    }]
  })
});

return [{ json: { ...lead, ai_score: result.score } }];
\`\`\`

## Results

For one client, this automation replaced **20 hours/week** of manual lead sorting with an AI-powered pipeline that runs 24/7. The ROI was visible within the first week.

**Automation isn't the future, it's the present.** If you're still doing repetitive tasks manually, you're leaving money on the table.`,
    featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    published_at: "2025-07-01T10:00:00Z",
    author: "Usama Munawar",
    tags: ["n8n", "Automation", "AI", "Workflows"]
  },
  {
    id: "3",
    title: "From Developer to AI Engineer: Skills That Actually Matter in 2025",
    seo_title: "Developer to AI Engineer: Skills That Matter in 2025",
    slug: "developer-to-ai-engineer-skills-2025",
    excerpt: "The transition from traditional web development to AI engineering, what skills to learn, what to skip, and how to stay relevant.",
    content: `## The Shift is Real

Two years ago, I was a full-stack web developer. Today, I architect AI systems, build autonomous agents, and deploy ML pipelines. Here's what actually mattered in that transition.

## Skills That Move the Needle

### 1. Prompt Engineering (Not What You Think)
It's not about writing clever prompts. It's about understanding **token economics, context windows, and chain-of-thought reasoning** at a systems level.

### 2. Vector Databases & RAG
Every serious AI application needs retrieval-augmented generation. Learn **Pinecone, Weaviate, or pgvector**, they're the backbone of intelligent search.

### 3. Agent Architecture
Understanding how to decompose complex tasks into agent workflows is the **#1 skill** separating AI engineers from prompt wranglers.

### 4. MLOps Basics
You don't need a PhD, but you need to understand:
- Model evaluation and benchmarking
- Fine-tuning strategies
- Deployment patterns (serverless vs. dedicated)

## Tools I Use Daily

| Tool | Purpose |
|------|---------|
| **Lovable** | Rapid AI-powered app prototyping |
| **Replit** | Quick experiments and deployments |
| **Cursor** | AI-first code editor |
| **n8n** | Workflow automation |
| **LangChain** | Agent orchestration |

## The Honest Truth

You don't need to know everything. Pick a **vertical** (I chose automation + agents), go deep, and build real things. The market rewards specialists who ship, not generalists who theorize.

**Stop learning. Start building.**`,
    featured_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    published_at: "2025-06-20T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Career", "AI Engineering", "Skills", "2025"]
  },
  {
    id: "4",
    title: "Building Production RAG Systems: Lessons from the Trenches",
    slug: "production-rag-systems-lessons",
    excerpt: "What I learned building RAG (Retrieval-Augmented Generation) systems for real clients, the gotchas, optimizations, and architecture decisions.",
    content: `## RAG is Simple in Theory, Complex in Practice

Everyone can build a demo RAG app in 30 minutes. Building one that works reliably at scale? That's a different game entirely.

## Architecture That Works

\`\`\`
User Query → Query Enhancement → Vector Search → Re-ranking → LLM Generation → Response Validation
\`\`\`

Each step has failure modes. Here's what I learned:

### 1. Chunking Strategy Matters More Than You Think

Don't just split by character count. Use **semantic chunking** that respects document structure:

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\\n## ", "\\n### ", "\\n\\n", "\\n", " "]
)
\`\`\`

### 2. Hybrid Search > Pure Vector Search

Combine vector similarity with keyword matching (BM25). Your retrieval accuracy will jump 20-30%.

### 3. Always Validate Outputs

LLMs hallucinate. Always cross-reference generated answers against retrieved context. I use a lightweight validation agent for this.

## Results

For a legal tech client, this architecture achieved **94% accuracy** on domain-specific questions, up from 67% with naive RAG. The difference was in the details.`,
    featured_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
    published_at: "2025-06-10T10:00:00Z",
    author: "Usama Munawar",
    tags: ["RAG", "AI", "Vector DB", "Production"]
  },
  {
    id: "13",
    title: "PHP in 2025: Why It's Still the Best Choice for Web Development",
    seo_title: "PHP in 2025: Still the Best Choice for Web Development",
    slug: "php-2025-best-choice-web-development",
    excerpt: "PHP powers 77% of the web. With PHP 8.3, Laravel 11, and modern tooling, it's faster, safer, and more developer-friendly than ever. Here's why PHP is thriving.",
    content: `## PHP Is Not Dead, It's Thriving

Every year someone declares PHP dead. Every year, PHP powers more of the web than before. **77% of all websites** use PHP, and with PHP 8.3, the language has never been better.

## What's New in PHP 8.3

- **Typed class constants**, Better type safety
- **json_validate()**, Native JSON validation
- **Randomizer additions**, Improved randomness APIs
- **Performance improvements**, 5-15% faster than PHP 8.2

## Laravel 11: The PHP Framework That Changed Everything

\`\`\`php
// Laravel 11 streamlined application structure
// Minimal bootstrap, maximum productivity

Route::get('/api/projects', function () {
    return Project::with(['client', 'technologies'])
        ->where('status', 'active')
        ->latest()
        ->paginate(15);
});
\`\`\`

## PHP + MySQL: The Unbeatable Combo

For most web applications, **PHP + MySQL** remains the most cost-effective, scalable, and well-supported stack:

- Hosting is dirt cheap (shared hosting works for small apps)
- Massive ecosystem of packages and tools
- Battle-tested at scale (Facebook, Wikipedia, WordPress)
- Laravel makes it a joy to work with

## When to Choose PHP

✅ E-commerce platforms
✅ SaaS applications
✅ Content management systems
✅ REST APIs and microservices
✅ Business automation tools

**PHP isn't just surviving, it's the backbone of the modern web.**`,
    featured_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    published_at: "2025-07-10T10:00:00Z",
    author: "Usama Munawar",
    tags: ["PHP", "Laravel", "MySQL", "Web Development", "2025"]
  },
  {
    id: "14",
    title: "Asterisk + Laravel: Building a Real-Time VoIP Call Center from Scratch",
    seo_title: "Asterisk + Laravel: Building a Real-Time VoIP Call Center",
    slug: "asterisk-laravel-voip-call-center",
    excerpt: "How I integrated Asterisk PBX with Laravel to build Solutions Zilla, a real-time call center portal with live agent monitoring, call routing, and CDR analytics.",
    content: `## The Challenge

Most call center software is expensive, locked-in, and hard to customize. So I built one from scratch using **Asterisk**, **Laravel**, and **WebSockets**.

## The Architecture

\`\`\`
SIP Trunk → Asterisk PBX → AMI/ARI → Laravel API → WebSocket → React Dashboard
\`\`\`

### Asterisk Manager Interface (AMI)

Laravel listens to AMI events in real time:

\`\`\`php
$ami = new AMIClient('127.0.0.1', 5038);
$ami->on('Newchannel', function ($event) {
    broadcast(new CallStarted($event['CallerIDNum'], $event['Channel']));
});
\`\`\`

### Live Agent Dashboard

Every agent state change (ringing, talking, idle, wrap-up) is pushed to the React dashboard via Laravel Reverb WebSockets, so supervisors see what's happening *as it happens*.

## What I Learned

- **AMI is noisy**, filter aggressively or you'll drown in events
- **Always queue CDR writes**, never block the call flow
- **Use ARI for new builds**, AMI is legacy but still reliable
- **Audio quality wins clients**, codec choice matters more than UI polish

## Real Impact

The Solutions Zilla portal handles thousands of calls per day with sub-second dashboard updates and full CDR analytics, all on a single mid-tier server.

**Telephony is one of the most underrated areas where Laravel shines.**`,
    featured_image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop",
    published_at: "2025-08-10T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Asterisk", "Laravel", "VoIP", "Call Center", "WebSockets"]
  },
  {
    id: "15",
    title: "Supabase Edge Functions vs Laravel APIs: When to Use Which",
    slug: "supabase-edge-functions-vs-laravel-apis",
    excerpt: "A practical comparison of Supabase Edge Functions and Laravel APIs based on real production projects, covering cost, latency, DX, and scaling.",
    content: `## Two Tools, Different Jobs

I ship products with both **Supabase Edge Functions** (Deno) and **Laravel APIs** (PHP). They are not competitors, they solve different problems.

## When Supabase Edge Functions Win

- Lightweight webhooks and integrations
- Server-side AI calls (OpenAI, Anthropic, Lovable AI Gateway)
- Scheduled scrapers and data sync jobs
- Anything that needs zero infra management

\`\`\`ts
Deno.serve(async (req) => {
  const { prompt } = await req.json();
  const ai = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: \`Bearer \${Deno.env.get("LOVABLE_API_KEY")}\` },
    body: JSON.stringify({ model: "google/gemini-2.5-flash", messages: [{ role: "user", content: prompt }] })
  });
  return new Response(await ai.text());
});
\`\`\`

## When Laravel Wins

- Complex domain logic with relationships
- Multi-tenant SaaS with heavy business rules
- Background queues, scheduled jobs, Horizon
- Anything with deep MySQL transactions

## My Default Stack

For new projects I usually combine both: **Laravel for the core business app**, **Supabase Edge Functions for the glue**, scrapers, AI calls, third-party webhooks. The result is fast to ship and easy to scale.`,
    featured_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    published_at: "2025-09-05T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Supabase", "Laravel", "Edge Functions", "Architecture"]
  },
  {
    id: "16",
    title: "Lovable AI Gateway: One API for Gemini, GPT, and Claude in Production",
    seo_title: "Lovable AI Gateway: One API for Gemini, GPT and Claude",
    slug: "lovable-ai-gateway-production-guide",
    excerpt: "How I use the Lovable AI Gateway to ship AI features without juggling API keys, rate limits, and SDKs from OpenAI, Anthropic, and Google.",
    content: `## The Multi-Model Problem

Every serious AI feature eventually needs more than one model: a cheap fast one for classification, a smart one for reasoning, and a vision-capable one for images. Managing three SDKs and three billing dashboards is painful.

## Why I Use the Lovable AI Gateway

- **Single API key**, single billing, OpenAI-compatible schema
- Access to Gemini 2.5, GPT-5, and other top models
- Built-in rate limiting and usage analytics
- Works seamlessly inside Supabase Edge Functions

## A Real Example, AI Chatbot Streaming

\`\`\`ts
const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${Deno.env.get("LOVABLE_API_KEY")}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/gemini-2.5-flash",
    stream: true,
    messages,
  }),
});
\`\`\`

Stream the response back to the React client and you have a production chatbot in under 50 lines.

## Tips From Shipping

1. **Default to Gemini Flash**, it is fast and cheap for 90% of cases
2. **Escalate to a stronger model** only when confidence is low
3. **Always handle 429 and 402** gracefully in the UI
4. **Cache aggressively** for repeated prompts

The AI Gateway is the easiest way I have found to ship multi-model AI features without operational overhead.`,
    featured_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
    published_at: "2025-10-01T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Lovable", "AI Gateway", "Gemini", "OpenAI", "Production"]
  },
  {
    id: "17",
    title: "Stripe + Laravel: Building Subscription Billing That Does Not Break",
    seo_title: "Stripe + Laravel: Subscription Billing That Does Not Break",
    slug: "stripe-laravel-subscription-billing",
    excerpt: "A field guide to building robust Stripe subscription billing in Laravel, covering Cashier, webhooks, proration, dunning, and the edge cases nobody warns you about.",
    content: `## Billing Is Where SaaS Apps Die

Most SaaS apps do not fail because of features. They fail because billing is buggy, confusing, or insecure. Here is how I build Stripe subscriptions in Laravel that actually hold up in production.

## Start With Cashier, Not Raw Stripe

Laravel Cashier handles 80% of the boilerplate: customers, subscriptions, invoices, trials, and webhook routing.

\`\`\`php
$user->newSubscription('pro', 'price_xxx')
    ->trialDays(14)
    ->create($paymentMethod);
\`\`\`

## Always Trust Webhooks, Never the Frontend

The browser can lie. Stripe webhooks cannot. Every state change (subscription created, payment failed, plan changed) must update your database from a verified webhook, not from a redirect.

\`\`\`php
Route::post('/stripe/webhook', [WebhookController::class, 'handle']);

// In WebhookController
public function handleInvoicePaymentFailed($payload) {
    $user = User::where('stripe_id', $payload['data']['object']['customer'])->first();
    $user->notify(new PaymentFailedNotification());
}
\`\`\`

## Edge Cases Nobody Tells You About

- **Proration on plan changes**, decide upfront if upgrades charge immediately
- **Failed renewals**, configure Stripe smart retries + your own dunning emails
- **Tax**, use Stripe Tax unless you enjoy pain
- **Refunds**, always log who issued them and why

## The Result

For my SaaS clients, this pattern means **zero billing disputes**, predictable MRR, and clean accounting. Billing should be the most boring part of your app, not the scariest.`,
    featured_image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=400&fit=crop",
    published_at: "2025-10-20T10:00:00Z",
    author: "Usama Munawar",
    tags: ["Stripe", "Laravel", "Billing", "SaaS", "Cashier"]
  }
];
