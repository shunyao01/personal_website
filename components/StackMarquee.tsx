const ROW_A = ["PyTorch", "Triton", "vLLM", "Ray", "Qdrant", "Feast", "Redis", "Kubernetes"];
const ROW_B = ["OpenTelemetry", "Prometheus", "Snowflake", "dbt", "Airflow", "LangGraph", "Spark", "Evidently"];

function abbrev(name: string) {
  const map: Record<string, string> = {
    PyTorch: "PT",
    Triton: "TR",
    vLLM: "VL",
    Ray: "RY",
    Qdrant: "QD",
    Feast: "FS",
    Redis: "RD",
    Kubernetes: "K8",
    OpenTelemetry: "OT",
    Prometheus: "PM",
    Snowflake: "SF",
    dbt: "DB",
    Airflow: "AF",
    LangGraph: "LG",
    Spark: "SP",
    Evidently: "EV"
  };
  return map[name] ?? name.slice(0, 2).toUpperCase();
}

function Pill({ name }: { name: string }) {
  return (
    <span className="tech-pill" tabIndex={0} data-tech={name} aria-label={name}>
      {abbrev(name)}
    </span>
  );
}

export function StackMarquee() {
  const trackA = [...ROW_A, ...ROW_A];
  const trackB = [...ROW_B, ...ROW_B];

  return (
    <div className="stack-marquee" aria-label="Technology stack marquee">
      <div className="marquee-row">
        <div className="marquee-track">
          {trackA.map((name, i) => (
            <Pill key={`a-${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
      <div className="marquee-row reverse">
        <div className="marquee-track">
          {trackB.map((name, i) => (
            <Pill key={`b-${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}
