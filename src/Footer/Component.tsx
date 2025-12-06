import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { Mail, MapPin } from 'lucide-react'
import { SiInstagram, SiX, SiFacebook } from 'react-icons/si'

import type { Footer } from '@/payload-types'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  const brand = footerData?.brand
  const navColumns = footerData?.navColumns || []
  const contact = footerData?.contact
  const legal = footerData?.legal

  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 pb-6 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{brand?.title || 'DIE LINKE.'}</h3>
            <p className="text-sm opacity-80 whitespace-pre-line">{brand?.description}</p>

            {/* Social Icons */}
            {brand?.socialLinks && brand.socialLinks.length > 0 && (
              <div className="flex space-x-4 mt-4">
                {brand.socialLinks.map((social, i) => {
                  const Icon =
                    social.platform === 'facebook'
                      ? SiFacebook
                      : social.platform === 'instagram'
                        ? SiInstagram
                        : SiX

                  return (
                    <a
                      key={i}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      aria-label={social.platform || 'Social Link'}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Columns 2 & 3: Dynamic Nav Columns */}
          {navColumns.map((col, i) => (
            <div key={i}>
              <h4 className=" font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.navItems?.map(({ link }, j) => (
                  <li key={j}>
                    <CMSLink
                      {...link}
                      className="opacity-80 text-white hover:opacity-100 hover:text-primary transition-colors"
                      appearance="link"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-semibold mb-4">{contact?.title || 'Kontakt'}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 shrink-0 opacity-80" />
                <span className="opacity-80 whitespace-pre-line">{contact?.address}</span>
              </li>
              {contact?.email && (
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 opacity-80" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="opacity-60">{legal?.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legal?.links?.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className="opacity-60 text-white hover:opacity-100 hover:text-primary transition-colors"
                appearance="link"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
