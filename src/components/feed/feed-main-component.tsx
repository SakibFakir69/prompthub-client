"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { useGetallFeedQuery } from "@/src/store/features/feed/feed.features";
import { PromptCard } from "@/src/components/feed/PromptCard";
import { PromptCardSkeleton } from "@/src/components/feed/PromptCardSkeleton";
import CreatePromptBox from "../main/create-prompt";

interface FeedItem {
  _id: string
  id?: string
  title: string
  prompt: string
  category: string[]
  tags: string[]
  image?: string
  createdBy: { userId: string; name: string; avatar: string }
  upVote: number
  downVote: number
  upVotedBy: string[]
  createdAt: string
}

interface InitialData {
  data?: FeedItem[]
  nextCursor?: string | null
}

export default function FeedMainComponent({ initialData }: { initialData?: InitialData }) {
  const [cursor, setCursor] = useState("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialData?.data || []);
  const [nextCursorState, setNextCursorState] = useState<string | null>(initialData?.nextCursor ?? null);

  const { data, isLoading, isFetching, isError } = useGetallFeedQuery(cursor);


  useEffect(() => {
    if (!data?.data) return;

    setFeedItems((prev) => {
      if (cursor === "") return data.data;
      const existingIds = new Set(prev.map((p) => p._id));
      const newOnes = data.data.filter((p) => !existingIds.has(p._id));
      return [...prev, ...newOnes];
    });

    setNextCursorState(data.nextCursor ?? null);
  }, [data, cursor]);


  const handleVoteUpdate = useCallback(
    (promptId: string, type: "up" | "down", delta: number) => {
      setFeedItems((prev) =>
        prev.map((p) => {
          if (p._id !== promptId) return p;
          const field = type === "up" ? "upVote" : "downVote";
          return { ...p, [field]: Math.max(0, p[field] + delta) };
        })
      );
    },
    []
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextCursorState) {
          setCursor(nextCursorState);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, nextCursorState]
  );

  const showInitialLoading = isLoading && feedItems.length === 0;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 flex items-center justify-between py-3 mb-4">
        <h1 className="text-base font-medium text-gray-900">Home Feed</h1>
      </div>

      <CreatePromptBox />

      <div className="flex flex-col gap-3 mt-4">
        {showInitialLoading &&
          Array(3).fill(0).map((_, i) => <PromptCardSkeleton key={i} />)}

        {feedItems.map((prompt, index) => {
          const isLast = feedItems.length === index + 1;
          const card = (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              promptId={prompt._id || prompt.id || ""}
              onVoteUpdate={handleVoteUpdate}
            />
          );
          return isLast ? (
            <div ref={lastElementRef} key={prompt._id}>
              {card}
            </div>
          ) : (
            card
          );
        })}

        {isFetching && cursor !== "" &&
          Array(2).fill(0).map((_, i) => <PromptCardSkeleton key={`more-${i}`} />)}

        {isError && (
          <p className="text-center text-sm text-gray-400 py-10">
            Failed to load more posts.
          </p>
        )}

        {feedItems.length === 0 && !isLoading && !isError && (
          <p className="text-center text-sm text-gray-400 py-10">
            No prompts yet. Be the first to share one!
          </p>
        )}
      </div>
    </div>
  );
}