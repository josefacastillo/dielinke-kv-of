'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { socialIcons, socialLinks } from '@/utilities/socialLinks'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative w-full flex items-center  text-white" data-theme="dark">
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-primary/60 z-10" />
      </div>

      <div className="container z-10 relative flex items-start">
        <div className="max-w-3xl">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

          <div className="flex items-center gap-6 mb-8">
            {socialLinks.map((social, idx) => {
              const Icon = socialIcons[social.platform as keyof typeof socialIcons]
              if (!Icon) return null

              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label={social.ariaLabel}
                >
                  <Icon className="w-8 h-8" />
                </a>
              )
            })}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
