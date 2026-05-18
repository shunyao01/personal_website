import Link from "next/link";
import { formatMonth } from "@/lib/content";
import type { BuildingEntry } from "@/lib/types";

export function BuildingLog({ entries }: { entries: BuildingEntry[] }) {
  return (
    <div className="roll-panel building-roll" tabIndex={0} aria-label="Building log list">
      {entries.map((entry) => (
        <Link className="writing-row building-row" href={`/building/${entry.slug}`} key={entry.slug}>
          <span className="wr-title">{entry.title}</span>
          <span className="wr-meta">
            {formatMonth(entry.date)} <span className="wr-arrow">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
