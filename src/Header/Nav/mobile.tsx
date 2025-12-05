'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'

export const HeaderMobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <nav className="flex flex-col gap-4 mt-8">
      {navItems.map(({ label, submenu }, i) => {
        const isOpen = openIndex === i
        const hasLinks = submenu && submenu.length > 0

        return (
          <div key={i} className="border-b border-border/50 pb-4 last:border-none">
            {/* 1. Toggle Button (Label) */}
            <button
              onClick={() => hasLinks && toggleSubmenu(i)}
              className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors text-left"
            >
              {label}
              {hasLinks && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
                  }`}
                />
              )}
            </button>

            {/* 2. Accordion Body (Submenu) */}
            {hasLinks && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-border/50 ml-1">
                  {submenu.map(({ link }, j) => (
                    <CMSLink
                      key={j}
                      {...link}
                      className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      appearance="default"
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
