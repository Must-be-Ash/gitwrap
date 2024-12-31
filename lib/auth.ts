const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

export function getGitHubAuthUrl() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.gitwrap.dev'
    : process.env.NEXT_PUBLIC_APP_URL;

  console.log('Generating GitHub Auth URL with base:', baseUrl);

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/auth/callback`,
    scope: 'read:user repo read:org',
    state: Math.random().toString(36).substring(7),
  });

  const authUrl = `${GITHUB_OAUTH_URL}?${params.toString()}`;
  console.log('Generated auth URL:', authUrl);
  return authUrl;
} 