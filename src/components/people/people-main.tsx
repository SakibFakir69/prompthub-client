'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowUpDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { SearchUser, SearchUsersResponse } from '@/src/features/people/peopleApi'
import { SkeletonCard } from './people-skeleton'
import { useLazySearchUsersQuery, useFollowUserMutation } from '@/src/store/features/people/people.features'
import { GENDER_OPTIONS, PAGE_SIZE, SORT_OPTIONS } from '@/src/constants/people'
import { EmptyState } from './people-emptyState'
import { FilterChip } from './people-filterchip'
import { UserCard } from './people-user-card'

interface PeopleSearchProps {
  data?: SearchUsersResponse
  currentUserId?: string
}

type GenderFilter = 'all' | 'male' | 'female' | 'other'
type SortOption = 'name-asc' | 'name-desc' | 'followers-desc' | 'followers-asc' | 'age-asc' | 'age-desc'

export default function PeopleSearch({ data: initialData, currentUserId }: PeopleSearchProps) {
  const [query, setQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all')
  const [sort, setSort] = useState<SortOption>('name-asc')
  const [users, setUsers] = useState<SearchUser[]>(initialData?.data ?? [])
  const [hasNext, setHasNext] = useState(initialData?.pagination?.hasNextPage ?? false)

  const [followedIds, setFollowedIds] = useState<Set<string>>(
    () => new Set(
      (initialData?.data ?? [])
        .filter((u) => u.isFollowing)
        .map((u) => u._id)
    )
  )
  const [followLoadingIds, setFollowLoadingIds] = useState<Set<string>>(new Set())

  const cursorRef = useRef<string | null>(initialData?.pagination?.nextCursor ?? null)
  const [triggerSearch, { isFetching }] = useLazySearchUsersQuery()
  const [followUser] = useFollowUserMutation()

  const sentinelRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doSearchRef = useRef<(reset?: boolean) => Promise<void>>(async () => {})
  const isLoadingMoreRef = useRef(false)

  const doSearch = useCallback(
    async (reset = true) => {
      try {
        const result = await triggerSearch({
          name: query || undefined,
          gender: genderFilter !== 'all' ? genderFilter : undefined,
          cursor: reset ? undefined : cursorRef.current ?? undefined,
          limit: PAGE_SIZE,
        }).unwrap()

        if (reset) {
          setUsers(result.data)
          setFollowedIds(
            new Set(result.data.filter((u) => u.isFollowing).map((u) => u._id))
          )
        } else {
          setUsers((prev) => {
            const existing = new Set(prev.map((u) => u._id))
            return [...prev, ...result.data.filter((u) => !existing.has(u._id))]
          })
          setFollowedIds((prev) => {
            const next = new Set(prev)
            result.data.forEach((u) => { if (u.isFollowing) next.add(u._id) })
            return next
          })
        }

        cursorRef.current = result.pagination.nextCursor
        setHasNext(result.pagination.hasNextPage)
      } catch (err) {
        console.error('Search failed:', err)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, genderFilter, triggerSearch]
  )

  useEffect(() => { doSearchRef.current = doSearch }, [doSearch])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(true), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, genderFilter])

  useEffect(() => {
    setUsers((prev) => {
      const sorted = [...prev]
      sorted.sort((a, b) => {
        switch (sort) {
          case 'name-asc':       return a.name.localeCompare(b.name)
          case 'name-desc':      return b.name.localeCompare(a.name)
          case 'followers-desc': return (b.followers ?? 0) - (a.followers ?? 0)
          case 'followers-asc':  return (a.followers ?? 0) - (b.followers ?? 0)
          case 'age-desc':       return (b.age ?? 0) - (a.age ?? 0)
          case 'age-asc':        return (a.age ?? 0) - (b.age ?? 0)
          default:               return 0
        }
      })
      return sorted
    })
  }, [sort])

  const isFetchingRef = useRef(isFetching)
  const hasNextRef = useRef(hasNext)
  useEffect(() => { isFetchingRef.current = isFetching }, [isFetching])
  useEffect(() => { hasNextRef.current = hasNext }, [hasNext])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextRef.current &&
          !isFetchingRef.current &&
          !isLoadingMoreRef.current
        ) {
          isLoadingMoreRef.current = true
          doSearchRef.current(false).finally(() => {
            isLoadingMoreRef.current = false
          })
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleToggleFollow = useCallback(async (userId: string) => {
    setFollowLoadingIds((prev) => new Set(prev).add(userId))
    try {
      const res = await followUser({ id: userId }).unwrap()

      // ✅ FIX: res is { success, message, data: { following } }
      // NOT { following } directly — must read res.data.following
      const isNowFollowing = res.data.following

      setFollowedIds((prev) => {
        const next = new Set(prev)
        if (isNowFollowing) next.add(userId)
        else next.delete(userId)
        return next
      })

      setUsers((prev) =>
        prev.map((u) => {
          if (u._id !== userId) return u
          const delta = isNowFollowing ? 1 : -1
          return { ...u, followers: Math.max(0, (u.followers ?? 0) + delta) }
        })
      )
    } catch (err) {
      console.error('Follow toggle failed:', err)
    } finally {
      setFollowLoadingIds((prev) => {
        const next = new Set(prev)
        next.delete(userId)
        return next
      })
    }
  }, [followUser])

  const clearAll = useCallback(() => {
    setGenderFilter('all')
    setSort('name-asc')
    setQuery('')
  }, [])

  const chips: { key: string; label: string; onRemove: () => void }[] = []
  if (query) chips.push({ key: 'query', label: `"${query}"`, onRemove: () => setQuery('') })
  if (genderFilter !== 'all') chips.push({
    key: 'gender',
    label: genderFilter.charAt(0).toUpperCase() + genderFilter.slice(1),
    onRemove: () => setGenderFilter('all'),
  })
  if (sort !== 'name-asc') {
    const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label
    if (sortLabel) chips.push({ key: 'sort', label: sortLabel, onRemove: () => setSort('name-asc') })
  }

  const hasActiveFilters = chips.length > 0
  const isInitialLoading = isFetching && users.length === 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">People</h1>
          <p className="text-sm text-muted-foreground mt-1">Discover creators and connect</p>
        </div>
        {!isFetching && users.length > 0 && (
          <span className="text-xs text-muted-foreground shrink-0 tabular-nums pb-0.5">
            {users.length} result{users.length !== 1 ? 's' : ''}{hasNext ? '+' : ''}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            className="pl-9 pr-9 h-10 bg-card border-border focus-visible:ring-primary/40 focus-visible:border-primary/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'h-10 gap-1.5 border-border bg-card hover:bg-accent hover:text-accent-foreground shrink-0',
                genderFilter !== 'all' && 'border-primary/40 bg-primary/5 text-primary'
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filter</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Gender</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {GENDER_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setGenderFilter(opt.value)}
                className={cn('cursor-pointer', genderFilter === opt.value && 'bg-accent text-accent-foreground font-medium')}
              >
                {opt.label}
                {genderFilter === opt.value && <span className="ml-auto text-primary text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'h-10 gap-1.5 border-border bg-card hover:bg-accent hover:text-accent-foreground shrink-0',
                sort !== 'name-asc' && 'border-primary/40 bg-primary/5 text-primary'
              )}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sort</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {SORT_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={cn('cursor-pointer', sort === opt.value && 'bg-accent text-accent-foreground font-medium')}
              >
                {opt.label}
                {sort === opt.value && <span className="ml-auto text-primary text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <FilterChip key={chip.key} label={chip.label} onRemove={chip.onRemove} />
          ))}
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {users.length > 0 && <div className="h-px bg-border" />}

      <div className="space-y-2.5">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            isFollowing={followedIds.has(user._id)}
            isFollowLoading={followLoadingIds.has(user._id)}
            onToggleFollow={handleToggleFollow}
            currentUserId={currentUserId}
          />
        ))}

        {isFetching && !isInitialLoading &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`load-${i}`} />)}

        {isInitialLoading &&
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={`init-${i}`} />)}

        {!isFetching && users.length === 0 && (
          <EmptyState query={query} hasFilters={hasActiveFilters} />
        )}
      </div>

      <div ref={sentinelRef} className="h-1" />

      {!hasNext && users.length > 0 && !isFetching && (
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
            You&apos;ve seen everyone
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      )}
    </div>
  )
}