import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';
import { getCachedContributions } from '@/lib/contributions-cache';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    console.log(`Fetching stats for public user: ${username}`);

    // First, try to get cached data from MongoDB (from when user visited their dashboard)
    const cached = await getCachedContributions(username);
    console.log(`Cache lookup for ${username}:`, cached ? 'Found' : 'Not found');

    if (cached) {
      // Return cached data directly - no need to hit GitHub API
      console.log(`Serving ${username} from cache`);
      return NextResponse.json({
        name: cached.name || username,
        username: cached.username || username,
        avatar_url: cached.avatar_url || '',
        bio: cached.bio || '',
        power_level: cached.power_level || 0,
        total_commits: cached.total_commits || 0,
        total_stars: cached.total_stars || 0,
        total_forks: cached.total_forks || 0,
        languages: cached.languages || {},
        achievements: cached.achievements || {
          mostActiveDay: { date: '', count: 0 },
          longestStreak: 0,
          topRepository: { name: '', commits: 0 }
        },
        contributions: cached.contributions || [],
      });
    }

    // If no cache, fetch from GitHub API (fallback - rare case)
    console.log(`No cache for ${username}, fetching from GitHub API`);
    const stats = await fetchGitHubStats(username);
    console.log(`Successfully fetched stats for ${username} from GitHub`, {
      has_languages: Object.keys(stats.languages || {}).length > 0,
      power_level: stats.power_level,
      total_commits: stats.total_commits
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error(`Error fetching data for user ${username}:`, error);
    console.error('Full error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
