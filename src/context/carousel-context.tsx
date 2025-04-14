'use client'

import { createContext, useContext, useState } from 'react'

type CarouselContextType = {
  titleColor: string
  setTitleColor: (color: string) => void
}

const CarouselContext = createContext<CarouselContextType | undefined>(undefined)

export function CarouselProvider({ children }: { children: React.ReactNode }) {
  const [titleColor, setTitleColor] = useState('text-blue-600')

  return (
    <CarouselContext.Provider value={{ titleColor, setTitleColor }}>
      {children}
    </CarouselContext.Provider>
  )
}

export function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider')
  }
  return context
}