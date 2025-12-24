'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrophy, FaMedal, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { CachedContributions } from '@/lib/contributions-cache';

interface LeaderboardResponse {
  users: CachedContributions[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchLeaderboard(page);
  }, [page]);

  const fetchLeaderboard = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leaderboard?page=${pageNum}&limit=${limit}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="text-yellow-400 text-2xl md:text-3xl" />;
      case 2:
        return <FaMedal className="text-gray-300 text-2xl md:text-3xl" />;
      case 3:
        return <FaMedal className="text-amber-600 text-2xl md:text-3xl" />;
      default:
        return <span className="text-lg md:text-xl font-bold text-green-400">#{rank}</span>;
    }
  };

  const getTopLanguages = (languages: { [key: string]: number } | undefined) => {
    if (!languages) return [];
    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Top developers ranked by power level
          </p>
          <Link href="/" className="inline-block mt-4 text-green-400 hover:text-green-300 transition-colors">
            ← Back to Home
          </Link>
        </motion.div>

        {/* Ranking Formula TLDR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 md:mb-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg md:text-xl">⚡</span>
              <h3 className="text-green-400 font-semibold text-sm md:text-base">Power Level Formula:</h3>
            </div>
            <div className="text-xs md:text-sm text-gray-300 flex flex-wrap gap-2 md:gap-3">
              <span><span className="text-yellow-400 font-bold">37%</span> Stars</span>
              <span className="text-gray-600">•</span>
              <span><span className="text-purple-400 font-bold">33%</span> Forks</span>
              <span className="text-gray-600">•</span>
              <span><span className="text-blue-400 font-bold">25%</span> Commits</span>
              <span className="text-gray-600">•</span>
              <span><span className="text-gray-400 font-bold">5%</span> Languages</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 md:mt-3">
            Quality over volume: We favor repos that others star and fork, while still valuing consistent contributions.
          </p>
        </motion.div>

        {/* Leaderboard */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : data && data.users.length > 0 ? (
          <div>
            {data.users.map((user, index) => {
              const rank = (page - 1) * limit + index + 1;
              const topLanguages = getTopLanguages(user.languages);

              return (
                <Link key={user.username} href={`/${user.username}`} className="block mb-6 md:mb-8 last:mb-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-lg p-4 md:p-6 hover:bg-gray-800/70 hover:scale-[1.01] transition-all duration-200 cursor-pointer ${
                      rank <= 3 ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20' : 'border-gray-700 hover:border-green-400/50'
                    }`}
                  >
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 md:w-16 flex justify-center">
                      {getRankIcon(rank)}
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Image
                        src={user.avatar_url}
                        alt={user.username}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-green-400/50 w-12 h-12 md:w-16 md:h-16"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold truncate">
                        {user.name || user.username}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">@{user.username}</p>
                      {user.bio && (
                        <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-1 md:line-clamp-2">
                          {user.bio}
                        </p>
                      )}
                      {topLanguages.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {topLanguages.map((lang) => (
                            <span
                              key={lang}
                              className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-green-400"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stats - Hidden on mobile, shown on tablet+ */}
                    <div className="hidden sm:flex flex-col gap-2 text-right flex-shrink-0">
                      <div className="text-2xl md:text-3xl font-bold text-green-400">
                        {(user.power_level || 0).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">POWER LEVEL</div>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="sm:hidden mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="bg-gray-700/30 rounded p-2">
                      <div className="font-bold text-green-400">{(user.power_level || 0).toLocaleString()}</div>
                      <div className="text-gray-400 mt-1">Power</div>
                    </div>
                    <div className="bg-gray-700/30 rounded p-2">
                      <div className="font-bold text-blue-400">{(user.total_commits || 0).toLocaleString()}</div>
                      <div className="text-gray-400 mt-1">Commits</div>
                    </div>
                    <div className="bg-gray-700/30 rounded p-2">
                      <div className="font-bold text-yellow-400">{(user.total_stars || 0).toLocaleString()}</div>
                      <div className="text-gray-400 mt-1">Stars</div>
                    </div>
                  </div>

                  {/* Desktop Additional Stats */}
                  <div className="hidden md:flex mt-4 gap-6 text-sm border-t border-gray-700 pt-4">
                    <div>
                      <span className="text-gray-400">Commits:</span>{' '}
                      <span className="font-bold text-blue-400">{(user.total_commits || 0).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Stars:</span>{' '}
                      <span className="font-bold text-yellow-400">{(user.total_stars || 0).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Forks:</span>{' '}
                      <span className="font-bold text-purple-400">{(user.total_forks || 0).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Longest Streak:</span>{' '}
                      <span className="font-bold text-orange-400">{user.achievements?.longestStreak || 0} days</span>
                    </div>
                  </div>
                </motion.div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No users found on the leaderboard yet!</p>
          </div>
        )}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 md:mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-sm md:text-base"
            >
              <FaChevronLeft />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="text-sm md:text-base text-gray-400">
              Page <span className="text-green-400 font-bold">{page}</span> of{' '}
              <span className="text-green-400 font-bold">{data.totalPages}</span>
            </div>

            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-sm md:text-base"
            >
              <span className="hidden sm:inline">Next</span>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
