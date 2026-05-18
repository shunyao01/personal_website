import Link from "next/link";
import { WritingLog } from "@/components/WritingLog";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { getSiteConfig, getWriting } from "@/lib/content";

export const metadata = {
  title: "Writing | Shun Yao Tee",
  description: "Short essays and field notes from production ML systems work."
};

export default function WritingPage() {
  const site = getSiteConfig();
  const writing = getWriting();

  return (
    <div className="page-shell">
      <SiteHeader site={site} />
      <main id="top" tabIndex={-1} className="page-section section overview-page reveal has-stagger">
        <div className="section-heading-row reveal-item">
          <div>
            <p className="eyebrow">// writing log</p>
            <h1 className="sec-head">Writing</h1>
            <p className="work-count">
              {writing.length} entr{writing.length === 1 ? "y" : "ies"}
            </p>
          </div>
          <p className="sec-sub">Short essays and field notes from production ML systems work.</p>
        </div>
        <div className="reveal-item">
          <WritingLog entries={writing} />
        </div>
        <div className="reveal-item">
          <p className="overview-back">
            <Link href="/">← Back home</Link>
          </p>
          <SiteFooter site={site} />
        </div>
      </main>
    </div>
  );
}
