import { stringify } from 'querystring';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing Spotify credentials in environment variables.');
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: stringify({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
    cache: 'no-store',
  });

  return response.json();
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
}

export type SpotifyNowPlayingData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  progress: number;
  duration: number;
};

export async function fetchNowPlayingData(): Promise<SpotifyNowPlayingData> {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return {
        isPlaying: false,
        title: 'Nothing playing',
        artist: '—',
        albumArt: null,
        progress: 0,
        duration: 1,
      };
    }

    const data = await response.json();
    if (!data.item) {
       return {
        isPlaying: false,
        title: 'Nothing playing',
        artist: '—',
        albumArt: null,
        progress: 0,
        duration: 1,
      };
    }

    return {
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(', '),
      albumArt: data.item.album.images?.[1]?.url || null,
      progress: data.progress_ms || 0,
      duration: data.item.duration_ms || 1,
    };
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return {
      isPlaying: false,
      title: 'Error fetching',
      artist: 'Check logs',
      albumArt: null,
      progress: 0,
      duration: 1,
    };
  }
}
