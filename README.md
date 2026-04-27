
# PixelTune - Spotify Widget Deployment Guide

Esta es una aplicación de Next.js optimizada para mostrar tu estado de Spotify en tiempo real con un estilo retro.

## Despliegue desde la Terminal (Vercel CLI)

Si tienes instalada la [Vercel CLI](https://vercel.com/download), sigue estos pasos:

1. **Login**:
   ```bash
   vercel login
   ```

2. **Inicializar Proyecto**:
   ```bash
   vercel
   ```
   *(Responde 'Yes' a todo, usa la configuración por defecto de Next.js)*

3. **Configurar Variables de Entorno**:
   ```bash
   vercel env add SPOTIFY_CLIENT_ID 86c6ca9576174804b34f6a0a3d53e92b
   vercel env add SPOTIFY_CLIENT_SECRET d723f3c782e042f1a4a215805d3c710f
   vercel env add NEXT_PUBLIC_SPOTIFY_CLIENT_ID 86c6ca9576174804b34f6a0a3d53e92b
   ```

4. **Desplegar a Producción**:
   ```bash
   vercel --prod
   ```

5. **Obtener el Refresh Token**:
   Una vez desplegado, ve a `https://tu-app.vercel.app/setup` para generar tu token y añádelo con:
   ```bash
   vercel env add SPOTIFY_REFRESH_TOKEN tu_token_generado
   vercel --prod
   ```

## Configuración de Spotify

En el [Spotify Developer Dashboard](https://developer.spotify.com/dashboard):
- Añade `https://tu-app.vercel.app/api/callback` a las **Redirect URIs**.

## Uso en GitHub

```markdown
[![Spotify Now Playing](https://tu-app.vercel.app/api/now-playing)](https://open.spotify.com)
```
