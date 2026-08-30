"use client";

interface PromptHubLoaderProps {
  size?: number;
  label?: string;
}

export default function PromptHubLoader({
  size = 64,
  label = "Loading",
}: PromptHubLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}
    >
      <svg width={size} height={size} viewBox="0 0 96 96">
        <rect x="0" y="0" width="96" height="96" rx="20" fill="#FF5A26" />
        <path d="M30,22.5 L75,48 L30,73.5 L42,48 Z" fill="#FFFFFF" />
        <circle cx="37.5" cy="48" r="6" fill="#5B4FE9" />
        <line x1="75" y1="48" x2="90" y2="30" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="48" x2="90" y2="66" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="90" cy="30" r="5" fill="#FFFFFF" className="ph-node" />
        <circle cx="90" cy="66" r="5" fill="#FFFFFF" className="ph-node" />
        <circle cx="75" cy="48" r="3" fill="#FFD9C4" className="ph-signal ph-signal-1" />
        <circle cx="75" cy="48" r="3" fill="#FFD9C4" className="ph-signal ph-signal-2" />
      </svg>
      <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {label}
      </span>
      <style jsx>{`
        .ph-node {
          transform-origin: center;
          transform-box: fill-box;
          animation: ph-node-pulse 1.4s ease-in-out infinite;
        }
        .ph-signal {
          animation: ph-signal-move 1.4s ease-out infinite;
        }
        .ph-signal-1 {
          animation-name: ph-signal-move-top;
        }
        .ph-signal-2 {
          animation-name: ph-signal-move-bottom;
          animation-delay: 0.7s;
        }
        @keyframes ph-signal-move-top {
          0% { transform: translate(0, 0); opacity: 1; }
          80% { transform: translate(15px, -18px); opacity: 1; }
          100% { transform: translate(15px, -18px); opacity: 0; }
        }
        @keyframes ph-signal-move-bottom {
          0% { transform: translate(0, 0); opacity: 1; }
          80% { transform: translate(15px, 18px); opacity: 1; }
          100% { transform: translate(15px, 18px); opacity: 0; }
        }
        @keyframes ph-node-pulse {
          0%, 70% { transform: scale(1); }
          80% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ph-node, .ph-signal {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}