import React from 'react'

function Hero() {
  return (
    <div>
       <section style={{ position: "relative", minHeight: "calc(100vh - 68px - 44px)", display: "flex", alignItems: "center", padding: "5rem 5vw 6rem", overflow: "hidden", background: "#f8f7f4" }}>
        <div className="hero-dot-bg" />

        {/* Floating Cards — Left */}
        <div className="floating-card" style={{ left: "2%", top: "20%", "--rot": "-4deg" } as React.CSSProperties & { "--rot": string }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>📸</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0f" }}>Product Photography</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>by Mira Chen</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: "#F59E0B", fontSize: 11 }}>★</span>)}</div>
            <span style={{ fontWeight: 800, fontSize: 13, color: "#0a0a0f", fontFamily: "'Syne', sans-serif" }}>$4.99</span>
          </div>
        </div>

        <div className="floating-card" style={{ left: "1%", top: "58%", "--rot": "3deg", animationDelay: "1.2s" } as React.CSSProperties & { "--rot": string }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#10B981", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>💸 New Sale</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0f" }}>@jake_wolfe earned</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0a0a0f", fontFamily: "'Syne', sans-serif" }}>$847 today</div>
        </div>

        {/* Floating Cards — Right */}
        <div className="floating-card" style={{ right: "2%", top: "18%", "--rot": "4deg", animationDelay: "0.6s" } as React.CSSProperties & { "--rot": string }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>🔥 Trending now</div>
          {["Viral Thread Writer", "SaaS Copywriter", "Code Reviewer"].map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
              <span style={{ fontSize: 12, color: "#374151" }}>{t}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#FF6B35" }}>↑{[18, 12, 9][i]}%</span>
            </div>
          ))}
        </div>

        <div className="floating-card" style={{ right: "2%", top: "62%", animationDelay: "1.8s" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", animation: "pulse-ring 2s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.08em" }}>Live</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0a0a0f", fontFamily: "'Syne', sans-serif" }}>2,847</div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>prompts used right now</div>
        </div>

        {/* Center Content */}
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid rgba(10,10,15,0.1)", borderRadius: 100, padding: "8px 16px 8px 8px", marginBottom: "2rem", animation: "fadeUp 0.6s ease forwards", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <span style={{ background: "#FF6B35", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase" }}>New</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>AI model scoring is here — prompts ranked by actual output</span>
            <span style={{ color: "#FF6B35", fontWeight: 700 }}>→</span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline" style={{ marginBottom: "1.5rem", animation: "fadeUp 0.6s 0.1s ease both" }}>
            The Marketplace for<br />
            <span className="gradient-text">Prompts That Actually Work</span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: 19, color: "#6b7280", maxWidth: 500, margin: "0 auto 2.5rem", lineHeight: 1.65, fontWeight: 300, animation: "fadeUp 0.6s 0.2s ease both" }}>
            Buy, sell, and discover battle-tested AI prompts for ChatGPT, Claude, and Gemini. Every prompt tested 1,000+ times before it ships.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem", animation: "fadeUp 0.6s 0.3s ease both" }}>
            <a href="#marketplace" className="btn-primary btn-accent" style={{ fontSize: 16, padding: "16px 34px" }}>Browse Prompts →</a>
            <a href="#" className="btn-ghost" style={{ fontSize: 16, padding: "16px 34px" }}>Start Selling Free</a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: "flex", gap: "3rem", justifyContent: "center", animation: "fadeUp 0.6s 0.4s ease both" }}>
            {[["50K+", "Prompts Available"], ["$2.4M", "Paid to Creators"], ["1M+", "Downloads"], ["4.9★", "Avg Rating"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "#0a0a0f", letterSpacing: "-0.03em" }}>{num}</div>
                <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero