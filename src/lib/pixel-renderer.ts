export const PIXEL_CHARS: Record<string, number[][]> = {
  " ": [],
  "A": [[1,0],[0,1],[2,1],[0,2],[1,2],[2,2],[0,3],[2,3]],
  "B": [[0,0],[1,0],[0,1],[2,1],[0,2],[1,2],[0,3],[1,3],[2,2]],
  "C": [[1,0],[2,0],[0,1],[0,2],[1,3],[2,3]],
  "D": [[0,0],[1,0],[2,1],[0,1],[2,2],[0,2],[0,3],[1,3]],
  "E": [[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[0,3],[1,3],[2,3]],
  "F": [[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[0,3]],
  "G": [[1,0],[2,0],[0,1],[0,2],[1,2],[2,2],[2,3],[1,3],[0,3]],
  "H": [[0,0],[2,0],[0,1],[1,1],[2,1],[0,2],[2,2],[0,3],[2,3]],
  "I": [[0,0],[1,0],[2,0],[1,1],[1,2],[0,3],[1,3],[2,3]],
  "J": [[1,0],[2,0],[2,1],[2,2],[0,2],[1,3]],
  "K": [[0,0],[2,0],[0,1],[1,1],[0,2],[1,2],[0,3],[2,3]],
  "L": [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3]],
  "M": [[0,0],[2,0],[0,1],[1,1],[2,1],[0,2],[2,2],[0,3],[2,3]],
  "N": [[0,0],[2,0],[0,1],[1,1],[2,1],[0,2],[2,2],[0,3],[2,3]],
  "O": [[1,0],[0,1],[2,1],[0,2],[2,2],[1,3]],
  "P": [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[0,3]],
  "Q": [[1,0],[0,1],[2,1],[0,2],[2,2],[1,3],[2,3]],
  "R": [[0,0],[1,0],[0,1],[2,1],[0,2],[1,2],[0,3],[2,3]],
  "S": [[1,0],[2,0],[0,1],[1,2],[2,2],[0,3],[1,3]],
  "T": [[0,0],[1,0],[2,0],[1,1],[1,2],[1,3]],
  "U": [[0,0],[2,0],[0,1],[2,1],[0,2],[2,2],[1,3]],
  "V": [[0,0],[2,0],[0,1],[2,1],[1,2],[1,3]],
  "W": [[0,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2],[0,3],[2,3]],
  "X": [[0,0],[2,0],[1,1],[0,2],[2,2],[0,3],[2,3]],
  "Y": [[0,0],[2,0],[1,1],[1,2],[1,3]],
  "Z": [[0,0],[1,0],[2,0],[2,1],[1,2],[0,3],[1,3],[2,3]],
  "0": [[1,0],[0,1],[2,1],[0,2],[2,2],[1,3]],
  "1": [[1,0],[0,1],[1,1],[1,2],[0,3],[1,3],[2,3]],
  "2": [[0,0],[1,0],[2,1],[1,2],[0,3],[1,3],[2,3]],
  "3": [[0,0],[1,0],[2,1],[1,2],[2,2],[0,3],[1,3]],
  "4": [[0,0],[2,0],[0,1],[2,1],[1,2],[2,2],[2,3]],
  "5": [[0,0],[1,0],[2,0],[0,1],[1,2],[2,2],[0,3],[1,3]],
  "6": [[1,0],[0,1],[0,2],[1,2],[2,2],[0,3],[1,3]],
  "7": [[0,0],[1,0],[2,0],[2,1],[1,2],[1,3]],
  "8": [[1,0],[0,1],[2,1],[1,2],[0,2],[0,3],[1,3],[2,2],[2,3]],
  "9": [[0,0],[1,0],[2,0],[0,1],[2,1],[1,2],[2,2],[2,3]],
  "-": [[0,2],[1,2],[2,2]],
  ".": [[1,3]],
  "!": [[1,0],[1,1],[1,2],[1,3]],
  "?": [[1,0],[2,1],[1,2],[1,3]],
  "'": [[1,0],[1,1]],
  "&": [[1,0],[0,1],[2,1],[1,2],[0,2],[0,3],[1,3],[2,3]],
  ":": [[1,1],[1,3]],
  "/": [[2,0],[1,1],[0,2],[0,3]],
  "+": [[1,0],[0,1],[1,1],[2,1],[1,2]],
  "default": [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[2,2],[0,3],[1,3],[2,3]],
};

export function pixelChar(ch: string, x: number, y: number, color: string = "#46F20D") {
  const pixels = PIXEL_CHARS[ch.toUpperCase()] || PIXEL_CHARS["default"];
  return pixels.map(([px, py]) =>
    `<rect x="${x + px * 2}" y="${y + py * 2}" width="2" height="2" fill="${color}"/>`
  ).join("");
}

export function pixelText(text: string, x: number, y: number, color: string) {
  return text.split("").map((ch, i) => pixelChar(ch, x + i * 8, y, color)).join("");
}

export type SVGTheme = {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  scanlinePattern: 'dense' | 'subtle' | 'none';
  glitchEffect: 'flicker' | 'static' | 'wave' | 'none';
};

export function generateSVG(
  { title, artist, albumArt, isPlaying, progress, duration }: any,
  theme: SVGTheme = {
    primaryColor: '#00ff41',
    backgroundColor: '#001800',
    accentColor: '#00cc33',
    scanlinePattern: 'subtle',
    glitchEffect: 'flicker'
  }
) {
  const W = 420, H = 145;
  const prog = duration > 0 ? Math.min(progress / duration, 1) : 0;
  const BAR_X = 108;
  const BAR_W = 290;
  const progW = Math.floor(prog * BAR_W);
  const dotX = BAR_X + progW;

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const truncate = (str: string, n: number) => str.length > n ? str.slice(0, n - 1) + "…" : str;
  const titleStr = truncate(title, 26);
  const artistStr = truncate(artist, 32);

  // ── SCANLINES ────────────────────────────────────────────────────────────────
  const scanStep = theme.scanlinePattern === 'dense' ? 2 : 4;
  const scanlines = theme.scanlinePattern !== 'none' 
    ? Array.from({ length: Math.ceil(H / scanStep) }, (_, i) =>
        `<rect x="0" y="${i * scanStep}" width="${W}" height="1" fill="rgba(0,0,0,0.18)"/>`
      ).join("")
    : "";

  // ── PIXEL RAIN ───────────────────────────────────────────────────────────────
  const rain = Array.from({ length: 18 }, (_, i) => {
    const x = 4 + i * 23;
    const dur = (0.8 + (i % 7) * 0.23).toFixed(2);
    const startY = (i * 37) % H;
    const chars = ["0","1","█","▒","░","◆","✦"];
    const ch = chars[i % chars.length];
    return `
      <text x="${x}" y="${startY}" font-family="monospace" font-size="7" fill="${theme.primaryColor}" opacity="0.10">
        ${ch}
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,${H - startY}; 0,${-startY}"
          dur="${dur}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.10;0.18;0.06;0.10"
          dur="${dur}s" repeatCount="indefinite"/>
      </text>`;
  }).join("");

  // ── EQ BARS ──────────────────────────────────────────────────────────────────
  const eqBars = Array.from({ length: 10 }, (_, i) => {
    const x = BAR_X + i * 11;
    const minH = 3;
    const maxH = isPlaying ? 14 + (i % 5) * 5 : 3;
    const midH = Math.floor((minH + maxH) / 2);
    const dur = (0.35 + (i * 0.06)).toFixed(2);
    const delay = (i * 0.04).toFixed(2);
    return `
      <rect x="${x}" y="${H - 22 - minH}" width="7" height="${minH}" fill="${theme.primaryColor}" rx="1" opacity="0.9">
        ${isPlaying ? `
        <animate attributeName="height"
          values="${minH};${maxH};${midH};${maxH};${minH}"
          dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        <animate attributeName="y"
          values="${H-22-minH};${H-22-maxH};${H-22-midH};${H-22-maxH};${H-22-minH}"
          dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>` : ""}
      </rect>`;
  }).join("");

  // ── GLITCH EFFECT ────────────────────────────────────────────────────────────
  let glitchFlash = "";
  if (theme.glitchEffect !== 'none') {
    glitchFlash = `
      <rect width="${W}" height="${H}" fill="${theme.primaryColor}" opacity="0" rx="8">
        <animate attributeName="opacity"
          values="0;0;0;0;0.04;0;0;0;0.02;0;0"
          dur="4.3s" repeatCount="indefinite"/>
      </rect>`;
  }

  const glitchSlices = (isPlaying && theme.glitchEffect === 'wave') ? `
    <rect x="0" y="38" width="${W}" height="8" fill="none" filter="url(#glitchBlur)">
      <animate attributeName="x" values="0;4;0;-4;0" dur="6s" repeatCount="indefinite" keyTimes="0;0.01;0.02;0.03;1"/>
      <animate attributeName="opacity" values="0;1;0;0;0" dur="6s" repeatCount="indefinite" keyTimes="0;0.01;0.02;0.03;1"/>
    </rect>
    <rect x="0" y="62" width="${W}" height="5" fill="none" filter="url(#glitchBlur)">
      <animate attributeName="x" values="0;-6;0;6;0" dur="7.5s" repeatCount="indefinite" keyTimes="0;0.008;0.016;0.024;1"/>
      <animate attributeName="opacity" values="0;1;0;0;0" dur="7.5s" repeatCount="indefinite" keyTimes="0;0.008;0.016;0.024;1"/>
    </rect>` : "";

  const corner = (x: number, y: number, ch: string) =>
    `<text x="${x}" y="${y}" fill="${theme.primaryColor}" font-size="7" opacity="0.4" font-family="monospace">${ch}
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
    </text>`;

  const overflowPx = Math.max(0, title.length - 22) * 7;
  const titleScroll = overflowPx > 0 && isPlaying
    ? `<animateTransform attributeName="transform" type="translate"
        values="0,0; -${overflowPx},0; -${overflowPx},0; 0,0"
        dur="5s" repeatCount="indefinite"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glitchBlur">
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
    </filter>
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="60%" stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.55)"/>
    </radialGradient>
    <clipPath id="albumClip">
      <rect x="10" y="12" width="82" height="82" rx="5"/>
    </clipPath>
    <clipPath id="titleClip">
      <rect x="${BAR_X}" y="24" width="${BAR_W}" height="20"/>
    </clipPath>
    <clipPath id="artistClip">
      <rect x="${BAR_X}" y="44" width="${BAR_W}" height="14"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${theme.backgroundColor}" rx="8"/>
  ${rain}
  ${scanlines}
  <rect width="${W}" height="${H}" fill="url(#vignette)" rx="8"/>
  <rect width="${W}" height="${H}" fill="none" stroke="${theme.primaryColor}" stroke-width="1.5" rx="8" opacity="0.7" filter="url(#glow)"/>

  <!-- Corners -->
  ${corner(5, 10, "▶")} ${corner(W - 12, 10, "◀")}
  ${corner(5, H - 3, "◀")} ${corner(W - 12, H - 3, "▶")}

  <!-- Album Art -->
  <g>
    ${albumArt
      ? `<image href="${albumArt}" x="10" y="12" width="82" height="82" clip-path="url(#albumClip)" preserveAspectRatio="xMidYMid slice" image-rendering="pixelated"/>`
      : `<rect x="10" y="12" width="82" height="82" rx="5" fill="${theme.backgroundColor}" stroke="${theme.primaryColor}" stroke-width="2"/>
         <text x="51" y="60" fill="${theme.primaryColor}" font-size="28" text-anchor="middle">♪</text>`
    }
    <rect x="10" y="12" width="82" height="82" rx="5" fill="none" stroke="${theme.primaryColor}" stroke-width="2">
      ${isPlaying ? `<animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>` : `<rect opacity="0.3"/>`}
    </rect>
  </g>

  <!-- Status Tag -->
  <g>
    ${isPlaying
      ? `<text x="${BAR_X}" y="22" font-family="monospace" font-size="9" fill="${theme.primaryColor}" filter="url(#glow)">▶ NOW PLAYING
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
        </text>`
      : `<text x="${BAR_X}" y="22" font-family="monospace" font-size="9" fill="#555">■ LAST PLAYED</text>`
    }
  </g>

  <!-- Song Title -->
  <g clip-path="url(#titleClip)">
    <text x="${BAR_X}" y="37" font-family="monospace" font-size="14" font-weight="bold" fill="${theme.primaryColor}" filter="url(#glow)">
      ${titleStr}
      ${titleScroll}
    </text>
  </g>

  <!-- Artist -->
  <g clip-path="url(#artistClip)">
    <text x="${BAR_X}" y="53" font-family="monospace" font-size="11" fill="${theme.accentColor}" opacity="0.85">${artistStr}</text>
  </g>

  <!-- Progress Bar -->
  <rect x="${BAR_X}" y="62" width="${BAR_W}" height="5" rx="2.5" fill="${theme.backgroundColor}" stroke="${theme.primaryColor}" stroke-width="0.8" opacity="0.6"/>
  <rect x="${BAR_X}" y="62" width="${progW}" height="5" rx="2.5" fill="${theme.primaryColor}" filter="url(#softGlow)">
    ${isPlaying ? `<animate attributeName="width" from="${progW}" to="${Math.min(progW + 29, BAR_W)}" dur="30s" fill="freeze"/>` : ""}
  </rect>

  <circle cx="${dotX}" cy="64.5" r="5" fill="${theme.primaryColor}" filter="url(#glow)">
    ${isPlaying ? `
    <animate attributeName="r" values="4.5;5.5;4.5" dur="1s" repeatCount="indefinite"/>
    <animate attributeName="cx" from="${dotX}" to="${Math.min(dotX + 29, BAR_X + BAR_W)}" dur="30s" fill="freeze"/>` : ""}
  </circle>

  <!-- Timestamps -->
  <text x="${BAR_X}" y="78" font-family="monospace" font-size="9" fill="${theme.accentColor}">${fmt(progress)}</text>
  <text x="${BAR_X + BAR_W}" y="78" font-family="monospace" font-size="9" fill="${theme.accentColor}" text-anchor="end">${fmt(duration)}</text>

  <!-- EQ bars -->
  ${eqBars}

  <!-- Spotify badge -->
  <circle cx="${W - 18}" cy="${H - 16}" r="10" fill="#1DB954" opacity="0.95"/>
  <text x="${W - 18}" y="${H - 12}" font-size="10" text-anchor="middle" fill="white">♪</text>

  <!-- Glitch effects -->
  ${glitchFlash}
  ${glitchSlices}
</svg>`;
}
