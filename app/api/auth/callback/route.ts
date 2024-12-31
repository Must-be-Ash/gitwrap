import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.gitwrap.dev'
    : process.env.NEXT_PUBLIC_APP_URL;

  console.log('Auth callback triggered:', { code: !!code, baseUrl });

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/error?message=No code provided`);
  }

  try {
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
    console.log('Token response:', { success: !!tokenData.access_token });

    if (tokenData.error) {
      console.error('Token error:', tokenData);
      throw new Error(tokenData.error_description);
    }

    // Set the token in a secure HTTP-only cookie
    const response = NextResponse.redirect(`${baseUrl}/dashboard`);
    response.cookies.set('github_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(`${baseUrl}/error?message=Authentication failed`);
  }
} 