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
    primaryColor: '#46F20D',
    backgroundColor: '#0C0F0B',
    accentColor: '#C9E085',
    scanlinePattern: 'subtle',
    glitchEffect: 'flicker'
  }
) {
  const W = 400, H = 130;
  const prog = duration > 0 ? Math.min(progress / duration, 1) : 0;
  const progW = Math.floor(prog * 288);

  // Scanline pattern
  let scanlines = "";
  if (theme.scanlinePattern !== 'none') {
    const step = theme.scanlinePattern === 'dense' ? 2 : 4;
    scanlines = Array.from({ length: Math.floor(H / step) }, (_, i) =>
      `<rect x="0" y="${i * step}" width="${W}" height="1" fill="rgba(0,0,0,0.15)"/>`
    ).join("");
  }

  // Bar EQ animation (8 bars)
  const bars = Array.from({ length: 12 }, (_, i) => {
    const h = 4 + (i % 3) * 4;
    const animDur = (0.4 + (i * 0.05)).toFixed(2);
    const maxH = isPlaying ? 25 + (i % 4) * 8 : 4;
    return `
      <rect x="${100 + i * 10}" y="${H - 18}" width="6" height="${h}" fill="${theme.primaryColor}" rx="1">
        ${isPlaying ? `<animate attributeName="height" values="${h};${maxH};${h}" dur="${animDur}s" repeatCount="indefinite"/>
        <animate attributeName="y" values="${H-18-h+h};${H-18-maxH+h};${H-18-h+h}" dur="${animDur}s" repeatCount="indefinite"/>` : ""}
      </rect>`;
  }).join("");

  const truncate = (str: string, n: number) => str.length > n ? str.slice(0, n - 1) + "…" : str;
  const titleShort = truncate(title, 24);
  const artistShort = truncate(artist, 32);

  const titleScroll = title.length > 24
    ? `<animateTransform attributeName="transform" type="translate" values="0,0;-${title.length * 4},0;0,0" dur="${title.length * 0.2}s" repeatCount="indefinite"/>`
    : "";

  let glitch = "";
  if (theme.glitchEffect === 'flicker') {
    glitch = `<animate attributeName="opacity" values="0;0;0;0.05;0;0;0;0.03;0" dur="3s" repeatCount="indefinite"/>`;
  } else if (theme.glitchEffect === 'static') {
     glitch = `<animate attributeName="opacity" values="0;0.02;0.05;0.01;0.04;0.02" dur="0.2s" repeatCount="indefinite"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="albumClip">
      <rect x="10" y="10" width="80" height="80" rx="4"/>
    </clipPath>
    <clipPath id="titleClip">
      <rect x="100" y="24" width="285" height="18"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${theme.backgroundColor}" rx="8"/>
  <rect width="${W}" height="${H}" fill="none" stroke="${theme.primaryColor}" stroke-width="2" rx="8" opacity="0.4" filter="url(#glow)"/>
  ${scanlines}

  <!-- Album Art -->
  ${albumArt
    ? `<image href="${albumArt}" x="10" y="10" width="80" height="80" clip-path="url(#albumClip)" preserveAspectRatio="xMidYMid slice"/>
       <rect x="10" y="10" width="80" height="80" rx="4" fill="none" stroke="${theme.primaryColor}" stroke-width="1.5" opacity="0.6"/>`
    : `<rect x="10" y="10" width="80" height="80" rx="4" fill="#000" stroke="${theme.primaryColor}" stroke-width="1.5"/>
       <text x="50" y="58" fill="${theme.primaryColor}" font-size="28" text-anchor="middle" filter="url(#glow)">🎵</text>`
  }

  <!-- Status Label -->
  <g transform="translate(100, 10)">
    ${pixelText(isPlaying ? "NOW PLAYING" : "LAST PLAYED", 0, 0, isPlaying ? theme.primaryColor : theme.accentColor)}
  </g>

  <!-- Blinking Cursor -->
  ${isPlaying ? `<rect x="188" y="10" width="2" height="8" fill="${theme.primaryColor}">
    <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
  </rect>` : ""}

  <!-- Title -->
  <g clip-path="url(#titleClip)">
    <text x="100" y="38" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="bold" fill="${theme.primaryColor}" filter="url(#glow)">
      ${titleShort}
      ${titleScroll}
    </text>
  </g>

  <!-- Artist -->
  <text x="100" y="54" font-family="'Space Grotesk', sans-serif" font-size="11" fill="${theme.accentColor}" opacity="0.9">
    ${artistShort}
  </text>

  <!-- Progress Bar Container -->
  <rect x="100" y="66" width="288" height="6" rx="3" fill="#000" stroke="${theme.primaryColor}" stroke-width="1" opacity="0.3"/>
  
  <!-- Animated Progress -->
  <rect x="100" y="66" width="${progW}" height="6" rx="3" fill="${theme.primaryColor}" filter="url(#glow)">
    ${isPlaying ? `<animate attributeName="width" from="${progW}" to="${Math.min(progW + 20, 288)}" dur="15s" repeatCount="indefinite"/>` : ""}
  </rect>

  <!-- Progress Dot -->
  <circle cx="${100 + progW}" cy="69" r="4" fill="${theme.primaryColor}" filter="url(#glow)">
    ${isPlaying ? `<animate attributeName="cx" from="${100 + progW}" to="${Math.min(100 + progW + 20, 388)}" dur="15s" repeatCount="indefinite"/>` : ""}
  </circle>

  <!-- Timestamps -->
  <text x="100" y="85" font-family="'Source Code Pro', monospace" font-size="9" fill="${theme.primaryColor}" opacity="0.8">
    ${Math.floor(progress/60000)}:${String(Math.floor((progress%60000)/1000)).padStart(2,"0")}
  </text>
  <text x="388" y="85" font-family="'Source Code Pro', monospace" font-size="9" fill="${theme.primaryColor}" text-anchor="end" opacity="0.8">
    ${Math.floor(duration/60000)}:${String(Math.floor((duration%60000)/1000)).padStart(2,"0")}
  </text>

  <!-- EQ Bars -->
  ${bars}

  <!-- Glitch Effect Layer -->
  <rect width="${W}" height="${H}" fill="${theme.primaryColor}" opacity="0" rx="8">
    ${glitch}
  </rect>
</svg>`;
}
