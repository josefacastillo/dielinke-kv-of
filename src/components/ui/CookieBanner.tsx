'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './button'

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-darker-secondary/90 text-primary-foreground shadow-xl animate-in slide-in-from-bottom duration-500"
      role="region"
      aria-label="Cookie-Hinweis"
    >
      <div className="container flex flex-col items-stretch gap-4 md:flex-row md:justify-evenly mx-auto px-5 py-5">
        <p className="text-sm md:text-base min-w-0">
          Diese Website nutzt Cookies, um bestmögliche Funktionalität bieten zu können.{' '}
        </p>
        <Link
          href="/datenschutz"
          className="underline hover:no-underline font-medium focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded-sm px-1"
          aria-label="Mehr Informationen zum Datenschutz"
        >
          Mehr Informationen
        </Link>
        <Button
          onClick={handleAccept}
          className="px-6 py-2.5 bg-primary-foreground text-primary font-semibold rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary whitespace-nowrap"
          aria-label="Cookies akzeptieren und Banner schließen"
        >
          Akzeptieren
        </Button>
      </div>
    </div>
  )
}
