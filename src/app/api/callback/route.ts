
import { NextResponse } from 'next/server';
import { stringify } from 'querystring';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return new NextResponse(`Error: ${error}`, { status: 400 });
  }

  if (!code) {
    return new NextResponse('No code provided', { status: 400 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = `${new URL(req.url).origin}/api/callback`;

  const BASIC = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${BASIC}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return new NextResponse(JSON.stringify(data, null, 2), { status: 400 });
    }

    // Return a simple HTML page showing the refresh token
    return new NextResponse(`
      <html>
        <head>
          <title>Token Generated</title>
          <style>
            body { background: #0C0F0B; color: #46F20D; font-family: sans-serif; padding: 40px; }
            .container { border: 2px solid #46F20D; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; }
            h1 { font-style: italic; border-bottom: 1px solid #46F20D33; padding-bottom: 10px; }
            code { background: #000; display: block; padding: 15px; border-radius: 4px; overflow-wrap: break-word; font-family: monospace; border: 1px solid #46F20D; margin: 20px 0; }
            .instructions { font-size: 0.9em; opacity: 0.8; }
            a { color: #C9E085; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Success!</h1>
            <p>Aquí tienes tu <strong>SPOTIFY_REFRESH_TOKEN</strong>:</p>
            <code>${data.refresh_token}</code>
            <p class="instructions">Copia este valor y pégalo en tu archivo <strong>.env</strong>.</p>
            <p><a href="/">Ir al dashboard</a></p>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (err: any) {
    return new NextResponse(`Server error: ${err.message}`, { status: 500 });
  }
}
