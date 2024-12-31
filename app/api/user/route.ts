import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchGitHubStats } from '@/lib/github';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('github_token');

  console.log('Cookie check:', { hasToken: !!token?.value });

  if (!token?.value) {
    console.error('No GitHub token found');
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // First get the username
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/vnd.github.v3+json'
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('User API Error:', errorText);
      throw new Error(`GitHub API Error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    console.log('User data fetched:', { username: userData.login });
    
    if (!userData.login) {
      console.error('Invalid user data:', userData);
      throw new Error('Invalid user data received');
    }

    // Then fetch the stats using the token
    const stats = await fetchGitHubStats(userData.login, token.value);
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user data' }, 
      { status: 500 }
    );
  }
} 