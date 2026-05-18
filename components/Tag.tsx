const CYAN_TAGS = new Set(["PyTorch", "FAISS", "PySpark", "Evidently"]);
const BLUE_TAGS = new Set(["Feast", "dbt", "Prometheus"]);

export function Tag({ name }: { name: string }) {
  const className = CYAN_TAGS.has(name) ? "tag cy" : BLUE_TAGS.has(name) ? "tag bl" : "tag";

  return <span className={className}>{name}</span>;
}
