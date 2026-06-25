'use client'



import { cn } from '@/lib/utils'


export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  // Deterministic colour from name
  const hue = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  const bg = `oklch(0.82 0.10 ${hue})`
  const fg = `oklch(0.30 0.10 ${hue})`

  const sizes = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold shrink-0 select-none',
        sizes[size]
      )}
      style={{ background: bg, color: fg }}
    >
      {initials || '?'}
    </div>
  )
}