"use client"
import { CATEGORIES, PROMPTS } from '@/src/constants/landing-page'
import { useScrollReveal } from '@/src/hooks/landing-page/page';
import React, { useEffect, useRef, useState } from 'react'
import { PromptCard } from './components/prompt-card';


function MarketPlace() {

  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const normalize = (s: string) => s.trim().toLowerCase();

  const filteredPrompts = PROMPTS.filter(
    (p) =>
      activeCategory === "All" ||
      normalize(p.category) === normalize(activeCategory)
  );

  // Safety net: force-reveal cards whenever the filtered list changes.
  // Fixes cards staying invisible after switching categories, since
  // useScrollReveal's IntersectionObserver only scans elements present
  // on initial mount and won't pick up newly rendered cards.
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".reveal");
    cards.forEach((el) => el.classList.add("revealed"));
  }, [activeCategory, filteredPrompts.length]);

  return (
    <div>
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

          {filteredPrompts.length > 0 ? (
            <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {filteredPrompts.map((p, i) => <PromptCard key={p.id} prompt={p} delay={i * 0.08} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "#9ca3af", fontSize: 14 }}>
              No prompts in this category yet.
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href="/login" className="btn-ghost">View all 50,000+ prompts →</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MarketPlace