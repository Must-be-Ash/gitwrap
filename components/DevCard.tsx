"use client"

import { FaStar, FaCodeBranch, FaCode, FaBolt } from 'react-icons/fa'
import { 
  SiJavascript, 
  SiPython, 
  SiRuby, 
  SiCplusplus, 
  SiGo, 
  SiRust, 
  SiTypescript, 
  SiHtml5,
  SiPhp,
  SiCss3,
  SiCsharp,
  SiSwift,
  SiKotlin,
  SiVuedotjs,
  SiMysql
} from 'react-icons/si'
import { DiJava } from 'react-icons/di'
import Image from 'next/image'
import { GitHubUserStats } from '@/lib/github'

interface DevCardProps {
  stats: GitHubUserStats
}

const languageIcons: { [key: string]: JSX.Element } = {
  JavaScript: <SiJavascript className="text-yellow-400 text-2xl" />,
  TypeScript: <SiTypescript className="text-blue-400 text-2xl" />,
  Python: <SiPython className="text-blue-500 text-2xl" />,
  Ruby: <SiRuby className="text-red-600 text-2xl" />,
  Java: <DiJava className="text-orange-600 text-2xl" />,
  'C++': <SiCplusplus className="text-pink-600 text-2xl" />,
  Go: <SiGo className="text-cyan-600 text-2xl" />,
  Rust: <SiRust className="text-orange-700 text-2xl" />,
  HTML: <SiHtml5 className="text-orange-500 text-2xl" />,
  PHP: <SiPhp className="text-indigo-400 text-2xl" />,
  CSS: <SiCss3 className="text-blue-500 text-2xl" />,
  'C#': <SiCsharp className="text-purple-500 text-2xl" />,
  Swift: <SiSwift className="text-orange-400 text-2xl" />,
  Kotlin: <SiKotlin className="text-purple-400 text-2xl" />,
  Vue: <SiVuedotjs className="text-green-400 text-2xl" />,
  SQL: <SiMysql className="text-blue-400 text-2xl" />,
}

export default function DevCard({ stats }: DevCardProps) {
  const sortedLanguages = stats.languages
    ? Object.entries(stats.languages).sort((a, b) => b[1] - a[1]).slice(0, 3)
    : []

  return (
    <div className="w-72 h-96 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-xl p-4 dev-card">
      {/* Stats Section */}
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-3">
          <span className="flex items-center text-yellow-300">
            <FaStar className="mr-1" /> {stats.total_stars}
          </span>
          <span className="flex items-center text-green-300">
            <FaCodeBranch className="mr-1" /> {stats.total_forks}
          </span>
          <span className="flex items-center text-blue-300">
            <FaCode className="mr-1" /> {stats.total_commits}
          </span>
        </div>
        <div className="flex items-center text-yellow-300 font-bold">
          <FaBolt className="mr-1" /> {stats.power_level}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1 my-4 mt-12">
        <Image 
          src={stats.avatar_url} 
          alt={stats.name} 
          width={96} 
          height={96} 
          className="rounded-full border-4 border-white"
        />
        <h2 className="text-xl font-bold text-white">{stats.name}</h2>
        <p className="text-sm text-center text-white">@{stats.username}</p>
      </div>
      
      {/* Languages Section */}
      <div className="w-full mt-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Top Languages</h3>
        <div className="flex justify-around">
          {sortedLanguages.map(([lang, value]) => (
            <div key={lang} className="flex flex-col items-center">
              {languageIcons[lang] || <span className="text-white text-2xl">?</span>}
              <span className="text-xs text-white mt-1">{lang}</span>
              <span className="text-xs text-white">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

