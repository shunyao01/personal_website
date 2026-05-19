import Link from "next/link";
import { EducationList } from "@/components/EducationList";
import { ExperienceList } from "@/components/ExperienceList";
import { HERO_PARTICLES } from "@/lib/hero-particles";
import { Projects } from "@/components/Projects";
import { ScrollIntent, SiteFooter, SiteHeader } from "@/components/SiteShell";
import { StackMarquee } from "@/components/StackMarquee";
import {
  getEducation,
  getExperience,
  getFeaturedProjects,
  getProjectCount,
  getSiteConfig
} from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const featuredProjects = getFeaturedProjects(3);
  const projectCount = getProjectCount();
  const experience = getExperience();
  const education = getEducation();

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
              <a className="btn-ghost" href={site.resume}>
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
              <h2 className="sec-head">Selected projects</h2>
              <p className="work-count">
                {projectCount} project{projectCount === 1 ? "" : "s"} ·{" "}
                <Link href="/projects">View all →</Link>
              </p>
            </div>
            <p className="sec-sub">
              Projects from internships, research, startup work, and independent builds across applied ML,
              multi-agent systems, and product execution.
            </p>
          </div>
          <Projects projects={featuredProjects} />
        </section>

        <section className="page-section split reveal has-stagger" id="stack">
          <div className="stack-showcase reveal-item">
            <div className="stack-copy">
              <p className="eyebrow">// technical surface</p>
              <h2 className="sec-head">Tools I build with</h2>
              <p className="sec-sub">
                My resume spans classical data work, deep learning research, and agentic application prototyping.
                The stack below reflects the tools I am most likely to use when shipping.
              </p>
            </div>
            <StackMarquee />
          </div>

          <div className="learning-log-col reveal-item">
            <div className="learning-log-head">
              <div>
                <p className="eyebrow">// about me</p>
                <h3 className="log-title">What I am optimizing for</h3>
              </div>
              <p className="log-intro">
                I am targeting MLE, DS, and SWE roles where I can turn research-grade ideas into practical
                systems, communicate clearly with product teams, and keep learning in public.
              </p>
            </div>
            <div className="about-panel">
              {site.summary.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section final-page reveal has-stagger" aria-label="Experience and education">
          <div className="log-section reveal-item" id="experience" aria-label="Experience">
            <div className="log-section-head">
              <div>
                <p className="eyebrow">// experience</p>
                <h2 className="sec-head">Where I have worked</h2>
              </div>
              <p className="sec-sub">
                Research, internship, and founder work that shaped how I approach applied machine learning and
                software delivery.
              </p>
            </div>
            <ExperienceList entries={experience} />
          </div>

          <div className="writing-section reveal-item" id="education" aria-label="Education">
            <div className="log-section-head">
              <div>
                <p className="eyebrow">// education</p>
                <h2 className="sec-head">Academic foundation</h2>
              </div>
              <p className="sec-sub">
                Formal training across machine learning, software design, algorithms, and data systems at
                Monash University.
              </p>
            </div>
            <EducationList entries={education} />
          </div>

          <div className="reveal-item">
            <SiteFooter site={site} />
          </div>
        </section>
      </main>
    </div>
  );
}
