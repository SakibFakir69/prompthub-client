

import React from 'react'

function Footer() {
  return (
    <div>
       <footer style={{ background: "#0a0a0f", padding: "5rem 5vw 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #FF6B35, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>PromptHub</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, lineHeight: 1.7, maxWidth: 260, fontWeight: 300 }}>The world's leading marketplace for AI prompts. Buy, sell, and discover prompts that actually work.</p>
              <div style={{ display: "flex", gap: 10, marginTop: "1.5rem" }}>
                {["𝕏", "in", "📧"].map((icon, i) => (
                  <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.background = "#FF6B35"; (e.target as HTMLElement).style.borderColor = "#FF6B35"; (e.target as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            {[
              { heading: "Product", links: ["Browse Prompts", "Sell Prompts", "Editor", "API", "Chrome Extension"] },
              { heading: "Company", links: ["About Us", "Blog", "Careers", "Press Kit", "Contact"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Creator Agreement"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", fontSize: 15 }}>{col.heading}</div>
                <ul style={{ listStyle: "none" }}>
                  {col.links.map((link) => (
                    <li key={link} style={{ marginBottom: "0.6rem" }}>
                      <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, textDecoration: "none", transition: "color 0.2s", fontWeight: 300 }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color = "#FF6B35"}
                        onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)"}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>© 2025 PromptHub, Inc. All rights reserved.</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>Built for the AI generation ⚡</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer