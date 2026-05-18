import { formatMonth } from "@/lib/content";
import type { BuildingEntry } from "@/lib/types";

export function BuildingLog({ entries }: { entries: BuildingEntry[] }) {
  return (
    <div className="roll-panel building-roll" tabIndex={0} aria-label="Building log list">
      {entries.map((entry) => (
        <a className="writing-row building-row" href="#" key={entry.slug}>
          <span className="wr-title">{entry.title}</span>
          <span className="wr-meta">
            {formatMonth(entry.date)} <span className="wr-arrow">→</span>
          </span>
        </a>
      ))}
    </div>
  );
}
