'use client'

import { UserPlus, UserCheck, UserMinus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { SearchUser } from '@/src/features/people/peopleApi'
import { Avatar } from './people-avatar'

function fmtNum(n: number | null | undefined): string {
  if (n == null) return '0'
  return n.toLocaleString()
}

export function UserCard({
  user,
  isFollowing,
  isFollowLoading,
  onToggleFollow,
  currentUserId,
}: {
  user: SearchUser
  isFollowing: boolean
  isFollowLoading: boolean
  onToggleFollow: (id: string) => Promise<void>
  currentUserId?: string
}) {
  // Never show Follow on your own card
  const isSelf = !!currentUserId && user._id === currentUserId

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/[0.03] transition-all duration-200">
      <Avatar name={user.name} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground truncate text-[15px]">
            {user.name}
          </span>
          {user.gender && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 font-medium uppercase tracking-wide border-0 bg-accent text-accent-foreground shrink-0"
            >
              {user.gender}
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>

        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">
              {/* followers is a number — do NOT use .length */}
              {fmtNum(user.followers)}
            </span>{' '}
            followers
          </span>
          {user.age != null && (
            <span className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground tabular-nums">{user.age}</span> yrs
            </span>
          )}
        </div>
      </div>

      {!isSelf && (
        <Button
          size="sm"
          variant={isFollowing ? 'outline' : 'default'}
          onClick={() => onToggleFollow(user._id)}
          disabled={isFollowLoading}
          aria-label={isFollowing ? `Unfollow ${user.name}` : `Follow ${user.name}`}
          className={cn(
            'shrink-0 gap-1.5 text-xs font-medium transition-all duration-200 min-w-[88px] justify-center',
            isFollowLoading && 'opacity-60 cursor-not-allowed',
            isFollowing
              ? [
                  'border-border text-muted-foreground',
                  'group-hover:border-red-400/40 group-hover:text-red-400/80',
                  'hover:!border-red-400/60 hover:!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-950/30',
                ]
              : 'bg-[#FF6B35] text-white hover:bg-[#e55e2d] shadow-sm shadow-[#FF6B35]/20'
          )}
        >
          {isFollowLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">
                {isFollowing ? 'Unfollowing…' : 'Following…'}
              </span>
            </>
          ) : isFollowing ? (
            <>
              <UserCheck className="w-3.5 h-3.5 group-hover:hidden" />
              <UserMinus className="w-3.5 h-3.5 hidden group-hover:block" />
              <span className="hidden sm:inline group-hover:hidden">Following</span>
              <span className="hidden sm:group-hover:inline">Unfollow</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Follow</span>
            </>
          )}
        </Button>
      )}
    </div>
  )
}