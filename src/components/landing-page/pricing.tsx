import { PRICING } from '@/src/constants/landing-page'
import React from 'react'

function Pricing() {
  
  
  return (
    <div>
      <section id="pricing" style={{ padding: "7rem 5vw", background: "#f8f7f4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="reveal section-label">Pricing</div>
            <h2 className="reveal section-heading">Start free. Scale as you grow.</h2>
            <p className="reveal" style={{ color: "#9ca3af", marginTop: "1rem", fontSize: 16, fontWeight: 300 }}>No hidden fees. Cancel anytime. 80% revenue share for creators.</p>
          </div>

          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", alignItems: "center" }}>
            {PRICING.map((plan, i) => (
              <div key={i} className={`pricing-card reveal ${plan.featured ? "featured" : ""}`}
                style={{ background: plan.color, border: plan.featured ? "none" : "1.5px solid rgba(10,10,15,0.1)", animationDelay: `${i * 0.1}s`, boxShadow: plan.featured ? "0 32px 80px rgba(10,10,15,0.2)" : "none" }}>
                {plan.featured && (
                  <div style={{ position: "absolute", top: 20, right: 20, background: "#FF6B35", color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.08em" }}>Most Popular</div>
                )}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: plan.featured ? "rgba(255,255,255,0.5)" : "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{plan.name}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 48, fontWeight: 800, color: plan.featured ? "#fff" : "#0a0a0f", letterSpacing: "-0.04em" }}>{plan.price}</span>
                    <span style={{ fontSize: 16, color: plan.featured ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{plan.period}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                  {plan.features.map((feat, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.07)" : "rgba(10,10,15,0.06)"}`, fontSize: 14, color: plan.featured ? "rgba(255,255,255,0.75)" : "#374151", fontWeight: 300 }}>
                      <span style={{ color: "#10B981", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <a href="#" className="btn-primary" style={{
                  width: "100%", justifyContent: "center", textAlign: "center",
                  background: plan.featured ? "#FF6B35" : "#0a0a0f",
                  fontSize: 15, padding: "14px 24px",
                }}>
                  {plan.name === "Starter" ? "Get Started Free" : plan.name === "Pro" ? "Start Pro Trial →" : "Contact Sales →"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing