"use client"

import { useState } from 'react'
import { FaShare } from 'react-icons/fa'
import { toPng } from 'html-to-image'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface ShareButtonProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

export default function ShareButton({ cardRef }: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAndShare = async () => {
    setIsGenerating(true)
    try {
      if (!cardRef.current) {
        throw new Error('Card element not found')
      }

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2
      })

      if (navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(dataUrl)).blob()
          const file = new File([blob], 'gitwrap.png', { type: 'image/png' })
          const shareData = {
            title: 'My GitWrap 2025',
            text: 'Check out my GitHub year in review!',
            files: [file]
          }
          
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData)
            toast.success('GitWrap shared successfully!')
          } else {
            await copyToClipboard(dataUrl)
          }
        } catch {
          await copyToClipboard(dataUrl)
        }
      } else {
        await copyToClipboard(dataUrl)
      }
    } catch (error) {
      console.error('Error generating image:', error)
      toast.error('Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (dataUrl: string) => {
    try {
      const blob = await (await fetch(dataUrl)).blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      toast.success('GitWrap copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      window.open(dataUrl, '_blank')
      toast.success('GitWrap opened in new tab!')
    }
  }

  return (
    <motion.button
      onClick={generateAndShare}
      disabled={isGenerating}
      className="relative px-6 py-3 bg-black border-2 border-green-500 rounded-lg hover:bg-green-500/10 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-3">
        <FaShare className="text-xl text-green-500" />
        <span className="font-semibold text-green-500">
          {isGenerating ? 'GENERATING...' : 'SHARE'}
        </span>
      </div>
    </motion.button>
  )
} 