

import { useState } from "react";
import { StarRating } from "./star-rating";
import { Prompt } from "@/src/constants/landing-page";


export function PromptCard({ prompt, delay = 0 }: { prompt: Prompt; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1.5px solid rgba(10,10,15,0.08)",
        borderRadius: 20,
        padding: "1.5rem",
        cursor: "pointer",
        transition: "all 0.28s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px -10px ${prompt.color}33` : "0 1px 3px rgba(0,0,0,0.04)",
        opacity: 0,
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${prompt.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
          {prompt.emoji}
        </div>
        <span style={{ background: prompt.tag === "Free" ? "#10B98115" : `${prompt.color}15`, color: prompt.tag === "Free" ? "#10B981" : prompt.color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {prompt.tag}
        </span>
      </div>
      <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{prompt.category}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: "#0a0a0f", lineHeight: 1.3, marginBottom: "0.75rem", fontFamily: "'Syne', sans-serif" }}>{prompt.title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: prompt.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff" }}>{prompt.authorInitials}</div>
        <span style={{ fontSize: 13, color: "#6b7280" }}>{prompt.author}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <StarRating count={prompt.rating} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{prompt.uses} uses</span>
        </div>
        <span style={{ fontWeight: 800, color: prompt.price === "Free" ? "#10B981" : "#0a0a0f", fontSize: 15, fontFamily: "'Syne', sans-serif" }}>{prompt.price}</span>
      </div>
    </div>
  );
}