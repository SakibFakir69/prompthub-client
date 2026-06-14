import { LayoutGrid } from "lucide-react";
import MyPromptCard from "./my-prompt-card";


interface Prompt {
  _id: string;
  title: string;
  prompt: string;
  tags?: string;
  category?: string[];
  emoji?: string;
  upVote?: number;
  isPublic?: boolean;
}

interface MyPromptGridProps {
  prompts: Prompt[];
  isLoading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-100 rounded-full" />
        <div className="h-5 w-12 bg-gray-100 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-50">
        <div className="h-4 w-10 bg-gray-100 rounded" />
        <div className="h-7 w-24 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

export default function MyPromptGrid({ prompts, isLoading }: MyPromptGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!prompts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <LayoutGrid size={28} className="text-gray-300" />
        </div>
        <p className="text-gray-900 font-semibold mb-1">No prompts yet</p>
        <p className="text-sm text-gray-500">Share your first prompt with the community.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {prompts.map((prompt) => (
        <MyPromptCard key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
}   