import React from 'react'

function Ticker() {
  return (
    <div>
       <div className="ticker-wrap" style={{ marginTop: 68 }}>
        <div className="ticker-inner">
          {[...Array(2)].map((_, gi) => (
            ["⚡ 50,000+ Prompts", "★ 4.9/5 Rating", "🚀 1M+ Downloads", "💰 Creators earn 80%", "🌐 Works with all AI models", "🔬 Every prompt tested 1k+ times", "✅ 99.9% Uptime"].map((t, i) => (
              <span key={`${gi}-${i}`} className="ticker-item">{t}<span style={{ opacity: 0.4 }}>·</span></span>
            ))
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ticker