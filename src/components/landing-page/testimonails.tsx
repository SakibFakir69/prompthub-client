

import { TESTIMONIALS } from '@/src/constants/landing-page'
import React from 'react'
import { StarRating } from './components/star-rating'


function Testionails() {
  return (
    <div>
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
    </div>
  )
}

export default Testionails