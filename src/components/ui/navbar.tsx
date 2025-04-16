"use client"

import Link from "next/link"
import { AuthModal } from '@/components/auth-modal'

export function Navbar() {
  return (
    <header className="top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between px-4 w-full mx-auto">
        {/* Left side - Logo */}
        <Link href="/" className="text-xl font-bold">
          Zignative
        </Link>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          <Link href="/contests" className="text-sm font-medium hover:text-primary">
            Explore Contests
          </Link>
          <AuthModal />
        </div>
      </div>
    </header>
  )
}