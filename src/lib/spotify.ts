import { stringify } from 'querystring';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export async function getAccessToken() {
  console.log('[Spotify] Solicitando nuevo access token...');
  
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    const missing = [];
    if (!CLIENT_ID) missing.push('CLIENT_ID');
    if (!CLIENT_SECRET) missing.push('CLIENT_SECRET');
    if (!REFRESH_TOKEN) missing.push('REFRESH_TOKEN');
    throw new Error(`Missing: ${missing.join(', ')}`);
  }

  try {
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
      console.error('[Spotify] Error al refrescar token:', data.error_description || data.error);
      throw new Error(`Auth Error: ${data.error}`);
    }
    
    return data;
  } catch (err: any) {
    console.error('[Spotify] Fallo crítico en getAccessToken:', err.message);
    throw err;
  }
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

    // 204 significa que no hay nada reproduciéndose actualmente
    if (response.status === 204) {
      console.log('[Spotify] Nada sonando ahora mismo. Buscando última canción...');
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
        title: 'Shhh... Silence',
        artist: 'Nothing recently played',
        albumArt: null,
        progress: 0,
        duration: 1,
      };
    }

    if (response.status > 400) {
      const errText = await response.text();
      console.error('[Spotify] Error de API Status:', response.status, errText);
      throw new Error(`API Error ${response.status}`);
    }

    const data = await response.json();

    if (!data.item) {
       return {
        isPlaying: false,
        title: 'Spotify Inactive',
        artist: 'Ad or Private Session',
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
    console.error('[Spotify] Error en fetchNowPlayingData:', error.message);
    return {
      isPlaying: false,
      title: 'CONFIG ERROR',
      artist: error.message || 'Check logs',
      albumArt: null,
      progress: 0,
      duration: 1,
    };
  }
}
