import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center px-4 py-8 mx-auto max-w-[1080]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 [&>*:first-child]:order-2 md:[&>*:first-child]:order-1 [&>*:last-child]:order-1 md:[&>*:last-child]:order-2">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left md:order-1">
          
          {/* Title with Gradient */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
  <span className="title-line">Get the perfect<br/></span>
  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    custom design.
  </span>
</h1>
          
          {/* Subtitle */}
          <p className="text-lg text-muted-foreground md:text-xl">
            Set up a contest page, invite designers and recieve thousands of designs. Create a creative contest today.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center md:justify-normal gap-4 pt-4">
          <div className="flex justify-center md:justify-normal gap-4 pt-4">
            <Button size="xl" asChild className="text-lg px-8 py-6">
              <Link href="/create-contest">
                Create your first contest
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          </div>
        </div>

        {/* Right Column - Video */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[620px] max-h-[663px] flex-shrink-[0] overflow-hidden position-relative animate-float">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-fit"
            >
              <source src="https://cdn.lu.ma/landing/phone-light.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </main>
  )
}