const TAG_COLORS: Record<string, string> = {
  PyTorch: "tag cy",
  FAISS: "tag cy",
  PySpark: "tag cy",
  Evidently: "tag cy",
  Feast: "tag bl",
  dbt: "tag bl",
  Prometheus: "tag bl"
};

export function Tag({ name }: { name: string }) {
  const className = TAG_COLORS[name] ?? "tag";
  return <span className={className}>{name}</span>;
}
