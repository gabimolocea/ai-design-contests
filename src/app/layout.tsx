// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CarouselProvider } from '@/context/carousel-context'
import { Navbar } from '@/components/ui/navbar'
// import { Footer } from '@/components/ui/footer' // Optional footer component

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DesignContest - Crowdsource Creative Designs',
  description: 'Get custom designs from our global community of creative professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CarouselProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
         
          </div>
        </CarouselProvider>
      </body>
    </html>
  )
}