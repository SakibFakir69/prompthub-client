
import { DemoPrompt } from "@/src/interfaces/auth";



export function PromptCardLogin({ prompt, className }: { prompt: DemoPrompt; className?: string }) {
  const initials = prompt?.creatededBy?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-lg ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#ff9a76] flex items-center justify-center text-white text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{prompt?.creatededBy?.name}</p>
          <p className="text-xs text-gray-400">Prompt Author</p>
        </div>
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{prompt.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{prompt.prompt}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-[#FF6B35] border border-orange-100">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex gap-1">
          {prompt.category.map((cat) => (
            <span key={cat} className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium">
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <svg className="w-4 h-4 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium text-gray-500">{prompt.upVote}</span>
        </div>
      </div>
    </div>
  );
}