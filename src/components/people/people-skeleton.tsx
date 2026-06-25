

export function SkeletonCard() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card animate-pulse">
      <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
      <div className="flex-1 space-y-2.5 min-w-0">
        <div className="h-4 bg-muted rounded-md w-1/4" />
        <div className="h-3 bg-muted rounded-md w-2/5" />
        <div className="flex gap-3 pt-1">
          <div className="h-3 bg-muted rounded-md w-16" />
          <div className="h-3 bg-muted rounded-md w-12" />
        </div>
      </div>
      <div className="w-[88px] h-9 bg-muted rounded-lg shrink-0" />
    </div>
  )
}