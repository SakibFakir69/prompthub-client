
"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useExploreQuery } from '@/src/store/features/explore/explore.features'
import { PromptCard } from '../feed/PromptCard'
import { useDebounce } from '@/src/hooks/use-debounce'
import { CardSkeleton } from './explore-skeleton'
import { EmptyState } from './explore-empty-state'





interface ExploreMainComponentProps {
  data?: any // SSR fallback, optional
}

function ExploreMainComponent({ data }: ExploreMainComponentProps) {
  const [searchInput, setSearchInput] = useState('')
  const [cursor, setCursor] = useState<string | null>(null)
  const [items, setItems] = useState<any[]>(data?.data ?? [])
  const debouncedSearch = useDebounce(searchInput, 400)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const { data: result, isFetching, isLoading } = useExploreQuery({
    cursor,
    search: debouncedSearch,
  })
  console.log(data,'data');
  // reset list on new search
  useEffect(() => {
    setCursor(null)
    setItems([])
  }, [debouncedSearch])

  // append/replace when new data arrives
  useEffect(() => {
    if (!result) return
    setItems(prev => (cursor ? [...prev, ...result.data] : result.data))
  }, [result])

  const loadMore = useCallback(() => {
    if (!isFetching && result?.nextCursor) {
      setCursor(result.nextCursor)
    }
  }, [isFetching, result])

  // infinite scroll observer
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '400px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  const handleVoteUpdate = (promptId: string, type: 'up' | 'down', delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item._id === promptId
          ? { ...item, [type === 'up' ? 'upVote' : 'downVote']: (item[type === 'up' ? 'upVote' : 'downVote'] ?? 0) + delta }
          : item,
      ),
    )
  }

  const showInitialSkeleton = isLoading && items.length === 0
  const showEmpty = !isLoading && !isFetching && items.length === 0
  console.log(result , 'result')

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-900 mb-1">Explore Prompts</h1>
        <p className="text-[13px] text-gray-400">Discover prompts curated by the community</p>
      </div>

      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-[#FAFAFA]/80 backdrop-blur-sm pb-4 -mx-4 px-4 pt-1">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={2.25}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search prompts, titles, or tags..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-100 bg-white text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-50 transition-all"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} strokeWidth={2.25} />
            </button>
          )}
        </div>

        {debouncedSearch && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] text-gray-400">Filtering by</span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-100">
              {debouncedSearch}
            </span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-y-1">
        {showInitialSkeleton &&
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

        {!showInitialSkeleton &&
          items.map(item => (
            <PromptCard
              key={item._id}
              prompt={item}
              promptId={item._id}
              onVoteUpdate={handleVoteUpdate}
            />
          ))}

        {showEmpty && <EmptyState search={debouncedSearch} />}

        {/* trailing skeletons while loading more */}
        {isFetching && !showInitialSkeleton &&
          Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={`more-${i}`} />)}
      </div>

      {/* sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-1" />

      {!isFetching && result?.nextCursor === null && items.length > 0 && (
        <p className="text-center text-[12px] text-gray-300 py-8">You've reached the end ✦</p>
      )}
    </div>
  )
}

export default ExploreMainComponent