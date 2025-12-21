"use client"

import { FaShare } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface ShareButtonProps {
  username: string;
}

export default function ShareButton({ username }: ShareButtonProps) {
  const shareToTwitter = () => {
    const text = encodeURIComponent('My 2025 Github Wrap')
    const url = encodeURIComponent(`https://www.gitwrap.dev/${username}`)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`

    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  return (
    <motion.button
      onClick={shareToTwitter}
      className="relative px-6 py-3 bg-black border-2 border-green-500 rounded-lg hover:bg-green-500/10 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-3">
        <FaShare className="text-xl text-green-500" />
        <span className="font-semibold text-green-500">
          SHARE
        </span>
      </div>
    </motion.button>
  )
} 