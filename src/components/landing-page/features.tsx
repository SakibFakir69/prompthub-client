import { FEATURES } from '@/src/constants/landing-page'
import React from 'react'

function Features() {
  
  
  return (
    <div>
      <section style={{ padding: "7rem 5vw", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="reveal section-label">Features</div>
            <h2 className="reveal section-heading">Everything you need<br />to go further with AI</h2>
          </div>

          {/* Wide card */}
          <div className="reveal card-feature" style={{ gridColumn: "1/-1", marginBottom: "1.25rem", display: "flex", gap: "2.5rem", alignItems: "center", flexWrap: "wrap", background: "linear-gradient(135deg, #0a0a0f 0%, #1a1025 100%)", border: "none", padding: "3rem" }}>
            <div style={{ flex: "1 1 280px" }}>
              <div style={{ fontSize: 36, marginBottom: "1rem" }}>🎯</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>The Prompt Editor That Thinks With You</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: 15, marginBottom: "1.5rem", maxWidth: 380, fontWeight: 300 }}>Write, test, and iterate prompts inside PromptHub. See token counts, estimated quality score, and model-specific warnings — all live as you type.</p>
              <a href="#" className="btn-primary" style={{ background: "#FF6B35", fontSize: 14, padding: "12px 24px" }}>Try the Editor →</a>
            </div>
            <div style={{ flex: "1 1 340px", background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: "1rem" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.7)" }}>
                <span style={{ color: "#FF6B35" }}>system</span>: You are a world-class product photographer...<br />
                <span style={{ color: "#7C3AED" }}>user</span>: Create a shot list for <span style={{ color: "#0EA5E9" }}>{"{product_name}"}</span>.<br />
                <span style={{ color: "#10B981" }}>→ Quality score:</span> <span style={{ color: "#F59E0B", fontWeight: 700 }}>94/100 ⚡</span><br />
                <span style={{ color: "#10B981" }}>→ Tokens:</span> 187 · <span style={{ color: "#10B981" }}>→ Model:</span> GPT-4o
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="section-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="reveal card-feature" style={{ animationDelay: `${i * 0.08}s` }}>
                <div style={{ fontSize: 30, marginBottom: "1rem" }}>{f.emoji}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#0a0a0f", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "#6b7280", lineHeight: 1.65, fontSize: 14.5, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features