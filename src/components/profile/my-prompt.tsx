"use client";


import type { Prompt } from "@/src/store/features/prompt/prompt.features";

import { PromptCard } from "./my-prompt-card";
import { EmptyState } from "./profile-my-prompt-empty-state";
import { SkeletonCard } from "./profile-my-prompt-skeleton-card";






interface MyPromptProps {
  data: Prompt[];
  isLoading: boolean;
  onView?: (id: string) => void;
}

export default function MyPrompt({ data, isLoading, onView }: MyPromptProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!data?.length) return <EmptyState />;

  return (
    <>
      <p className="text-xs text-gray-400 mb-3">
        {data.length} prompt{data.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((prompt) => (
          <PromptCard key={prompt._id} prompt={prompt} onView={onView} />
        ))}
      </div>
    </>
  );
}