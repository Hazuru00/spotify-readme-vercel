
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

    return new NextResponse(`
      <html>
        <head>
          <title>Token Generado</title>
          <style>
            body { background: #0C0F0B; color: #46F20D; font-family: sans-serif; padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
            .container { border: 2px solid #46F20D; padding: 30px; border-radius: 8px; max-width: 600px; width: 100%; box-shadow: 0 0 20px rgba(70, 242, 13, 0.2); }
            h1 { font-style: italic; border-bottom: 1px solid #46F20D33; padding-bottom: 10px; margin-top: 0; }
            code { background: #000; display: block; padding: 15px; border-radius: 4px; overflow-wrap: break-word; font-family: monospace; border: 1px solid #46F20D; margin: 20px 0; font-size: 1.1em; }
            .instructions { font-size: 0.9em; opacity: 0.8; margin-bottom: 20px; }
            a { color: #C9E085; text-decoration: none; font-weight: bold; border: 1px solid #C9E085; padding: 8px 16px; border-radius: 4px; transition: all 0.2s; }
            a:hover { background: #C9E085; color: #0C0F0B; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>¡Token Generado!</h1>
            <p>Copia tu <strong>SPOTIFY_REFRESH_TOKEN</strong>:</p>
            <code>${data.refresh_token}</code>
            <p class="instructions">Guarda este valor en las variables de entorno de tu proyecto (Vercel o .env).</p>
            <div style="margin-top: 30px;"><a href="/">Volver al Dashboard</a></div>
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
