import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.gitwrap.dev'
    : process.env.NEXT_PUBLIC_APP_URL;

  console.log('Auth callback triggered:', { 
    code: !!code,
    baseUrl,
    fullUrl: request.url,
    env: process.env.NODE_ENV,
    clientId: process.env.GITHUB_CLIENT_ID?.substring(0, 4) // Log first 4 chars for verification
  });

  if (!code) {
    console.error('No code provided in callback');
    return NextResponse.redirect(`${baseUrl}/error?message=No code provided`);
  }

  try {
    console.log('Attempting to exchange code for token...');
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log('Token exchange response:', { 
      success: !!tokenData.access_token,
      error: tokenData.error,
      errorDescription: tokenData.error_description
    });

    if (tokenData.error) {
      throw new Error(`GitHub OAuth Error: ${tokenData.error_description}`);
    }

    // Set the token in a secure HTTP-only cookie
    const response = NextResponse.redirect(`${baseUrl}/dashboard`);
    
    // Log cookie setting attempt
    console.log('Setting cookie with token...');
    
    response.cookies.set('github_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    console.log('Cookie set, redirecting to dashboard...');
    return response;
  } catch (error) {
    console.error('Detailed OAuth error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.redirect(`${baseUrl}/error?message=${encodeURIComponent(error instanceof Error ? error.message : 'Authentication failed')}`);
  }
} 