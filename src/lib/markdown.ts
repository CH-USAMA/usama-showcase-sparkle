/**
 * Heading anchor ids for blog posts. Shared by the renderer
 * (components/Markdown.tsx) and the table of contents in BlogPost, so the
 * contents links always match the rendered headings.
 */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
