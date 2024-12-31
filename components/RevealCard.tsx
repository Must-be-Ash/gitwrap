import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import DevCard from './DevCard'
import type { GitHubUserStats } from '@/lib/github'
import type { Variants } from 'framer-motion'

interface RevealCardProps {
  stats: GitHubUserStats
}

export default function RevealCard({ stats }: RevealCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)

  const handleCardClick = () => {
    if (!hasAnimated || isRevealing) return
    
    if (isFlipped) {
      // If card is flipped, just flip it back immediately
      setIsFlipped(false)
    } else {
      // If card is not flipped, play reveal animation then flip
      setIsRevealing(true)
      setTimeout(() => {
        setIsFlipped(true)
        setIsRevealing(false)
      }, 1500)
    }
  }

  const backVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 1,
        times: [0, 0.6, 1],
        ease: "easeOut",
      }
    },
    revealing: {
      scale: [1, 1.1, 1.1, 1.1, 0.9, 1.1, 1],
      rotate: [0, -5, 5, -5, 5, -5, 0],
      boxShadow: [
        "0 0 0px rgba(123, 31, 162, 0)",
        "0 0 20px rgba(123, 31, 162, 0.5)",
        "0 0 40px rgba(123, 31, 162, 0.8)",
        "0 0 60px rgba(123, 31, 162, 1)",
        "0 0 40px rgba(123, 31, 162, 0.8)",
        "0 0 20px rgba(123, 31, 162, 0.5)",
        "0 0 0px rgba(123, 31, 162, 0)",
      ],
      transition: {
        duration: 1.5,
        times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
        ease: "easeInOut",
      }
    }
  }

  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 0.5, 0.8, 0.3],
      scale: [1, 1.5, 2, 1.5],
      transition: {
        duration: 1.5,
        times: [0, 0.3, 0.6, 1],
        ease: "easeInOut",
      }
    },
    revealing: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1.5, 2.5, 1.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      }
    }
  }

  const iconVariants: Variants = {
    hidden: {
      rotateY: 0,
      scale: 1,
      opacity: 1
    },
    visible: {
      rotateY: [0, 360],
      scale: 1,
      opacity: 1,
      transition: { 
        rotateY: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      }
    },
    revealing: {
      rotateY: 360,
      scale: [1, 1.5, 0],
      opacity: [1, 1, 0],
      transition: { 
        duration: 0.5, 
        times: [0, 0.7, 1],
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="relative pointer-events-none"
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setHasAnimated(true)}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-75 blur-3xl pointer-events-none"
          variants={glowVariants}
          animate={isRevealing ? "revealing" : "visible"}
        />
        
        {/* Card Container */}
        <div 
          className="relative [perspective:1000px] cursor-pointer pointer-events-auto"
          onClick={handleCardClick}
        >
          {/* Card Flipper */}
          <motion.div
            className="relative w-72 h-96 [transform-style:preserve-3d] transition-all duration-700"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
          >
            {/* Back of Card (GitWrap) */}
            <motion.div 
              className="absolute w-full h-full backface-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: 'hidden' }}
              variants={backVariants}
              animate={isRevealing ? "revealing" : "visible"}
            >
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate={isRevealing ? "revealing" : "visible"}
              >
                <FaGithub className="text-6xl text-white mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold text-green-400 [text-shadow:0_0_10px_#00ff00]">
                GitWrap
              </h2>
              <p className="text-xl font-semibold text-gray-400 mt-2">2024</p>
              <motion.p 
                className="text-sm text-gray-500 mt-8 text-center"
                animate={{
                  opacity: [0.5, 1],
                  transition: { 
                    duration: 1, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }
                }}
              >
                Click to reveal your developer card
              </motion.p>
            </motion.div>

            {/* Front of Card (Dev Stats) */}
            <div 
              className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <DevCard stats={stats} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 