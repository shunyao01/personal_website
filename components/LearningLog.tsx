import Link from "next/link";
import { formatMonth } from "@/lib/content";
import type { LearningEntry, LogStatus } from "@/lib/types";

function statusClass(status: LogStatus) {
  if (status === "shipped") return "b-shipped";
  if (status === "studying") return "b-studying";
  return "b-reading";
}

export function LearningLog({ entries }: { entries: LearningEntry[] }) {
  return (
    <div className="learning-log-grid" aria-label="Learning log list">
      {entries.map((entry) => (
        <Link
          href={`/learning/${entry.slug}`}
          className={`log-card${entry.featured ? " log-card--featured" : ""}`}
          key={entry.slug}
        >
          <div className="log-meta">
            <span className="log-date">{formatMonth(entry.date)}</span>
            <span className={statusClass(entry.status)}>{entry.status}</span>
          </div>
          <p className="log-text">{entry.body || entry.title}</p>
        </Link>
      ))}
    </div>
  );
}
