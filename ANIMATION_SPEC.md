# ANIMATION SPEC — Spotify README Widget (SVG/CRT Retro Style)

## Contexto general
Este es un widget SVG generado server-side en Node.js (Vercel Edge Function).
Se embebe en un GitHub README como `<img src="https://tu-api.vercel.app/api/now-playing"/>`.
GitHub sanitiza SVG: NO permite `<script>`, SÍ permite `<animate>` y `<animateTransform>`.
Toda la lógica de animación es SVG nativo (SMIL). No hay CSS keyframes ni JS en el SVG.

## Stack de animaciones (de atrás hacia adelante por z-order)

### CAPA 1 — Pixel Rain
- Tipo: `<animateTransform type="translate">` + `<animate attributeName="opacity">`
- Qué son: ~18 caracteres monospace cayendo verticalmente.
- Duración: 0.8s–2.4s staggered según índice.

### CAPA 2 — Scanlines
- Tipo: `<rect>` estáticos, líneas horizontales cada 4px.
- Simulan el raster de pantalla CRT.

### CAPA 3 — Vignette
- Tipo: `<radialGradient>` para profundidad de borde.

### CAPA 4 — Border glow
- Rectángulo exterior con filtro de brillo.

### CAPA 5 — Corner decorations (▶ ◀)
- Pulsan opacidad cada 2s.

### CAPA 6 — Album art pulse
- Borde del álbum parpadea cuando `isPlaying=true`.

### CAPA 7 — Status tag blink
- "▶ NOW PLAYING" parpadea cada 1s.

### CAPA 8 — Title scroll
- Si el título es largo, se desplaza horizontalmente.

### CAPA 9 — Progress bar fill
- Avanza 30 segundos (lookahead) para fluidez entre refrescos de caché.

### CAPA 10 — EQ bars bounce
- 10 barras con rebotes orgánicos (duración y retraso escalonados).

### CAPA 11 — Glitch effects
- Flash de opacidad aleatorio y "slices" horizontales que se desplazan 0.1s.

## Reglas de sistema
1. **Nunca uses JS en el SVG** — GitHub lo bloquea.
2. **Dimensiones:** W=420, H=145.
3. **Colores:** Se inyectan dinámicamente desde el generador de temas.
