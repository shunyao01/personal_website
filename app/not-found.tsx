import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", gap: "20px",
      fontFamily: "system-ui, sans-serif", color: "#f4f7f8",
      background: "#050609"
    }}>
      <h1 style={{ fontSize: "48px", fontWeight: 800 }}>404</h1>
      <p>This page could not be found.</p>
      <Link href="/" style={{ color: "#56d8e6" }}>← Back home</Link>
    </div>
  );
}
