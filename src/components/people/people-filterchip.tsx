import {
  
  X,
 
} from 'lucide-react'

export function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/15 hover:bg-primary/15 transition-colors cursor-pointer"
    >
      {label}
      <X className="w-3 h-3 opacity-70" />
    </button>
  )
}