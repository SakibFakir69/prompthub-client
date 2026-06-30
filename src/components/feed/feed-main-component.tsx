"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { useGetallFeedQuery } from "@/src/store/features/feed/feed.features";
import { PromptCard } from "@/src/components/feed/PromptCard";
import { PromptCardSkeleton } from "@/src/components/feed/PromptCardSkeleton";
import CreatePromptBox from "../main/create-prompt";

export default function FeedMainComponent({ initialData }:any) {

  const [cursor, setCursor] = useState("");

  
  // Pass the current cursor to the RTK Query hook
  const { data, isLoading, isFetching, isError } = useGetallFeedQuery(cursor);
  
  // Fallback to Server Side data on initial render while RTK loads
  const currentFeed = data?.data || initialData?.data || [];
  const nextCursor = data?.nextCursor || initialData?.nextCursor || null;

  // Intersection Observer to detect bottom of the page
  const observer = useRef(null);

  const lastElementRef = useCallback(
    (node) => {

      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // If the bottom item is visible and a next page exists, fetch it
        if (entries[0].isIntersecting && nextCursor) {
          setCursor(nextCursor);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, nextCursor]
  );

  console.log(initialData)

  return (
    <div>
      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 flex items-center justify-between py-3 mb-4">
        <h1 className="text-base font-medium text-gray-900">Home Feed</h1>
        
      </div>

      <CreatePromptBox />

      {/* Feed List */}
      <div className="flex flex-col gap-3 mt-4">
        {currentFeed.map((prompt, index) => {
          // Attach the observer ref to the very last element in the list
          if (currentFeed.length === index + 1) {
            return (
              <div ref={lastElementRef} key={prompt._id}>
                <PromptCard prompt={prompt} promptId={prompt._id || prompt.id} />
              </div>
            );
          }
          return <PromptCard key={prompt._id} prompt={prompt} promptId={prompt._id || prompt.id}/>;
        })}

        {/* Loading Skeletons for successive page requests */}
        {isFetching && Array(2).fill(0).map((_, i) => <PromptCardSkeleton key={i} />)}

        {isError && (
          <p className="text-center text-sm text-gray-400 py-10">
            Failed to load more posts.
          </p>
        )}

        {currentFeed.length === 0 && !isLoading && (
          <p className="text-center text-sm text-gray-400 py-10">
            No prompts yet. Be the first to share one!
          </p>
        )}
      </div>
    </div>
  );
}