"use client"

import { FaStar, FaCodeBranch, FaCode, FaBolt, FaDownload, FaShare } from 'react-icons/fa'
import Image from 'next/image'
import { GitHubUserStats } from '@/lib/github'
import { toast } from 'sonner'
import { toPng } from 'html-to-image'
import ContributionGraph from './ContributionGraph'
import RevealCard from './RevealCard'
import { motion } from 'framer-motion'
import { useRef } from 'react'

interface MobileStatsProps {
  stats: GitHubUserStats
  cardRef: React.RefObject<HTMLDivElement>
}

const MobileActionButton = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-lg 
               rounded-lg px-4 py-2 border border-green-500/20 text-green-400 text-sm"
  >
    <Icon className="text-base" />
    <span>{label}</span>
  </button>
)

export default function MobileStats({ stats, cardRef }: MobileStatsProps) {
  const devCardRef = useRef<HTMLDivElement>(null)

  const saveImages = async () => {
    if (!cardRef.current || !devCardRef.current) {
      console.log('Missing refs:', { shareableCard: !cardRef.current, devCard: !devCardRef.current })
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

      // Save DevCard
      const devCardDataUrl = await toPng(devCardRef.current, {
        cacheBust: true,
        quality: 1.0,
        backgroundColor: 'transparent'
      })
      const devCardLink = document.createElement('a')
      devCardLink.download = `${stats.username}-gitwrap-card.png`
      devCardLink.href = devCardDataUrl
      devCardLink.click()

      toast.success('Both cards saved!')
    } catch (err) {
      console.error('Download error:', err)
      toast.error('Failed to save images')
    }
  }

  const shareImages = async () => {
    if (!cardRef.current || !devCardRef.current) {
      console.log('Missing refs:', { shareableCard: !cardRef.current, devCard: !devCardRef.current })
      return
    }

    try {
      const shareableDataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1.0,
        backgroundColor: '#000'
      })
      const devCardDataUrl = await toPng(devCardRef.current, {
        cacheBust: true,
        quality: 1.0,
        backgroundColor: 'transparent'
      })

      const shareableBlob = await (await fetch(shareableDataUrl)).blob()
      const devCardBlob = await (await fetch(devCardDataUrl)).blob()

      const files = [
        new File([shareableBlob], `${stats.username}-gitwrap-share.png`, { type: shareableBlob.type }),
        new File([devCardBlob], `${stats.username}-gitwrap-card.png`, { type: devCardBlob.type })
      ]

      if (navigator.share) {
        await navigator.share({
          files,
          title: 'My GitWrap Stats',
          text: 'Check out my GitHub stats!'
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
      }
    } catch (err) {
      console.error('Share error:', err)
      toast.error('Failed to share')
    }
  }

  return (
    <div className="p-4 pt-12 space-y-6 min-h-screen text-white">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <a href="/" className="text-green-400 hover:text-green-300 transition-colors text-sm">
          ← Home
        </a>
        <a href="/leaderboard" className="text-green-400 hover:text-green-300 transition-colors text-sm flex items-center gap-1">
          <span>Leaderboard</span>
          <span>🏆</span>
        </a>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-green-500"
             style={{ boxShadow: '0 0 10px #00ff00' }}>
          <Image
            src={stats.avatar_url}
            alt={stats.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{stats.name}</h1>
          <p className="text-lg text-green-400">@{stats.username}</p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3 my-4">
        {/* Power Level */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-green-500/20">
          <div className="flex items-center text-green-400 mb-2">
            <FaBolt className="text-xl mr-2" />
            <h2 className="text-lg font-semibold">Power Level</h2>
          </div>
          <p className="text-3xl font-bold">{stats.power_level}</p>
        </div>

        {/* Commits */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-green-500/20">
          <div className="flex items-center text-green-400 mb-2">
            <FaCode className="text-xl mr-2" />
            <h2 className="text-lg font-semibold">Commits</h2>
          </div>
          <p className="text-3xl font-bold">{stats.total_commits}</p>
        </div>

        {/* Stars */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-green-500/20">
          <div className="flex items-center text-green-400 mb-2">
            <FaStar className="text-xl mr-2" />
            <h2 className="text-lg font-semibold">Stars</h2>
          </div>
          <p className="text-3xl font-bold">{stats.total_stars}</p>
        </div>

        {/* Forks */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-green-500/20">
          <div className="flex items-center text-green-400 mb-2">
            <FaCodeBranch className="text-xl mr-2" />
            <h2 className="text-lg font-semibold">Forks</h2>
          </div>
          <p className="text-3xl font-bold">{stats.total_forks}</p>
        </div>
      </div>

      {/* Languages */}
      <div className="my-4">
        <h3 className="text-lg text-green-400 mb-3">Top Languages</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.languages && Object.entries(stats.languages)
            .slice(0, 4)
            .map(([lang, percentage]) => (
              <div key={lang} className="bg-white/5 px-3 py-2 rounded-lg border border-green-500/20">
                <span className="text-sm">{lang}</span>
                <span className="text-green-400 ml-2 text-sm">{percentage}%</span>
              </div>
            ))}
          {!stats.languages && (
            <div className="col-span-2 text-gray-400 text-sm">No language data available</div>
          )}
        </div>
      </div>

      {/* Contributions */}
      <div className="my-4">
        <h3 className="text-lg text-green-400 mb-3">Contributions</h3>
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 overflow-x-auto">
          <ContributionGraph contributions={stats.contributions} isMobile={true} />
        </div>
      </div>

      {/* RevealCard */}
      <div className="flex flex-col items-center gap-4 py-6">
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="backface-hidden scale-[0.80] relative z-10"
        >
          <div ref={devCardRef}>
            <RevealCard stats={stats} />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3 relative z-20">
          <MobileActionButton
            icon={FaDownload}
            label="Save"
            onClick={saveImages}
          />
          <MobileActionButton
            icon={FaShare}
            label="Share"
            onClick={shareImages}
          />
        </div>
      </div>
    </div>
  )
} 