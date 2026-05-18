import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getLearning, getLearningEntry, getSiteConfig, formatMonth } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { Tag } from "@/components/Tag";

export async function generateStaticParams() {
  return getLearning().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getLearningEntry(slug);
  if (!entry) return {};
  const site = getSiteConfig();
  return {
    title: `${entry.title} | ${site.firstName} ${site.lastName}`,
    description: entry.body.slice(0, 160)
  };
}

export default async function LearningDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getLearningEntry(slug);
  if (!entry) notFound();
  const site = getSiteConfig();

  return (
    <div className="page-shell">
      <SiteHeader site={site} />
      <main id="top" tabIndex={-1} className="page-section section detail-page reveal">
        <div className="detail-content">
          <Link href="/learning" className="detail-back">
            ← All learning
          </Link>
          <div className="detail-header-row">
            <p className="eyebrow">{formatMonth(entry.date)}</p>
            <span className={`status-badge ${entry.status}`}>{entry.status}</span>
          </div>
          <h1 className="detail-title">{entry.title}</h1>
          {entry.tags.length > 0 && (
            <div className="bcard-tags">
              {entry.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
          <div className="prose">
            <ReactMarkdown>{entry.body}</ReactMarkdown>
          </div>
        </div>
        <SiteFooter site={site} />
      </main>
    </div>
  );
}
