import { z } from "zod";
import { error } from "./http.js";

/** Input schemas for the admin endpoints. Unknown keys are stripped. */

const slug = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase letters, numbers and single hyphens");

const status = z.enum(["draft", "published"]);

/** http(s) or a site-relative path; mirrors src/lib/url.ts safeHref. */
const isSafeUrl = (v: string) =>
  v === "" || v === "#" || /^https?:\/\/[^\s]+$/i.test(v) || /^\/(?![/\\])[^\s\\]*$/.test(v);
const url = z.string().trim().max(1000).refine(isSafeUrl, "must be an http(s) URL or a /path");

export const PostInput = z.object({
  id: z.string().trim().min(1).max(64).optional(),
  slug,
  title: z.string().trim().min(1).max(200),
  seo_title: z.string().trim().max(70).default(""),
  excerpt: z.string().trim().max(600).default(""),
  content: z.string().max(200_000).default(""),
  featured_image: url.nullable().default(null),
  author: z.string().trim().max(120).default("Usama Munawar"),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  status: status.default("draft"),
  published_at: z
    .string()
    .trim()
    .refine((v) => !Number.isNaN(Date.parse(v)), "not a date")
    .optional(),
});
export type PostInput = z.infer<typeof PostInput>;

const flowStage = z.object({ label: z.string().min(1).max(60), note: z.string().max(80).optional() });

const ProjectBody = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  fullDescription: z.string().max(50_000),
  image: url,
  gallery: z.array(url).max(30).optional(),
  technologies: z.array(z.string().max(60)).max(40),
  category: z.string().max(80),
  client: z.string().max(200).optional(),
  duration: z.string().max(80).optional(),
  teamSize: z.string().max(80).optional(),
  completionDate: z.string().max(80).optional(),
  liveUrl: url.optional(),
  githubUrl: url.optional(),
  features: z.array(z.string().max(200)).max(40),
  challenges: z.array(z.object({ title: z.string().max(200), description: z.string().max(2000) })).max(20),
  results: z.array(z.string().max(300)).max(20),
});

const CaseStudyBody = z.object({
  id: z.string().min(1).max(80),
  n: z.string().max(10).default(""),
  category: z.string().max(80),
  hue: z.string().max(80).default("var(--hue-backend)"),
  title: z.string().min(1).max(200),
  metric: z.object({ value: z.string().max(20), label: z.string().max(120) }).optional(),
  image: url,
  cover: z.enum(["screenshot", "diagram"]).optional(),
  client: z.string().max(200).optional(),
  year: z.string().max(10).optional(),
  role: z.string().max(500),
  problem: z.string().max(3000),
  approach: z.string().max(3000),
  result: z.string().max(3000),
  flow: z.array(flowStage).max(8),
  stack: z.array(z.string().max(60)).max(30),
  liveUrl: url.optional(),
  detailPath: z.string().max(200).optional(),
});

export const ProjectInput = z
  .object({
    id: z.number().int().positive().optional(),
    slug,
    status: status.default("draft"),
    featured: z.number().int().min(0).max(99).default(0),
    sortOrder: z.number().int().default(0),
    project: ProjectBody.nullable().default(null),
    caseStudy: CaseStudyBody.nullable().default(null),
  })
  .refine((v) => v.project || v.caseStudy, "A project needs a detail page, a card, or both");
export type ProjectInput = z.infer<typeof ProjectInput>;

/** Parses a JSON body against a schema, or throws a 400 Response. */
export async function parse<S extends z.ZodTypeAny>(request: Request, schema: S): Promise<z.output<S>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw error(400, "Body must be JSON");
  }
  const r = schema.safeParse(body);
  if (!r.success) {
    const first = r.error.issues[0];
    throw error(400, `${first.path.join(".") || "body"}: ${first.message}`);
  }
  return r.data;
}
