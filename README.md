
# PixelTune - Spotify Widget Deployment Guide

Esta es una aplicación de Next.js optimizada para mostrar tu estado de Spotify en tiempo real con un estilo retro.

## Despliegue en Vercel

1. **GitHub**: Sube este repositorio a GitHub.
2. **Importar**: En el panel de Vercel, importa el proyecto.
3. **Environment Variables**: Añade las siguientes variables en Vercel:
   - `SPOTIFY_CLIENT_ID`: Tu Client ID de Spotify.
   - `SPOTIFY_CLIENT_SECRET`: Tu Client Secret de Spotify.
   - `SPOTIFY_REFRESH_TOKEN`: El token generado (usa `/setup` en tu app desplegada para obtenerlo).
   - `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`: El mismo Client ID (necesario para el login).

## Configuración de Spotify

En el [Spotify Developer Dashboard](https://developer.spotify.com/dashboard):
- Añade `https://tu-app.vercel.app/api/callback` a las **Redirect URIs**.

## Uso en GitHub

Una vez desplegado, usa este Markdown en tu README:

```markdown
[![Spotify Now Playing](https://tu-app.vercel.app/api/now-playing)](https://open.spotify.com)
```
