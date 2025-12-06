'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ChevronDown, Menu } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; className: string }> = ({
  data,
  className,
}) => {
  const navItems = data?.navItems || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <nav className={className}>
      {navItems.map(({ label, submenu }, i) => {
        const isOpen = openIndex === i
        const hasLinks = submenu && submenu.length > 0

        return (
          <div
            key={i}
            className="relative group"
            onMouseEnter={() => setOpenIndex(i)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            {/* Top Level Label */}
            <button
              className="flex items-center gap-1 font-medium hover:text-primary py-2 cursor-pointer focus:outline-none"
              onClick={() => setOpenIndex(isOpen ? null : i)} // Toggle on click for mobile/touch
            >
              {label}
              {hasLinks && (
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              )}
            </button>

            {/* Dropdown Menu */}
            {hasLinks && (
              <div
                className={`
                  absolute left-0 top-full pt-2 w-56 z-20 
                  transition-all duration-200 origin-top-left
                  ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
                `}
              >
                <div className="bg-white dark:bg-black border border-border rounded shadow-lg p-2 flex flex-col gap-1">
                  {submenu.map(({ link }, j) => (
                    <CMSLink
                      key={j}
                      {...link}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                      appearance="link"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
