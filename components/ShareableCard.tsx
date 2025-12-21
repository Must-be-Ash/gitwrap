"use client"

import { forwardRef } from 'react'
import { FaStar, FaCodeBranch, FaCode, FaBolt, FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import { GitHubUserStats } from '@/lib/github'
import ContributionGraph from './ContributionGraph'

interface ShareableCardProps {
  stats: GitHubUserStats;
}

const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(({ stats }, ref) => {
  return (
    <div 
      ref={ref}
      className="w-[1200px] h-[630px] bg-gradient-to-br from-gray-900 to-black text-white p-6 relative"
    >
      {/* Neon border */}
      <div className="absolute left-4 right-4 bottom-4 top-4 border-l-2 border-r-2 border-b-2 border-green-500"
           style={{ boxShadow: '0 0 20px #00ff00', borderTop: 'none' }} />

      <div className="flex gap-6 h-full items-start pt-8 pr-8">
        {/* Left Column */}
        <div className="w-1/4 pl-4">
          {/* User Info */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-green-500 mb-4"
                 style={{ boxShadow: '0 0 20px #00ff00' }}>
              <Image
                src={stats.avatar_url}
                alt={stats.name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center">{stats.name}</h1>
            <p className="text-xl text-green-400">@{stats.username}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[70%] space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
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
          <div>
            <h3 className="text-xl text-green-400 mb-3">Top Languages</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(stats.languages)
                .slice(0, 4)
                .map(([lang, percentage]) => (
                  <div key={lang} className="bg-white/5 px-4 py-2 rounded-lg border border-green-500/20">
                    <span className="text-lg">{lang}</span>
                    <span className="text-green-400 ml-2">{percentage}%</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Contribution Graph */}
          <div>
            <ContributionGraph contributions={stats.contributions} />
          </div>
        </div>
      </div>

      {/* GitWrap Logo */}
      <div className="absolute bottom-6 right-8 flex items-center space-x-3">
        <FaGithub className="text-3xl text-green-500" />
        <span className="text-xl font-bold text-green-400">GitWrap 2025</span>
      </div>

      {/* CRT scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-green-500/20 animate-scanline" />
      </div>
    </div>
  )
})

ShareableCard.displayName = 'ShareableCard'

export default ShareableCard 