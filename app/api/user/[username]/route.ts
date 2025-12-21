import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';
import { getCachedContributions, mergeContributions } from '@/lib/contributions-cache';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // Fetch basic user data (works without token)
    const stats = await fetchGitHubStats(username);

    // Try to get cached contribution data (from when user visited their dashboard)
    const cached = await getCachedContributions(username);
    
    if (cached) {
      // Merge cached contribution data with fresh user data
      const mergedStats = mergeContributions(stats, cached);
      return NextResponse.json(mergedStats);
    }

    // If no cache, return stats without contribution calendar
    // (User info, repos, stars, forks, languages will still be available)
    return NextResponse.json(stats);
  } catch (error) {
    console.error(`Error fetching data for user ${username}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
