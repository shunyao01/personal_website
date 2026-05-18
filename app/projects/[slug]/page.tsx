import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getProject, getProjects, getSiteConfig, formatCategory, formatMonth } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { Tag } from "@/components/Tag";

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const site = getSiteConfig();
  return {
    title: `${project.title} | ${site.firstName} ${site.lastName}`,
    description: project.teaser
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const site = getSiteConfig();

  return (
    <div className="page-shell">
      <SiteHeader site={site} />
      <main id="top" tabIndex={-1} className="page-section section detail-page reveal">
        <div className="detail-content">
          <Link href="/projects" className="detail-back">
            ← All projects
          </Link>
          <p className="eyebrow">{formatCategory(project.category)}</p>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-meta">{formatMonth(project.date)}</p>
          <div className="prose">
            <ReactMarkdown>{project.body}</ReactMarkdown>
          </div>
          {project.metrics.length > 0 && (
            <div className="bcard-metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="bm-val">{metric.value}</p>
                  <p className="bm-key">{metric.label}</p>
                </div>
              ))}
            </div>
          )}
          <div className="bcard-tags">
            {project.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </div>
        <SiteFooter site={site} />
      </main>
    </div>
  );
}
