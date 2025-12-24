'use client'

import { motion } from "framer-motion"
import TextPathDraw from "@/components/TextPathDraw"
import { FaGithub } from "react-icons/fa"
import { getGitHubAuthUrl } from "@/lib/auth"
import Snowfall from "@/components/Snowfall"

export default function LandingPage() {
  const handleLogin = () => {
    const authUrl = getGitHubAuthUrl();
    console.log('Redirecting to GitHub:', authUrl);
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center gap-2 px-4 py-8 md:px-8 -mt-20 md:-mt-32">
        {/* Text Animation */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-[600px] md:max-w-[800px]">
            <TextPathDraw />
          </div>
        </div>

        {/* Login Button - Below text, centered */}
        <div className="w-full flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[320px]"
          >
            <button 
              onClick={handleLogin} 
              className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <FaGithub className="text-xl text-gray-900 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-base tracking-wide">
                Continue with GitHub
              </span>
            </button>
          </motion.div>
        </div>
      </div>
      <Snowfall />
    </div>
  )
}

