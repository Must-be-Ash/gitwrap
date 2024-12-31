const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

export function getGitHubAuthUrl() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.gitwrap.dev'
    : process.env.NEXT_PUBLIC_APP_URL;

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/auth/callback`,
    scope: 'read:user repo read:org',
  });

  return `${GITHUB_OAUTH_URL}?${params.toString()}`;
} 