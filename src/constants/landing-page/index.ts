

export interface Prompt {
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


export const FEATURES = [
  { emoji: "⚡", title: "One-Click Deploy", desc: "Copy any prompt straight to ChatGPT, Claude, or Gemini with a single tap. No friction, no setup." },
  { emoji: "🔬", title: "Prompt Science", desc: "Every prompt is A/B tested across 1,000+ runs before it ships. Only the top 3% make it to the marketplace." },
  { emoji: "🔒", title: "Version Control", desc: "Every prompt is versioned. Rollback, fork, or remix any iteration — your workflow, your way." },
  { emoji: "🌐", title: "Multi-Model", desc: "Works with ChatGPT, Claude, Gemini, Mistral, and Llama. Optimized for each model's quirks." },
  { emoji: "💰", title: "Earn As You Create", desc: "Publish your prompts and earn 80% revenue share. Top creators make $3k–$18k/month." },
  { emoji: "🧠", title: "AI-Powered Search", desc: "Describe what you need in plain English. Our semantic search finds the perfect prompt every time." },
];
export const TESTIMONIALS = [
  { name: "Sarah Kim", role: "Indie Hacker · $42k MRR", initials: "SK", color: "#FF6B35", quote: "PromptHub cut my content production time by 80%. I went from writing copy for 3 hours to just 20 minutes. The cold email prompt alone paid for itself in the first week." },
  { name: "Marcus Webb", role: "Design Lead · Figma", initials: "MW", color: "#7C3AED", quote: "I've tried every prompt library out there. PromptHub is the only one where prompts actually work out of the box. The quality control is insane — every prompt is battle-tested." },
  { name: "Diana Osei", role: "Founder · Growthly.ai", initials: "DO", color: "#0EA5E9", quote: "We replaced our $5k/month content agency with PromptHub and two junior writers. The ROI was obvious in month one. Now we ship 3x more content with half the team." },
];

export const PRICING = [
  { name: "Starter", price: "$0", period: "/mo", color: "#fff", featured: false, features: ["10 prompt downloads/mo", "Basic search & filters", "Community prompts only", "Standard support", "1 saved collection"] },
  { name: "Pro", price: "$19", period: "/mo", color: "#0a0a0f", featured: true, features: ["Unlimited downloads", "Premium prompt library", "Priority AI search", "Sell your own prompts", "Unlimited collections", "API access (beta)", "Discord community"] },
  { name: "Team", price: "$49", period: "/mo", color: "#fff", featured: false, features: ["Everything in Pro", "5 team seats", "Shared collections", "Usage analytics", "Custom model presets", "Dedicated support"] },
];
export const CATEGORIES = ["All", "Design", "Marketing", "Copywriting", "Dev", "Productivity"];

export const PROMPTS: Prompt[] = [
  { id: 1, title: "Ultra-Realistic Product Photography", category: "Design", author: "Mira Chen", authorInitials: "MC", price: "$4.99", rating: 5, uses: "12.4k", tag: "Trending", emoji: "📸", color: "#FF6B35" },
  { id: 2, title: "Cold Email That Books Meetings", category: "Marketing", author: "Jake Wolfe", authorInitials: "JW", price: "$3.49", rating: 5, uses: "9.1k", tag: "Best Seller", emoji: "📧", color: "#7C3AED" },
  { id: 3, title: "SaaS Landing Page Copywriter", category: "Copywriting", author: "Priya S.", authorInitials: "PS", price: "$6.99", rating: 5, uses: "7.8k", tag: "Hot", emoji: "✍️", color: "#0EA5E9" },
  { id: 4, title: "Full-Stack Code Reviewer", category: "Dev", author: "Tom Nakamura", authorInitials: "TN", price: "Free", rating: 4, uses: "22.3k", tag: "Free", emoji: "🛠️", color: "#10B981" },
  { id: 5, title: "Viral Thread Generator (X/Twitter)", category: "Marketing", author: "Lena Brooks", authorInitials: "LB", price: "$2.99", rating: 5, uses: "18.6k", tag: "Viral", emoji: "🧵", color: "#F59E0B" },
  { id: 6, title: "Business Analyst Report Writer", category: "Productivity", author: "Arjun Mehta", authorInitials: "AM", price: "$5.49", rating: 4, uses: "5.2k", tag: "New", emoji: "📊", color: "#EC4899" },
];
