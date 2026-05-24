


import { useScrollReveal } from '@/src/hooks/landing-page/page';
import React, { useState,useEffect } from 'react'

function Navbar() {
  useScrollReveal



  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #f8f7f4; color: #0a0a0f; overflow-x: hidden; }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(.4,0,.2,1), transform 0.65s cubic-bezier(.4,0,.2,1);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-14px) rotate(var(--rot, 0deg)); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,107,53,0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 12px rgba(255,107,53,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,107,53,0); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hero-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #0a0a0f;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FF6B35 0%, #7C3AED 50%, #0EA5E9 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0a0a0f;
          color: #fff;
          padding: 15px 30px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(10,10,15,0.25);
        }

        .btn-accent {
          background: #FF6B35;
          color: #fff;
        }
        .btn-accent:hover {
          box-shadow: 0 12px 40px rgba(255,107,53,0.4);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #0a0a0f;
          padding: 14px 28px;
          border-radius: 100px;
          font-weight: 500;
          font-size: 15px;
          border: 1.5px solid rgba(10,10,15,0.2);
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover {
          background: #0a0a0f;
          color: #fff;
          border-color: #0a0a0f;
          transform: translateY(-2px);
        }

        .ticker-wrap {
          overflow: hidden;
          background: #FF6B35;
          padding: 12px 0;
        }
        .ticker-inner {
          display: flex;
          white-space: nowrap;
          animation: ticker 25s linear infinite;
          gap: 0;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 2rem;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .card-feature {
          background: #fff;
          border: 1.5px solid rgba(10,10,15,0.08);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.28s ease;
        }
        .card-feature:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 50px rgba(0,0,0,0.08);
          border-color: rgba(10,10,15,0.15);
        }

        .step-number {
          font-family: 'Syne', sans-serif;
          font-size: clamp(4rem, 8vw, 7rem);
          font-weight: 800;
          color: rgba(255,255,255,0.06);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FF6B35;
          background: rgba(255,107,53,0.1);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 1rem;
        }

        .section-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #0a0a0f;
        }

        .pricing-card {
          border-radius: 24px;
          padding: 2.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .pricing-card.featured {
          transform: scale(1.03);
          box-shadow: 0 32px 80px rgba(10,10,15,0.2);
        }
        .pricing-card:not(.featured):hover {
          transform: scale(1.01);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        .tab-btn {
          padding: 8px 18px;
          border-radius: 100px;
          border: 1.5px solid rgba(10,10,15,0.12);
          background: transparent;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn.active {
          background: #0a0a0f;
          color: #fff;
          border-color: #0a0a0f;
        }
        .tab-btn:not(.active):hover {
          border-color: rgba(10,10,15,0.3);
          color: #0a0a0f;
        }

        .hero-dot-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(10,10,15,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        .floating-card {
          position: absolute;
          background: #fff;
          border-radius: 16px;
          padding: 1rem 1.2rem;
          box-shadow: 0 24px 60px rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.8);
          animation: float 4s ease-in-out infinite;
          z-index: 2;
        }

        @media (max-width: 900px) {
          .floating-card { display: none; }
          .hero-stats { flex-wrap: wrap !important; gap: 1.5rem !important; }
          .hero-ctas { flex-direction: column !important; align-items: flex-start !important; }
          .section-grid-3 { grid-template-columns: 1fr !important; }
          .section-grid-2 { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-card.featured { transform: none !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .hero-headline { font-size: clamp(2.2rem, 9vw, 3rem) !important; }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        background: scrolled ? "rgba(248,247,244,0.88)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(10,10,15,0.08)" : "none",
        transition: "all 0.3s ease",
        padding: "0 5vw",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #FF6B35, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#0a0a0f", letterSpacing: "-0.03em" }}>PromptHub</span>
          </a>

          {/* Nav Links */}
          <div className="nav-links" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {["Marketplace", "Creators", "Pricing", "Blog"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ fontSize: 15, fontWeight: 500, color: "#374151", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#FF6B35"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "#374151"}>{link}</a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="#" style={{ fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none", display: "flex" }}>Sign in</a>

            <a href="#" className="btn-primary btn-accent sm:none" style={{ fontSize: 14, padding: "10px 22px" }}>Get Started Free →</a>

            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, flexDirection: "column", gap: 5 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 24, height: 2, background: "#0a0a0f", borderRadius: 2, transition: "all 0.2s" }} />)}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.08)", padding: "1.5rem 5vw 2rem" }}>
            {["Marketplace", "Creators", "Pricing", "Blog"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                style={{ display: "block", padding: "0.75rem 0", fontSize: 16, fontWeight: 500, color: "#0a0a0f", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>{link}</a>
            ))}
            <a href="#" className="btn-primary btn-accent" style={{ marginTop: "1.25rem", display: "inline-flex" }}>Get Started Free →</a>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar