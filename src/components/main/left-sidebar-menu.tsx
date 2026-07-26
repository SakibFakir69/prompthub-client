"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Users, User, Settings, type LucideIcon } from 'lucide-react'

interface NavItem {
  href: string
  icon: LucideIcon
  label: string
}

const navItems: NavItem[] = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/people', icon: Users, label: 'People' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 flex-1">
      {navItems.map(({ href, icon: Icon, label }) => {
        
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
            <Icon
              size={18}
              strokeWidth={isActive ? 2.5 : 2}
              className="w-5 shrink-0"
            />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}