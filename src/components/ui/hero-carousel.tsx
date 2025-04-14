'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useState } from 'react'

export function HeroCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const plugin = Autoplay({ delay: 10000, stopOnInteraction: false })

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  return (
    <Carousel 
      plugins={[plugin]}
      onSelect={handleSelect}
    >
      <CarouselContent>
        {/* Your carousel items */}
      </CarouselContent>
    </Carousel>
  )
}