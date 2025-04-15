'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel' // Adjust the path as needed
import { Button } from '@/components/ui/button' // Adjust the path as needed
import { ChevronLeft, ChevronRight } from 'lucide-react' // Adjust the path as needed
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card' // Adjust the path as needed
import { useEffect, useState } from 'react'
// Mock data for services
const SERVICES = [
  {
    icon: "🛠️",
    title: "Service 1",
    description: "Description for service 1",
  },
  {
    icon: "🎨",
    title: "Service 2",
    description: "Description for service 2",
  },
  {
    icon: "🚀",
    title: "Service 3",
    description: "Description for service 3",
  },
  {
    icon: "🚀",
    title: "Service 4",
    description: "Description for service 3",
  }
];

export function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', dragFree: true })
  const [isInitialized, setIsInitialized] = useState(false)


 // Monitor when emblaApi is ready
 useEffect(() => {
    if (emblaApi) {
      setIsInitialized(true)
    }
  }, [emblaApi])

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full"
      ref={emblaRef}
    >
      <CarouselContent>
        {SERVICES.map((service, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <CardTitle>{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!isInitialized} // Disable button if emblaApi is not ready
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!isInitialized} // Disable button if emblaApi is not ready
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Carousel>
  )
}