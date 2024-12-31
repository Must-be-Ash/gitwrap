"use client"

import { FaStar, FaCodeBranch, FaCode, FaBolt, FaGithub, FaDownload, FaShare } from 'react-icons/fa'
import Image from 'next/image'
import { GitHubUserStats } from '@/lib/github'
import { toast } from 'sonner'
import { toPng } from 'html-to-image'
import ContributionGraph from './ContributionGraph'
import RevealCard from './RevealCard'
import { motion } from 'framer-motion'

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
  return (
    <div className="p-4 space-y-6 min-h-screen text-white">
      {/* User Info */}
      <div className="flex items-center space-x-4 pt-4">
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
          {Object.entries(stats.languages)
            .slice(0, 4)
            .map(([lang, percentage]) => (
              <div key={lang} className="bg-white/5 px-3 py-2 rounded-lg border border-green-500/20">
                <span className="text-sm">{lang}</span>
                <span className="text-green-400 ml-2 text-sm">{percentage}%</span>
              </div>
            ))}
        </div>
      </div>

      {/* Contributions */}
      <div className="my-4">
        <h3 className="text-lg text-green-400 mb-3">Contributions</h3>
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-3">
          <ContributionGraph contributions={stats.contributions} isMobile={true} />
        </div>
      </div>

      {/* RevealCard */}
      <div className="flex flex-col items-center gap-4 py-6">
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="backface-hidden scale-[0.80]"
        >
          <RevealCard stats={stats} />
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <MobileActionButton
            icon={FaDownload}
            label="Save"
            onClick={() => {
              if (cardRef.current) {
                toPng(cardRef.current, { cacheBust: true })
                  .then((dataUrl) => {
                    const link = document.createElement('a')
                    link.download = `${stats.username}-gitwrap.png`
                    link.href = dataUrl
                    link.click()
                  })
                  .catch((err) => {
                    console.error(err)
                    toast.error('Failed to download image')
                  })
              }
            }}
          />
          <MobileActionButton
            icon={FaShare}
            label="Share"
            onClick={async () => {
              if (!cardRef.current) return
              
              try {
                const dataUrl = await toPng(cardRef.current, { cacheBust: true })
                const blob = await (await fetch(dataUrl)).blob()
                const file = new File([blob], `${stats.username}-gitwrap.png`, { type: blob.type })
                
                if (navigator.share) {
                  await navigator.share({
                    files: [file],
                    title: 'My GitWrap Stats',
                    text: 'Check out my GitHub stats!'
                  })
                } else {
                  await navigator.clipboard.writeText(window.location.href)
                  toast.success('Link copied to clipboard!')
                }
              } catch (err) {
                console.error(err)
                toast.error('Failed to share')
              }
            }}
          />
        </div>
      </div>

      {/* GitWrap Logo */}
      <div className="flex justify-center items-center space-x-2 py-6">
        <FaGithub className="text-xl text-green-500" />
        <span className="text-base font-bold text-green-400">GitWrap 2024</span>
      </div>
    </div>
  )
} 