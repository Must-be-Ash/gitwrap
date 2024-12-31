"use client"

import { useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import { toPng } from 'html-to-image'
import { motion } from 'framer-motion'
import { GitHubUserStats } from '@/lib/github'
import { toast } from 'sonner'

interface SaveButtonProps {
  stats: GitHubUserStats;
  cardRef: React.RefObject<HTMLDivElement>;
}

export default function SaveButton({ stats, cardRef }: SaveButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAndSave = async () => {
    setIsGenerating(true)
    try {
      if (!cardRef.current) {
        throw new Error('Card element not found')
      }

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2
      })

      const link = document.createElement('a')
      link.download = `gitwrap-${stats.username}.png`
      link.href = dataUrl
      link.click()

      toast.success('GitWrap saved successfully!')
    } catch (error) {
      console.error('Error generating image:', error)
      toast.error('Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.button
      onClick={generateAndSave}
      disabled={isGenerating}
      className="relative px-6 py-3 bg-black border-2 border-green-500 rounded-lg hover:bg-green-500/10 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-3">
        <FaDownload className="text-xl text-green-500" />
        <span className="font-semibold text-green-500">
          {isGenerating ? 'GENERATING...' : 'SAVE'}
        </span>
      </div>
    </motion.button>
  )
} 