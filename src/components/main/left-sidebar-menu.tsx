"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/home', icon: '⌂', label: 'Home' },
  { href: '/explore', icon: '◎', label: 'Explore' },
  { href: '/saved', icon: '◈', label: 'Saved' },
  { href: '/profile', icon: '◉', label: 'Profile' },
  { href: '/settings', icon: '⚙', label: 'Settings' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 flex-1">
      {NAV.map(({ href, icon, label }) => {
        // Optional: Checks if path starts with href for nested routing (e.g. /profile/edit)
        const isActive = pathname === href || (href !== '/home' && pathname?.startsWith(href))

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
              ${isActive
                ? 'bg-orange-50 text-[#FF6B35] font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <span className="text-base w-5 text-center">{icon}</span>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}