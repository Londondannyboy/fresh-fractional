import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function getHumeToken() {
  // Try both prefixed and non-prefixed versions
  const apiKey = (process.env.NEXT_PUBLIC_HUME_API_KEY || process.env.HUME_API_KEY || "").trim().replace(/^["']|["']$/g, '');
  const secretKey = (process.env.HUME_SECRET_KEY || "").trim().replace(/^["']|["']$/g, '');

  console.log('[Hume Token] Request received');
  console.log('[Hume Token] Credentials check:', { 
    hasApiKey: !!apiKey, 
    apiKeyPrefix: apiKey ? apiKey.substring(0, 4) : 'none',
    hasSecretKey: !!secretKey,
    secretKeyPrefix: secretKey ? secretKey.substring(0, 4) : 'none'
  });

  if (!apiKey || !secretKey) {
    console.error('[Hume Token] Missing credentials');
    return NextResponse.json(
      { error: 'Hume API credentials not configured', details: 'Missing API key or Secret key in environment variables' },
      { status: 500 }
    );
  }

  try {
    // Get access token from Hume
    console.log('[Hume Token] Fetching token from Hume API...');
    
    const authString = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
    
    const response = await fetch('https://api.hume.ai/oauth2-cc/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Hume Token] Hume API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to get access token from Hume', status: response.status, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.access_token) {
      console.error('[Hume Token] No access_token in response:', data);
      return NextResponse.json(
        { error: 'No access token in response', details: data },
        { status: 500 }
      );
    }

    console.log('[Hume Token] Success, token received');
    
    // Return both formats for compatibility with different frontend implementations
    return NextResponse.json({
      token: data.access_token,
      accessToken: data.access_token,
      expires_in: data.expires_in
    });
  } catch (error: any) {
    console.error('[Hume Token] Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return getHumeToken()
}

export async function POST() {
  return getHumeToken()
}
