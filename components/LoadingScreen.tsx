"use client"

import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"

interface LoadingScreenProps {
  text?: string;
}

export default function LoadingScreen({ text = "LOADING..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="relative">
        <motion.div
          className="relative p-12 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 rounded-lg border-2 border-green-500"
               style={{ boxShadow: '0 0 20px #00ff00' }} />

          <div className="flex flex-col items-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaGithub className="text-6xl text-green-500" 
                        style={{ filter: 'drop-shadow(0 0 10px #00ff00)' }} />
            </motion.div>

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-green-500 font-bold text-xl tracking-wider"
              style={{ textShadow: '0 0 10px #00ff00' }}
            >
              {text}
            </motion.div>

            <div className="w-48 h-2 bg-black rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ boxShadow: '0 0 10px #00ff00' }}
              />
            </div>
          </div>

          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="w-full h-[2px] bg-green-500/20 animate-scanline" />
          </div>
        </motion.div>

        <div className="absolute inset-0 -z-10 blur-xl">
          <div className="absolute inset-0 bg-green-500/20 animate-pulse" />
        </div>
      </div>
    </div>
  )
} 