# **App Name**: PixelTune Widget

## Core Features:

- Spotify Now Playing Fetcher: Connects to the Spotify API to retrieve the user's currently playing track details (title, artist, album art, playback progress, etc.).
- Dynamic SVG Renderer: Generates an SVG image based on the fetched Spotify data. This SVG serves as the visual representation of the now-playing information for embedding.
- Pixel Art Widget Generator: Utilizes a generative tool to dynamically render a retro/pixel-art themed SVG widget, complete with custom pixel fonts and CRT-like visual effects.
- Animated Playback Visuals: Implements visual animations within the SVG, such as a scrolling song title, dynamic equalizer bars, and an advancing progress bar, to reflect the real-time playback state.
- Vercel Serverless Endpoint: Exposes a Vercel serverless function that efficiently serves the dynamically generated SVG as an image, suitable for embedding in READMEs or other web pages.

## Style Guidelines:

- Primary interactive color: A vibrant CRT green (#46F20D), embodying the classic retro tech aesthetic.
- Background color: A very dark, desaturated greenish-black (#0C0F0B) to emulate a switched-off or low-light retro screen.
- Accent color: A soft, pale yellowish-green (#C9E085) for subtle highlights and secondary information, providing a delicate contrast to the primary green.
- Main labels and prominent text: Custom pixel-art SVG rendered text, consistent with the retro visual theme.
- Body and general content font: 'Space Grotesk' (sans-serif) for its techy, geometric feel, complementing the pixel art aesthetic without literal pixelation.
- Monospace data and timestamps: 'Source Code Pro' (monospace) for a clean, code-like appearance suitable for technical details and consistent with terminal UIs.
- Icons are minimalist and pixelated or text-based (e.g., '🎵', '▶'), maintaining the low-resolution, retro graphical style throughout the widget.
- Layout should be clear and blocky, reminiscent of retro computer interfaces, with distinct sections for album art, song details, and playback controls. Emphasis on defined borders and ample spacing.
- Subtle, non-distracting animations include CRT scanlines, a 'glitch' flicker effect, animated equalizer bars, a smooth-advancing progress bar dot, and a horizontally scrolling song title for longer text, enhancing the dynamic retro feel.