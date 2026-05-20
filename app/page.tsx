import Link from "next/link";
import { BuildingLog } from "@/components/BuildingLog";
import { HERO_PARTICLES } from "@/lib/hero-particles";
import { LearningLog } from "@/components/LearningLog";
import { Projects } from "@/components/Projects";
import { ScrollIntent, SiteFooter, SiteHeader } from "@/components/SiteShell";
import { StackMarquee } from "@/components/StackMarquee";
import { WritingLog } from "@/components/WritingLog";
import {
  getBuilding,
  getFeaturedProjects,
  getLearning,
  getProjectCount,
  getSiteConfig,
  getWriting
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const featuredProjects = getFeaturedProjects(3);
  const projectCount = getProjectCount();
  const learning = getLearning();
  const building = getBuilding();
  const writing = getWriting();

  return (
    <div className="page-shell">
      <ScrollIntent />
      <SiteHeader site={site} />

      <main id="top" tabIndex={-1}>
        <section className="page-section hero reveal" id="about">
          <div className="hero-copy">
            <p className="hero-badge">
              <span className="badge-dot"></span>
              {site.badge}
            </p>
            <h1 className="hero-name">
              {site.firstName} <br />
              <span className="hero-name-accent">{site.lastName}</span>
            </h1>
            <p className="hero-sub">{site.tagline}</p>
            <div className="hero-actions">
              <a className="btn-primary" href="#work">
                View Projects
              </a>
              <a className="btn-ghost" href="#">
                Download CV
              </a>
            </div>
            <div className="hero-meta" aria-label="Professional snapshot">
              {site.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="qubit" id="qubit" aria-label="Decorative quantum animation">
              <div className="particles" id="particles" aria-hidden="true">
                {HERO_PARTICLES.map((particle, index) => (
                  <span
                    key={index}
                    className="particle"
                    style={{
                      left: particle.left,
                      top: particle.top,
                      animationDuration: `${particle.duration}s`,
                      animationDelay: `${particle.delay}s`
                    }}
                  />
                ))}
              </div>
              <div className="orbit a">
                <span className="dot"></span>
              </div>
              <div className="orbit b">
                <span className="dot"></span>
              </div>
              <div className="orbit c">
                <span className="dot"></span>
              </div>
              <div className="sphere"></div>
              <div className="core"></div>
              <div className="label-wrap">
                <p className="label">Qubit</p>
                <p className="label-sub">Coherence Node</p>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#work" aria-label="Scroll to featured work">
            Featured work <span>↓</span>
          </a>
        </section>

        <section className="page-section section reveal has-stagger" id="work">
          <div className="section-heading-row reveal-item">
            <div>
              <p className="eyebrow">// featured work</p>
              <h2 className="sec-head">Projects that ship</h2>
              <p className="work-count">
                {projectCount} project{projectCount === 1 ? "" : "s"} ·{" "}
                <Link href="/projects">View all →</Link>
              </p>
            </div>
            <p className="sec-sub">
              Production systems designed for reliability, maintainability, and measurable business outcomes.
            </p>
          </div>
          <Projects projects={featuredProjects} />
        </section>

        <section className="page-section split reveal has-stagger" id="stack">
          <div className="stack-showcase reveal-item">
            <div className="stack-copy">
              <p className="eyebrow">// technical surface</p>
              <h2 className="sec-head">Systems I work through</h2>
              <p className="sec-sub">
                The stack is intentionally production-first: fast inference, reliable orchestration, observable
                pipelines, and clean retrieval layers.
              </p>
            </div>
            <StackMarquee />
          </div>

          <div className="learning-log-col reveal-item">
            <div className="learning-log-head">
              <div>
                <p className="eyebrow">// learning log</p>
                <h3 className="log-title">Current research threads</h3>
                <p className="work-count">
                  {learning.length} entr{learning.length === 1 ? "y" : "ies"} ·{" "}
                  <Link href="/learning">View all →</Link>
                </p>
              </div>
              <p className="log-intro">
                Small notes from systems I am shipping, studying, or pressure-testing in production.
              </p>
            </div>
            <LearningLog entries={learning} />
          </div>
        </section>

        <section className="page-section final-page reveal has-stagger" aria-label="Building and writing logs">
          <div className="log-section reveal-item" aria-label="Building log">
            <div className="log-section-head">
              <div>
                <p className="eyebrow">// building log</p>
                <h2 className="sec-head">What I am making</h2>
                <p className="work-count">
                  {building.length} entr{building.length === 1 ? "y" : "ies"} ·{" "}
                  <Link href="/building">View all →</Link>
                </p>
              </div>
              <p className="sec-sub">
                A lightweight record of shipped pieces, experiments, and infrastructure improvements.
              </p>
            </div>
            <BuildingLog entries={building} />
          </div>

          <div className="writing-section reveal-item" id="writing" aria-label="Writing log">
            <div className="log-section-head">
              <div>
                <p className="eyebrow">// writing log</p>
                <h2 className="sec-head">Notes in public</h2>
                <p className="work-count">
                  {writing.length} entr{writing.length === 1 ? "y" : "ies"} ·{" "}
                  <Link href="/writing">View all →</Link>
                </p>
              </div>
              <p className="sec-sub">Short essays and field notes from production ML systems work.</p>
            </div>
            <WritingLog entries={writing} />
          </div>

          <div className="reveal-item">
            <SiteFooter site={site} />
          </div>
        </section>
      </main>
    </div>
  );
}
