"use client"

import Link from "next/link"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Categories", href: "#categories" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Find a designer", href: "#designers" },
  { name: "Inspiration", href: "#inspiration" },
  { name: "Studio", href: "#studio" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Mobile menu button (left side) */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex flex-col gap-6 pt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-2 pt-4 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center md:mr-10">
          <span className="text-xl font-bold">DesignContest</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground/80 hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          {/* Phone number - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>+1 (555) 123-4567</span>
          </div>

          {/* Login button */}
          <Button variant="outline" size="sm" className="ml-2">
            Log In
          </Button>
        </div>
      </div>
    </header>
  )
}