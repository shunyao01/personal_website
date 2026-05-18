import Link from "next/link";
import { LearningLog } from "@/components/LearningLog";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { getLearning, getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "Learning | Shun Yao Tee",
  description: "Current research threads and learning log."
};

export default function LearningPage() {
  const site = getSiteConfig();
  const learning = getLearning();

  return (
    <div className="page-shell">
      <SiteHeader site={site} />
      <main id="top" tabIndex={-1} className="page-section section overview-page reveal has-stagger">
        <div className="section-heading-row reveal-item">
          <div>
            <p className="eyebrow">// learning log</p>
            <h1 className="sec-head">Learning</h1>
            <p className="work-count">
              {learning.length} entr{learning.length === 1 ? "y" : "ies"}
            </p>
          </div>
          <p className="sec-sub">
            Small notes from systems I am shipping, studying, or pressure-testing in production.
          </p>
        </div>
        <div className="reveal-item">
          <LearningLog entries={learning} />
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
