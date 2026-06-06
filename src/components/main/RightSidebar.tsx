const PEOPLE = [
  { initials: 'JL', name: 'Jamie Lee',  role: 'AI researcher',    followers: '3.1k', color: '#185FA5' },
  { initials: 'PR', name: 'Priya Rao',  role: 'Prompt engineer',  followers: '2.4k', color: '#3B6D11' },
  { initials: 'TM', name: 'Tom Miller', role: 'UX writer',        followers: '1.9k', color: '#993556' },
]

const CATEGORIES = ['Writing', 'Dev', 'Marketing', 'Education', 'Design', 'Research', 'Productivity']

const TRENDING = [
  { tag: '#systemPrompt', count: '2.4k' },
  { tag: '#codeReview',   count: '1.8k' },
  { tag: '#writing',      count: '1.1k' },
  { tag: '#roleplay',     count: '890' },
]

export default function RightSidebar() {
  return (
    <div className="p-4 flex flex-col gap-4">

      {/* People to follow */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">People to follow</h3>
          <button className="text-xs text-[#FF6B35] hover:underline">More</button>
        </div>
        <div className="flex flex-col gap-3">
          {PEOPLE.map(({ initials, name, role, followers, color }) => (
            <div key={name} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0"
                style={{ background: color }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                <p className="text-xs text-gray-500">{role} · {followers} followers</p>
              </div>
              <button className="text-xs px-3 py-1 rounded-full border border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-colors whitespace-nowrap">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Top categories */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Top categories</h3>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trending prompts */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Trending</h3>
          <button className="text-xs text-[#FF6B35] hover:underline">See all</button>
        </div>
        <div className="flex flex-col gap-2">
          {TRENDING.map(({ tag, count }) => (
            <div key={tag} className="flex items-center justify-between py-1 cursor-pointer group">
              <span className="text-sm text-gray-600 group-hover:text-[#FF6B35] transition-colors">{tag}</span>
              <span className="text-xs text-gray-400">{count} uses</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}