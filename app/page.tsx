'use client'

import { motion } from "framer-motion"
import TextPathDraw from "@/components/TextPathDraw"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-8 md:px-8">
        {/* Left side - Text Animation */}
        <div className="w-full md:w-2/3 flex justify-center">
          <TextPathDraw />
        </div>

        {/* Right side - Arcade Button */}
        <div className="w-full md:w-1/3 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="relative group w-full max-w-[300px]"
          >
            <Link href="/dashboard" className="block">
              {/* Neon border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              {/* Button content */}
              <div className="relative flex items-center justify-center space-x-4 bg-black px-6 py-4 md:px-8 md:py-6 rounded-lg leading-none">
                <FaGithub className="text-2xl md:text-4xl text-green-500 group-hover:animate-spin" />
                <span className="font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">
                  LOGIN WITH GITHUB
                </span>
              </div>

              {/* Arcade frame effect */}
              <div 
                className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none"
                style={{ boxShadow: '0 0 15px #00ff00' }} 
              />
            </Link>

            {/* CRT scan line effect */}
            <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
              <div className="w-full h-[2px] bg-green-500/20 animate-scanline" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

