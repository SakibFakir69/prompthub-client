import React from 'react'
import { Zap, Repeat, Share2, Globe, FlaskConical, ShieldCheck } from 'lucide-react'

const TICKER_ITEMS = [
  { icon: Zap, text: '50,000+ prompts' },
  { icon: Repeat, text: '1M+ prompt uses' },
  { icon: Share2, text: '120K+ shares' },
  { icon: Globe, text: 'Works with every major AI model' },
  { icon: FlaskConical, text: 'Every prompt battle-tested ' },
  { icon: ShieldCheck, text: '99.9% uptime' },
]

function Ticker() {
  return (
    <div className="ticker-wrap" style={{ marginTop: 68 }}>
      <div className="ticker-inner">
        {[...Array(2)].map((_, gi) => (
          <React.Fragment key={gi}>
            {TICKER_ITEMS.map(({ icon: Icon, text }, i) => (
              <span key={`${gi}-${i}`} className="ticker-item">
                <Icon size={14} strokeWidth={2} className="ticker-icon" />
                <span>{text}</span>
                <span className="ticker-dot">·</span>
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Ticker