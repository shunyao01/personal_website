import Link from "next/link";
import { BuildingLog } from "@/components/BuildingLog";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { getBuilding, getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "Building | Shun Yao Tee",
  description: "What I am making — a log of shipped pieces, experiments, and infrastructure improvements."
};

export default function BuildingPage() {
  const site = getSiteConfig();
  const building = getBuilding();

  return (
    <div className="page-shell">
      <SiteHeader site={site} />
      <main id="top" tabIndex={-1} className="page-section section overview-page reveal has-stagger">
        <div className="section-heading-row reveal-item">
          <div>
            <p className="eyebrow">// building log</p>
            <h1 className="sec-head">Building</h1>
            <p className="work-count">
              {building.length} entr{building.length === 1 ? "y" : "ies"}
            </p>
          </div>
          <p className="sec-sub">
            A lightweight record of shipped pieces, experiments, and infrastructure improvements.
          </p>
        </div>
        <div className="reveal-item">
          <BuildingLog entries={building} />
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
