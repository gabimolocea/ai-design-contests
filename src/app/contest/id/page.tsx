import { Navbar } from "@/app/components/ui/navbar"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero section */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Get Custom Designs from Creative Professionals
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Launch a contest and receive dozens of designs to choose from
          </p>
         
        </div>
      </section>
    </div>
  )
}