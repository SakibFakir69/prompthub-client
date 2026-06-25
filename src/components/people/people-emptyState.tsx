import {
  Search,
  SlidersHorizontal,
  UserPlus,
  UserCheck,
  ChevronDown,
  X,
  Users,
  ArrowUpDown,
  Loader2,
} from 'lucide-react'

export function EmptyState({ query, hasFilters }: { query: string; hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
          <Users className="w-10 h-10 text-accent-foreground" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="font-semibold text-foreground text-lg">No people found</p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          {query
            ? `We couldn't find anyone matching "${query}". Try a different name or email.`
            : hasFilters
              ? 'No results match your current filters. Try removing some.'
              : 'Start searching to discover people to follow.'}
        </p>
      </div>
    </div>
  )
}