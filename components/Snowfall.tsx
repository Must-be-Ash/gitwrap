'use client'

import { useMemo } from 'react'

interface Snowflake {
  id: number
  left: number
  animationDuration: number
  size: number
  delay: number
  initialTop: number
}

export default function Snowfall() {
  // Generate snowflakes immediately using useMemo
  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (%)
      animationDuration: 5 + Math.random() * 10, // 5-15 seconds
      size: 2 + Math.random() * 4, // 2-6px
      delay: 0, // No delay - all start immediately
      // Distribute initial positions from -120vh to 0vh so some are already falling and visible
      initialTop: -120 + (Math.random() * 120),
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-80 animate-snowfall"
          style={{
            left: `${flake.left}%`,
            top: `${flake.initialTop}vh`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
