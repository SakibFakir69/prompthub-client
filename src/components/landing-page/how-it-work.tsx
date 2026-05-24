import React from 'react'

function HowItWorks() {

  
  return (
    <div>
         <section style={{ background: "#0a0a0f", padding: "7rem 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="reveal section-label" style={{ color: "#FF6B35", background: "rgba(255,107,53,0.15)" }}>How It Works</div>
            <h2 className="reveal section-heading" style={{ color: "#fff" }}>From search to results<br />in under 60 seconds</h2>
          </div>

          <div className="section-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { num: "01", icon: "🔍", title: "Find Your Prompt", desc: "Search by use case, model, or industry. Our AI-powered semantic search understands what you actually need — not just keywords." },
              { num: "02", icon: "⚡", title: "Copy in One Click", desc: "Every prompt is pre-formatted for your target model. One click copies it directly — or use our browser extension to paste anywhere." },
              { num: "03", icon: "🚀", title: "Get Better Results", desc: "Watch your AI outputs transform. Our prompts are engineered for maximum output quality — tested across 1,000+ real-world runs." },
            ].map((step, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 0.1}s`, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", background: "rgba(255,255,255,0.03)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,107,53,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,53,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <div className="step-number" style={{ position: "absolute", top: -10, right: 16 }}>{step.num}</div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,107,53,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: "1.25rem" }}>{step.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: 15, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks