import type { EducationEntry } from "@/lib/types";

export function EducationList({ entries }: { entries: EducationEntry[] }) {
  return (
    <div className="education-grid reveal-item">
      {entries.map((entry) => (
        <article className="bcard resume-card" key={entry.slug}>
          <div className="resume-card-head">
            <div>
              <p className="eyebrow">{entry.school}</p>
              <h3 className="bcard-title">{entry.credential}</h3>
            </div>
            <div className="resume-card-meta">
              <span>{entry.location}</span>
              <span>{entry.date}</span>
            </div>
          </div>
          <ul className="resume-points">
            {entry.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
