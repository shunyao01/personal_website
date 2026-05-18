"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error("Page error:", error); }, [error]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", gap: "20px",
      fontFamily: "system-ui, sans-serif", color: "#f4f7f8",
      background: "#050609"
    }}>
      <h1 style={{ fontSize: "36px", fontWeight: 800 }}>Something went wrong</h1>
      <p style={{ color: "#aab4bd" }}>{error.message}</p>
      <button onClick={reset} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Try again
      </button>
    </div>
  );
}
