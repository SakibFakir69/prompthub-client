import React from 'react'

function Banner() {
  return (
    <div>
      <section style={{ margin: "0 5vw 5rem", borderRadius: 32, background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a30 50%, #0a1a2f 100%)", padding: "5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Background Grid & Glow Effects */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          
          {/* Badges Container */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            {/* Live Stats Badge */}
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 100, padding: "6px 16px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B35", display: "inline-block", animation: "pulse-ring 2s infinite" }} />
              <span style={{ fontSize: 13, color: "#FF6B35", fontWeight: 700 }}>50,000+ Prompts Shared</span>
            </div>

            {/* Marketplace Teaser Badge */}
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(168, 85, 247, 0.15)", border: "1px solid rgba(168, 85, 247, 0.3)", borderRadius: 100, padding: "6px 16px" }}>
              <span style={{ fontSize: 12 }}>🚀</span>
              <span style={{ fontSize: 13, color: "#a855f7", fontWeight: 700 }}>Marketplace Coming Soon</span>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="reveal" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginBottom: "1.25rem", lineHeight: 1.05 }}>
            Don't just use AI.<br />
            <span className="gradient-text">Share, collaborate, and monetize your prompts.</span>
          </h2>

          {/* Subtext */}
          <p className="reveal" style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, maxWidth: 540, margin: "0 auto 2.5rem", fontWeight: 300, lineHeight: 1.6 }}>
            Join the ultimate hub where creators engineer high-tier outputs, engineers share their secret recipes, and top prompters prepare to launch their own prompt storefronts.
          </p>

          {/* Call to Actions */}
          <div className="reveal" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" className="btn-primary btn-accent" style={{ fontSize: 16, padding: "16px 34px" }}>
              Explore Community Prompts →
            </a>
            <a href="#" className="btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", fontSize: 16, padding: "16px 34px" }}>
              Share Your First Prompt
            </a>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Banner