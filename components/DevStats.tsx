"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { GitHubUserStats } from '@/lib/github'
import ShareButton from './ShareButton'
import { Toaster } from 'sonner'
import SaveButton from './SaveButton'
import ShareableCard from './ShareableCard'
import MobileStats from './MobileStats'
import RevealCard from './RevealCard'

interface DevStatsProps {
  stats: GitHubUserStats
}

export default function DevStats({ stats }: DevStatsProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const hiddenCardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const shareableOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const devCardOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  // If mobile, render just the MobileStats component
  if (isMobile) {
    return (
      <>
        <MobileStats stats={stats} cardRef={cardRef} />
        {/* Hidden ShareableCard for sharing */}
        <div className="absolute -top-[9999px] left-0 opacity-0 pointer-events-none">
          <ShareableCard ref={cardRef} stats={stats} />
        </div>
        <Toaster position="bottom-center" theme="dark" />
      </>
    )
  }

  // Desktop view
  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-gray-900 to-black" ref={containerRef}>
      <div className="hidden md:block">
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center">
          {/* Cards Container */}
          <div className="relative w-full flex justify-center items-center h-screen pt-16">
            {/* Shareable Card */}
            <motion.div
              style={{ 
                opacity: shareableOpacity,
                position: 'absolute',
                zIndex: 10
              }}
              className="-translate-y-20"
            >
              <div className="scale-[0.85] origin-center">
                <ShareableCard ref={cardRef} stats={stats} />
              </div>
            </motion.div>

            {/* Dev Card with Reveal Animation */}
            <motion.div
              style={{ 
                opacity: devCardOpacity,
                position: 'absolute',
                zIndex: 20
              }}
              className="-translate-y-20"
            >
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="backface-hidden"
              >
                <RevealCard stats={stats} />
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              className="fixed bottom-24 left-1/2 -translate-x-1/2"
              initial={{ opacity: 1 }}
              style={{ opacity: shareableOpacity }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-green-400 text-sm font-medium">Scroll Down</span>
                <motion.div
                  className="w-6 h-10 border-2 border-green-400 rounded-full p-1"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  <motion.div
                    className="w-full h-3 bg-green-400 rounded-full"
                    animate={{ y: 20 }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <motion.div 
          style={{ opacity: devCardOpacity }}
          className="fixed bottom-20 left-0 w-full flex justify-center gap-6"
        >
          <SaveButton cardRef={hiddenCardRef} stats={stats} />
          <ShareButton cardRef={hiddenCardRef} />
        </motion.div>
      </div>

      {/* Hidden ShareableCard for sharing */}
      <div className="absolute -top-[9999px] left-0 opacity-0 pointer-events-none">
        <ShareableCard ref={hiddenCardRef} stats={stats} />
      </div>

      <Toaster position="bottom-center" theme="dark" />
    </div>
  )
} 