import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.gitwrap.dev'
    : process.env.NEXT_PUBLIC_APP_URL;

  console.log('Auth callback triggered:', { 
    code: !!code,
    error,
    error_description,
    baseUrl,
    fullUrl: request.url,
    env: process.env.NODE_ENV,
    clientId: process.env.GITHUB_CLIENT_ID?.substring(0, 4)
  });

  // Handle GitHub OAuth errors
  if (error) {
    console.error('GitHub OAuth Error:', { error, error_description });
    return NextResponse.redirect(
      `${baseUrl}/error?message=${encodeURIComponent(error_description || error)}`
    );
  }

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
        redirect_uri: `${baseUrl}/api/auth/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorText
      });
      throw new Error(`Token exchange failed: ${tokenResponse.status}`);
    }

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
    
    console.log('Setting cookie with token...');
    
    // Try setting the cookie with more permissive options first
    response.cookies.set('github_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      domain: process.env.NODE_ENV === 'production' ? 'gitwrap.dev' : undefined
    });

    console.log('Cookie set, redirecting to dashboard...');
    return response;
  } catch (error) {
    console.error('Detailed OAuth error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.redirect(
      `${baseUrl}/error?message=${encodeURIComponent(
        error instanceof Error ? error.message : 'Authentication failed'
      )}`
    );
  }
} 