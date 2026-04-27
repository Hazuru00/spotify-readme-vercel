import { NextResponse } from 'next/server';
import { fetchNowPlayingData } from '@/lib/spotify';
import { generateSVG } from '@/lib/pixel-renderer';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Basic theme customization via query params
  const primary = searchParams.get('primary') || '#46F20D';
  const bg = searchParams.get('bg') || '#0C0F0B';
  const accent = searchParams.get('accent') || '#C9E085';
  const scanlines = (searchParams.get('scanlines') as 'dense' | 'subtle' | 'none') || 'subtle';
  const glitch = (searchParams.get('glitch') as 'flicker' | 'static' | 'wave' | 'none') || 'flicker';

  const data = await fetchNowPlayingData();
  
  const theme = {
    primaryColor: primary.startsWith('#') ? primary : `#${primary}`,
    backgroundColor: bg.startsWith('#') ? bg : `#${bg}`,
    accentColor: accent.startsWith('#') ? accent : `#${accent}`,
    scanlinePattern: scanlines,
    glitchEffect: glitch,
  };

  const svg = generateSVG(data, theme);

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 's-maxage=30, stale-while-revalidate=15',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
