import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getSiteConfig, getWriting, getWritingEntry, formatMonth } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";

export async function generateStaticParams() {
  return getWriting().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWritingEntry(slug);
  if (!entry) return {};
  const site = getSiteConfig();
  return {
    title: `${entry.title} | ${site.firstName} ${site.lastName}`,
    description: entry.body.slice(0, 160)
  };
}

export default async function WritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWritingEntry(slug);
  if (!entry) notFound();
  const site = getSiteConfig();

  return (
    <div className="page-shell">
      <SiteHeader site={site} />
      <main id="top" tabIndex={-1} className="page-section section detail-page reveal">
        <div className="detail-content">
          <Link href="/writing" className="detail-back">
            ← All writing
          </Link>
          <h1 className="detail-title">{entry.title}</h1>
          <p className="detail-meta">{formatMonth(entry.date)}</p>
          <div className="prose">
            <ReactMarkdown>{entry.body}</ReactMarkdown>
          </div>
        </div>
        <SiteFooter site={site} />
      </main>
    </div>
  );
}
