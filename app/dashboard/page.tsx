'use client'

import { useEffect, useState } from 'react'
import { GitHubUserStats } from '@/lib/github'
import DevStats from '@/components/DevStats'
import LoadingScreen from '@/components/LoadingScreen'

export default function Dashboard() {
  const [userData, setUserData] = useState<GitHubUserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadGitHubData() {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadGitHubData()
  }, [])

  if (loading) {
    return <LoadingScreen text="LOADING DASHBOARD..." />
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  return userData ? <DevStats stats={userData} /> : null
} 