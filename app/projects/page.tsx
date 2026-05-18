import { ProjectsIndex } from "@/components/ProjectsIndex";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { getProjectCount, getProjects, getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "Projects | Shun Yao Tee",
  description: "All production ML and platform projects."
};

export default function ProjectsPage() {
  const site = getSiteConfig();
  const projects = getProjects();
  const count = getProjectCount();

  return (
    <div className="page-shell">
      <SiteHeader site={site} />
      <main id="top" tabIndex={-1} className="page-section section projects-page reveal has-stagger">
        <div className="section-heading-row reveal-item">
          <div>
            <p className="eyebrow">// all work</p>
            <h1 className="sec-head">Projects</h1>
            <p className="work-count">{count} project{count === 1 ? "" : "s"}</p>
          </div>
          <p className="sec-sub">
            Every project is a Markdown file in <code>content/projects</code>. Add a file, push, and this list
            updates automatically.
          </p>
        </div>
        <ProjectsIndex projects={projects} />
        <div className="reveal-item">
          <SiteFooter site={site} />
        </div>
      </main>
    </div>
  );
}
