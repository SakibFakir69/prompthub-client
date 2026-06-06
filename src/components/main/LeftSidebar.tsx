'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/home',      icon: '⌂',  label: 'Home' },
  { href: '/explore',   icon: '◎',  label: 'Explore' },
  { href: '/saved',     icon: '◈',  label: 'Saved' },
  { href: '/profile',   icon: '◉',  label: 'Profile' },
  { href: '/settings',  icon: '⚙',  label: 'Settings' },
]

export default function LeftSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="px-3 py-2 mb-5">
        <span className="text-lg font-semibold tracking-tight">
          Prompt<span className="text-[#FF6B35]">Hub</span>
        </span>
      </div>

      {/* Profile mini */}
      <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer mb-5 transition-colors">
        <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-sm font-medium shrink-0">
          SK
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">Sakib Khan</p>
          <p className="text-xs text-gray-500">@sakib · Pro</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
              ${pathname === href
                ? 'bg-orange-50 text-[#FF6B35] font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <span className="text-base w-5 text-center">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* New prompt button */}
      <div className="pt-4 border-t border-gray-100 mt-4">
        <button className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#e5602e] text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
          + New Prompt
        </button>
      </div>
    </div>
  )
}