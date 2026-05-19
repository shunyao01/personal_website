import type { ExperienceEntry } from "@/lib/types";
import { Tag } from "./Tag";

export function ExperienceList({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="experience-grid reveal-item">
      {entries.map((entry) => (
        <article className="bcard resume-card" key={entry.slug}>
          <div className="resume-card-head">
            <div>
              <p className="eyebrow">{entry.organization}</p>
              <h3 className="bcard-title">{entry.title}</h3>
            </div>
            <div className="resume-card-meta">
              <span>{entry.location}</span>
              <span>{entry.date}</span>
            </div>
          </div>
          <ul className="resume-points">
            {entry.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {entry.tags.length > 0 && (
            <div className="bcard-tags">
              {entry.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
