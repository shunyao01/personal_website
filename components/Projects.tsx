import Link from "next/link";
import type { Project } from "@/lib/types";
import { Tag } from "./Tag";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <div className="bento reveal-item">
      {projects.map((project, index) => (
        <details className="bcard project-card" key={project.slug} open={index === 0}>
          <summary>
            <span className="project-signal" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="project-heading">
              <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="bcard-title">{project.title}</span>
              <span className="project-teaser">{project.teaser}</span>
            </span>
            <span className="project-arrow">↓</span>
          </summary>
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
          <Link href={`/projects/${project.slug}`} className="bcard-read-more">
            Read more →
          </Link>
        </details>
      ))}
    </div>
  );
}
