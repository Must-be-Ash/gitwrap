"use client"

import { FaDownload } from 'react-icons/fa'
import { toPng } from 'html-to-image'
import { toast } from 'sonner'
import { GitHubUserStats } from '@/lib/github'

interface SaveButtonProps {
  cardRef: React.RefObject<HTMLDivElement>
  stats: GitHubUserStats
}

export default function SaveButton({ cardRef, stats }: SaveButtonProps) {
  const saveImages = async () => {
    if (!cardRef.current) {
      console.log('Missing shareableCard ref')
      return
    }

    try {
      // Save ShareableCard
      const shareableDataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1.0,
        backgroundColor: '#000'
      })
      const shareableLink = document.createElement('a')
      shareableLink.download = `${stats.username}-gitwrap-share.png`
      shareableLink.href = shareableDataUrl
      shareableLink.click()

      // Small delay to prevent browser issues with multiple downloads
      await new Promise(resolve => setTimeout(resolve, 500))

      // Find and save DevCard
      const devCard = document.querySelector('.dev-card') as HTMLElement
      if (devCard) {
        const devCardDataUrl = await toPng(devCard, {
          cacheBust: true,
          quality: 1.0,
          backgroundColor: 'transparent'
        })
        const devCardLink = document.createElement('a')
        devCardLink.download = `${stats.username}-gitwrap-card.png`
        devCardLink.href = devCardDataUrl
        devCardLink.click()

        toast.success('Both cards saved!')
      } else {
        toast.success('Share card saved!')
      }
    } catch (err) {
      console.error('Download error:', err)
      toast.error('Failed to save images')
    }
  }

  return (
    <button
      onClick={saveImages}
      className="flex items-center gap-2 bg-white/5 backdrop-blur-lg 
                 rounded-lg px-6 py-3 border border-green-500/20 text-green-400"
    >
      <FaDownload className="text-lg" />
      <span>Save</span>
    </button>
  )
} 