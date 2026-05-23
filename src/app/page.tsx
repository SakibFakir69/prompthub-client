"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Prompt {
  id: number;
  title: string;
  category: string;
  author: string;
  authorInitials: string;
  price: string;
  rating: number;
  uses: string;
  tag: string;
  emoji: string;
  color: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PROMPTS: Prompt[] = [
  { id: 1, title: "Ultra-Realistic Product Photography", category: "Design", author: "Mira Chen", authorInitials: "MC", price: "$4.99", rating: 5, uses: "12.4k", tag: "Trending", emoji: "📸", color: "#FF6B35" },
  { id: 2, title: "Cold Email That Books Meetings", category: "Marketing", author: "Jake Wolfe", authorInitials: "JW", price: "$3.49", rating: 5, uses: "9.1k", tag: "Best Seller", emoji: "📧", color: "#7C3AED" },
  { id: 3, title: "SaaS Landing Page Copywriter", category: "Copywriting", author: "Priya S.", authorInitials: "PS", price: "$6.99", rating: 5, uses: "7.8k", tag: "Hot", emoji: "✍️", color: "#0EA5E9" },
  { id: 4, title: "Full-Stack Code Reviewer", category: "Dev", author: "Tom Nakamura", authorInitials: "TN", price: "Free", rating: 4, uses: "22.3k", tag: "Free", emoji: "🛠️", color: "#10B981" },
  { id: 5, title: "Viral Thread Generator (X/Twitter)", category: "Marketing", author: "Lena Brooks", authorInitials: "LB", price: "$2.99", rating: 5, uses: "18.6k", tag: "Viral", emoji: "🧵", color: "#F59E0B" },
  { id: 6, title: "Business Analyst Report Writer", category: "Productivity", author: "Arjun Mehta", authorInitials: "AM", price: "$5.49", rating: 4, uses: "5.2k", tag: "New", emoji: "📊", color: "#EC4899" },
];

const CATEGORIES = ["All", "Design", "Marketing", "Copywriting", "Dev", "Productivity"];

const TESTIMONIALS = [
  { name: "Sarah Kim", role: "Indie Hacker · $42k MRR", initials: "SK", color: "#FF6B35", quote: "PromptHub cut my content production time by 80%. I went from writing copy for 3 hours to just 20 minutes. The cold email prompt alone paid for itself in the first week." },
  { name: "Marcus Webb", role: "Design Lead · Figma", initials: "MW", color: "#7C3AED", quote: "I've tried every prompt library out there. PromptHub is the only one where prompts actually work out of the box. The quality control is insane — every prompt is battle-tested." },
  { name: "Diana Osei", role: "Founder · Growthly.ai", initials: "DO", color: "#0EA5E9", quote: "We replaced our $5k/month content agency with PromptHub and two junior writers. The ROI was obvious in month one. Now we ship 3x more content with half the team." },
];

const FEATURES = [
  { emoji: "⚡", title: "One-Click Deploy", desc: "Copy any prompt straight to ChatGPT, Claude, or Gemini with a single tap. No friction, no setup." },
  { emoji: "🔬", title: "Prompt Science", desc: "Every prompt is A/B tested across 1,000+ runs before it ships. Only the top 3% make it to the marketplace." },
  { emoji: "🔒", title: "Version Control", desc: "Every prompt is versioned. Rollback, fork, or remix any iteration — your workflow, your way." },
  { emoji: "🌐", title: "Multi-Model", desc: "Works with ChatGPT, Claude, Gemini, Mistral, and Llama. Optimized for each model's quirks." },
  { emoji: "💰", title: "Earn As You Create", desc: "Publish your prompts and earn 80% revenue share. Top creators make $3k–$18k/month." },
  { emoji: "🧠", title: "AI-Powered Search", desc: "Describe what you need in plain English. Our semantic search finds the perfect prompt every time." },
];

const PRICING = [
  { name: "Starter", price: "$0", period: "/mo", color: "#fff", featured: false, features: ["10 prompt downloads/mo", "Basic search & filters", "Community prompts only", "Standard support", "1 saved collection"] },
  { name: "Pro", price: "$19", period: "/mo", color: "#0a0a0f", featured: true, features: ["Unlimited downloads", "Premium prompt library", "Priority AI search", "Sell your own prompts", "Unlimited collections", "API access (beta)", "Discord community"] },
  { name: "Team", price: "$49", period: "/mo", color: "#fff", featured: false, features: ["Everything in Pro", "5 team seats", "Shared collections", "Usage analytics", "Custom model presets", "Dedicated support"] },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#F59E0B" : "#d1d5db", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function PromptCard({ prompt, delay = 0 }: { prompt: Prompt; delay?: number }) {
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredPrompts = PROMPTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <>
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

      {/* ── TICKER ───────────────────────────────────────── */}
      <div className="ticker-wrap" style={{ marginTop: 68 }}>
        <div className="ticker-inner">
          {[...Array(2)].map((_, gi) => (
            ["⚡ 50,000+ Prompts", "★ 4.9/5 Rating", "🚀 1M+ Downloads", "💰 Creators earn 80%", "🌐 Works with all AI models", "🔬 Every prompt tested 1k+ times", "✅ 99.9% Uptime"].map((t, i) => (
              <span key={`${gi}-${i}`} className="ticker-item">{t}<span style={{ opacity: 0.4 }}>·</span></span>
            ))
          ))}
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
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

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
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

      {/* ── MARKETPLACE ──────────────────────────────────── */}
      <section id="marketplace" style={{ padding: "7rem 5vw", background: "#f8f7f4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
            <div>
              <div className="reveal section-label">Marketplace</div>
              <h2 className="reveal section-heading">Top prompts<br />this week</h2>
            </div>
            <div className="reveal" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} className={`tab-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {filteredPrompts.map((p, i) => <PromptCard key={p.id} prompt={p} delay={i * 0.08} />)}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href="#" className="btn-ghost">View all 50,000+ prompts →</a>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
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

      {/* ── PRICING ──────────────────────────────────────── */}
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

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ padding: "7rem 5vw", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="reveal section-label">Testimonials</div>
            <h2 className="reveal section-heading">Loved by 50,000+<br />builders & creators</h2>
          </div>

          <div className="section-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal card-feature" style={{ animationDelay: `${i * 0.1}s` }}>
                <StarRating count={5} />
                <p style={{ color: "#374151", lineHeight: 1.75, fontSize: 15, margin: "1.25rem 0 1.5rem", fontWeight: 300 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0a0a0f", fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "#9ca3af" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section style={{ margin: "0 5vw 5rem", borderRadius: 32, background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a30 50%, #0a1a2f 100%)", padding: "5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: "2rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B35", display: "inline-block", animation: "pulse-ring 2s infinite" }} />
            <span style={{ fontSize: 13, color: "#FF6B35", fontWeight: 700 }}>50,000 prompts. Ready now.</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginBottom: "1.25rem", lineHeight: 1.05 }}>
            Stop writing mediocre prompts.<br /><span className="gradient-text">Start getting real results.</span>
          </h2>
          <p className="reveal" style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, maxWidth: 480, margin: "0 auto 2.5rem", fontWeight: 300 }}>
            Join 50,000+ professionals who use PromptHub to get 10x better AI outputs — every day.
          </p>
          <div className="reveal" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" className="btn-primary btn-accent" style={{ fontSize: 16, padding: "16px 34px" }}>Browse Prompts Free →</a>
            <a href="#" className="btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", fontSize: 16, padding: "16px 34px" }}>Start Selling Prompts</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
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
    </>
  );
}