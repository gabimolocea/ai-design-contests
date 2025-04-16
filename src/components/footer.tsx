import Link from 'next/link'
import { Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="container flex max-w-[1080px] px-4 mx-auto">
        <div className="w-full py-8">
       {/* First Row - Menu Items and Social Icons */}
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Primary Menu - Left-aligned on all screens */}
          <div className="flex flex-wrap justify-start gap-6">
            {[
              { name: "What's New", href: "#" },
              { name: "Discover", href: "/discover" }, // Updated link
              { name: "Pricing", href: "#" },
              { name: "Help", href: "#" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Icons - Left-aligned on mobile, right-aligned on desktop */}
          <div className="flex gap-6 self-start md:self-auto">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Second Row - Secondary Menu */}
        <div className="mt-6 flex flex-wrap justify-start gap-4">
          {['Terms', 'Privacy', 'Security'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </div>
        </div>
    </footer>
  )
}