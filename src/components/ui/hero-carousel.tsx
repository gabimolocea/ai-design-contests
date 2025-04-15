'use client'

import { useCallback, useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Circle } from 'lucide-react'
import { useCarousel } from '@/context/carousel-context'
import type { EmblaCarouselType } from 'embla-carousel'

const SLIDES = [
  {
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d2abd662597191.5a9589b09ddf5.jpg',
    titleColor: 'text-blue-600',
    alt: 'Creative logo designs'
  },
  {
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d2abd662597191.5a9589b09ddf5.jpg',
    titleColor: 'text-green-600',
    alt: 'Website design showcase'
  },
  {
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d2abd662597191.5a9589b09ddf5.jpg',
    titleColor: 'text-purple-600',
    alt: 'Branding examples'
  },
  {
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d2abd662597191.5a9589b09ddf5.jpg',
    titleColor: 'text-orange-600',
    alt: 'Packaging designs'
  }
]

interface HeroCarouselProps {
  onColorChange?: (color: string) => void
}

export function HeroCarousel({ onColorChange }: HeroCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { setTitleColor } = useCarousel()
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 10000, stopOnInteraction: false })
  ])

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index)
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    const color = SLIDES[selectedIndex].titleColor
    setTitleColor(color)
    if (onColorChange) {
      onColorChange(color)
    }
  }, [selectedIndex, setTitleColor, onColorChange])

  return (
    <div className="w-full overflow-hidden rounded-xl" ref={emblaRef}>
      <div className="flex">
        {SLIDES.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0">
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            <Circle
              className={`h-3 w-3 transition-colors ${
                selectedIndex === index ? 'fill-primary' : 'fill-muted'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

