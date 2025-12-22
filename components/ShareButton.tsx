"use client"

import { FaShare } from 'react-icons/fa'

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
    <button
      onClick={shareToTwitter}
      className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-lg 
                 rounded-lg px-4 py-2 border border-green-500/20 text-green-400 text-sm"
    >
      <FaShare className="text-base" />
      <span>Share</span>
    </button>
  )
} 