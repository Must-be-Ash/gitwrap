import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // Fetch stats without authentication for public data
    // Note: This will have limited contribution data without a token
    const stats = await fetchGitHubStats(username);

    return NextResponse.json(stats);
  } catch (error) {
    console.error(`Error fetching data for user ${username}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
