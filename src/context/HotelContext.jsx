import { createContext, useContext, useState } from 'react'
import { initialHotel, brandDNA as initialBrandDNA } from '../data/hotel'

const HotelContext = createContext(null)

export function HotelProvider({ children }) {
  const [hotel, setHotel] = useState(initialHotel)
  const [brand, setBrand] = useState(initialBrandDNA)

  return (
    <HotelContext.Provider value={{ hotel, setHotel, brand, setBrand }}>
      {children}
    </HotelContext.Provider>
  )
}

export function useHotel() {
  const ctx = useContext(HotelContext)
  if (!ctx) throw new Error('useHotel must be used within HotelProvider')
  return ctx
}
