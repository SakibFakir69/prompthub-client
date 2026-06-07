
"use client"


import CreatePromptBox from "@/src/components/main/CreatePromptBox"
import PromptFeedCard from "@/src/components/main/PromptFeedCard"
import { useGetAllPromptsQuery } from "@/src/store/features/prompt/prompt.features"




const MOCK_POSTS = [
  {
    id: '1',
    author: { initials: 'AJ', name: 'Alex Johnson', username: 'alexj', color: '#FF6B35' },
    title: 'Cold email sequence for SaaS outreach',
    body: 'Write a 3-email cold outreach sequence for a B2B SaaS product targeting startup founders. Each email should be under 100 words, focus on a single pain point, and end with a low-friction CTA.',
    tags: ['Writing', 'Sales', 'SaaS'],
    likes: 142,
    comments: 18,
    time: '2h ago',
  },
  {
    id: '2',
    author: { initials: 'NR', name: 'Nadia Rahman', username: 'nadia_r', color: '#0F6E56' },
    title: 'System prompt for a strict code reviewer',
    body: 'You are a senior software engineer conducting a thorough code review. Analyze the provided code for correctness, performance bottlenecks, security vulnerabilities, and readability. Be direct and specific.',
    tags: ['Dev', 'System Prompt', 'Code Review'],
    likes: 89,
    comments: 7,
    time: '5h ago',
  },
  {
    id: '3',
    author: { initials: 'MK', name: 'Maria Kim', username: 'maria_k', color: '#533489' },
    title: 'Explain any concept like I\'m 10',
    body: 'Explain [concept] as if you\'re talking to a curious 10-year-old. Use everyday analogies, avoid jargon, and keep it under 150 words. End with one fun fact that makes it feel magical.',
    tags: ['Education', 'Explain'],
    likes: 231,
    comments: 34,
    time: '1d ago',
  },
]

export default function HomePage() {


  const {data:getAllPromptsData} = useGetAllPromptsQuery(null);
  console.log(getAllPromptsData);


  return (
    <div>
      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 flex items-center justify-between py-3 mb-4">
        <h1 className="text-base font-medium text-gray-900">Home Feed</h1>
        <button className="flex items-center gap-1.5 text-sm bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg hover:bg-[#e5602e] transition-colors">
          + New Prompt
        </button>
      </div>

      {/* Create box */}
      <CreatePromptBox />

      {/* Feed */}
      {MOCK_POSTS.map((post) => (
        <PromptFeedCard key={post.id} post={post} />
      ))}
    </div>
  )
}