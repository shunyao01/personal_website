import Link from "next/link";
import { formatMonth } from "@/lib/content";
import type { WritingEntry } from "@/lib/types";

export function WritingLog({ entries }: { entries: WritingEntry[] }) {
  return (
    <div className="roll-panel writing-roll" tabIndex={0} aria-label="Writing list">
      {entries.map((entry) => (
        <Link className="writing-row" href={`/writing/${entry.slug}`} key={entry.slug}>
          <span className="wr-title">{entry.title}</span>
          <span className="wr-meta">
            {formatMonth(entry.date)} <span className="wr-arrow">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
