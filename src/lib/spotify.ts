import { stringify } from 'querystring';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing Spotify credentials');
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

  const data = await response.json();
  if (data.error) {
    throw new Error(`Spotify Token Error: ${data.error_description || data.error}`);
  }
  return data;
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

export async function getRecentlyPlayed() {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_URL, {
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
      const recentRes = await getRecentlyPlayed();
      const recentData = await recentRes.json();
      
      if (recentData.items && recentData.items.length > 0) {
        const lastTrack = recentData.items[0].track;
        return {
          isPlaying: false,
          title: lastTrack.name,
          artist: lastTrack.artists.map((a: any) => a.name).join(', '),
          albumArt: lastTrack.album.images?.[1]?.url || null,
          progress: 0,
          duration: lastTrack.duration_ms || 1,
        };
      }

      return {
        isPlaying: false,
        title: 'Nothing playing',
        artist: '— silencio total —',
        albumArt: null,
        progress: 0,
        duration: 1,
      };
    }

    const data = await response.json();
    if (!data.item) {
       return {
        isPlaying: false,
        title: 'Ad break / Private session',
        artist: 'Spotify',
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
  } catch (error: any) {
    console.error('Error fetching Spotify data:', error.message);
    return {
      isPlaying: false,
      title: 'ERROR',
      artist: error.message || 'Check config',
      albumArt: null,
      progress: 0,
      duration: 1,
    };
  }
}
