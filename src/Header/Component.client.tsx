'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu, SearchIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { HeaderMobileNav } from './Nav/mobile'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {


  return (
    <header
      className="sticky z-20 top-0 backdrop-blur-sm bg-background/90 h-16"
    >
      <div className="container pb-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Logo />
            </Link>

            <HeaderNav
              data={data}
              className="hidden font-heading font-semibold lg:flex items-center gap-6"
            />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/search">
              <span className="sr-only">Search</span>
              <SearchIcon className="w-5 ghost hover:text-primary" />
            </Link>
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card">
                <SheetHeader className="sr-only">
                  <SheetTitle>Mobile Navigation Menu</SheetTitle>
                </SheetHeader>
                <HeaderMobileNav data={data} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
