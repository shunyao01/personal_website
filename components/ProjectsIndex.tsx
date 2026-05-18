import Link from "next/link";
import { formatCategory, formatMonth } from "@/lib/content";
import type { Project } from "@/lib/types";
import { Tag } from "./Tag";

export function ProjectsIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="projects-index reveal-item">
      {projects.map((project, index) => (
        <article className="bcard project-index-card" key={project.slug}>
          <div className="project-index-card-head">
            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="eyebrow">{formatCategory(project.category)}</p>
              <h2 className="bcard-title">{project.title}</h2>
              <p className="project-teaser">{project.teaser}</p>
            </div>
            <span className="wr-meta">{formatMonth(project.date)}</span>
          </div>
          <p className="bcard-desc">{project.body}</p>
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
        </article>
      ))}
      <p className="projects-index-back">
        <Link href="/">← Back home</Link>
      </p>
    </div>
  );
}
