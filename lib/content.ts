import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  BuildingEntry,
  EducationEntry,
  ExperienceEntry,
  LearningEntry,
  LogStatus,
  Project,
  ProjectCategory,
  SiteConfig,
  WritingEntry
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function readMarkdownFiles<T>(
  dir: string,
  map: (slug: string, parsed: { data: Record<string, unknown>; content: string }) => T
): T[] {
  const fullDir = path.join(contentDir, dir);

  if (!fs.existsSync(fullDir)) {
    return [];
  }

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => {
      try {
        const slug = file.replace(/\.md$/, "");
        const raw = fs.readFileSync(path.join(fullDir, file), "utf8");
        const parsed = matter(raw);
        return [map(slug, { data: parsed.data as Record<string, unknown>, content: parsed.content })];
      } catch (err) {
        console.error(`[content] failed to parse ${dir}/${file}:`, err);
        return [];
      }
    });
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(path.join(contentDir, "site.json"), "utf8");
  return JSON.parse(raw) as SiteConfig;
}

export function getProjects(): Project[] {
  return readMarkdownFiles("projects", (slug, { data, content }) => ({
    slug,
    title: String(data.title ?? ""),
    teaser: String(data.teaser ?? ""),
    date: String(data.date ?? slug.slice(0, 7)),
    category: (data.category as ProjectCategory) ?? "applied-ml",
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    metrics: Array.isArray(data.metrics)
      ? (data.metrics as { value: string; label: string }[])
      : [],
    body: content.trim()
  })).sort(byDateDesc);
}

/** Homepage work section — newest projects marked `featured`, up to `limit`. */
export function getFeaturedProjects(limit = 3): Project[] {
  const featured = getProjects().filter((project) => project.featured);

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const rest = getProjects().filter((project) => !project.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getProjectCount(): number {
  return getProjects().length;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getLearning(): LearningEntry[] {
  return readMarkdownFiles("learning", (slug, { data, content }) => ({
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? slug.slice(0, 7)),
    status: (data.status as LogStatus) ?? "reading",
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    body: content.trim()
  })).sort(byDateDesc);
}

export function getLearningEntry(slug: string): LearningEntry | undefined {
  return getLearning().find((l) => l.slug === slug);
}

export function getBuilding(): BuildingEntry[] {
  return readMarkdownFiles("building", (slug, { data, content }) => ({
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? slug.slice(0, 7)),
    status: (data.status as LogStatus) ?? "shipped",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    body: content.trim()
  })).sort(byDateDesc);
}

export function getBuildingEntry(slug: string): BuildingEntry | undefined {
  return getBuilding().find((b) => b.slug === slug);
}

export function getWriting(): WritingEntry[] {
  return readMarkdownFiles("writing", (slug, { data, content }) => ({
    slug: String(data.slug ?? slug),
    title: String(data.title ?? ""),
    date: String(data.date ?? slug.slice(0, 7)),
    body: content.trim()
  })).sort(byDateDesc);
}

export function getWritingEntry(slug: string): WritingEntry | undefined {
  return getWriting().find((w) => w.slug === slug);
}

export function getExperience(): ExperienceEntry[] {
  return readMarkdownFiles("experience", (slug, { data }) => ({
    slug,
    title: String(data.title ?? ""),
    organization: String(data.organization ?? ""),
    location: String(data.location ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    highlights: Array.isArray(data.highlights) ? (data.highlights as string[]) : []
  })).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getEducation(): EducationEntry[] {
  return readMarkdownFiles("education", (slug, { data }) => ({
    slug,
    school: String(data.school ?? ""),
    credential: String(data.credential ?? ""),
    location: String(data.location ?? ""),
    date: String(data.date ?? ""),
    notes: Array.isArray(data.notes) ? (data.notes as string[]) : []
  })).sort((a, b) => a.slug.localeCompare(b.slug));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(date: string): string {
  const [year, month] = date.split("-");

  if (!year || !month) {
    return date;
  }

  const index = parseInt(month, 10) - 1;
  return `${MONTHS[index] ?? month} ${year}`;
}

const CATEGORY_LABELS: Record<string, string> = {
  agents: "AI Agents",
  "applied-ml": "Applied ML",
  product: "Product",
  research: "Research"
};

export function formatCategory(category: ProjectCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}
