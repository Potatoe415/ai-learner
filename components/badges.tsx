// Module badges and rank insignia (presentational SVG). One badge per module, keyed by module number.

const GLYPHS: Record<number, { d: string; fill: string; stroke: string }> = {
  0: { d: "M38 32L58 44L38 56Z", fill: "#1A2233", stroke: "#fff" },
  1: { d: "M58 44a14 14 0 1 1-4.5-10.3M55 27v8h-8", fill: "#0E7C7B", stroke: "#fff" },
  2: { d: "M30 44a14 14 0 1 0 28 0a14 14 0 1 0-28 0M38 44a6 6 0 1 0 12 0a6 6 0 1 0-12 0", fill: "#0E7C7B", stroke: "#fff" },
  3: { d: "M36 32h-6v24h6M52 32h6v24h-6M40 44h8", fill: "#0E7C7B", stroke: "#fff" },
  4: { d: "M38 32v10M50 32v10M34 42h20v4a10 10 0 0 1-20 0ZM44 58v6", fill: "#0E7C7B", stroke: "#fff" },
  5: { d: "M30 42a10 10 0 1 0 20 0a10 10 0 1 0-20 0M47 49L58 60", fill: "#3B3FA8", stroke: "#fff" },
  6: { d: "M44 30L57 35V45C57 53 51 58 44 61C37 58 31 53 31 45V35ZM38 45l4 4 8-9", fill: "#3B3FA8", stroke: "#fff" },
  7: { d: "M32 36a12 5 0 1 0 24 0a12 5 0 1 0-24 0M32 36v16a12 5 0 0 0 24 0V36M32 44a12 5 0 0 0 24 0", fill: "#3B3FA8", stroke: "#fff" },
  8: { d: "M36 60V30M36 31h20l-5 6 5 6H36", fill: "#B84E00", stroke: "#fff" },
  9: { d: "M34 58V32h12M44 44h16M54 38l6 6-6 6", fill: "#B84E00", stroke: "#fff" },
  10: { d: "M44 29l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5L44 53l-9.4 5 1.8-10.5-7.7-7.5 10.6-1.5Z", fill: "#F2B134", stroke: "#1A2233" },
};

/** Hexagonal module badge; greyed until earned, with a green seal once earned (as on Trailhead). */
export function ModuleBadge({ module, earned, size = 92 }: { module: number; earned: boolean; size?: number }) {
  const g = GLYPHS[module];
  return (
    <span className="mbadge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88" aria-hidden="true">
        <path d="M44 4L80 24V62L44 84L8 62V24Z" fill={earned ? g.fill : "#E3DED1"} stroke={earned ? "#1A2233" : "#8A92A6"} strokeWidth="3.5" strokeLinejoin="round" />
        <path d={g.d} fill="none" stroke={earned ? g.stroke : "#8A92A6"} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {earned && (
        <svg className="seal" width={Math.round(size * 0.36)} height={Math.round(size * 0.36)} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#0A7D4D" stroke="#fff" strokeWidth="2" />
          <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

const starPath = (cx: number, cy: number, r: number) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.45;
    return `${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts.join("L")}Z`;
};

/** Hexagonal rank insignia: the level number, one star per level, the rank name on a ribbon. */
export function RankInsignia({ n, name, color, size = 180 }: { n: number; name: string; color: string; size?: number }) {
  const stars = Array.from({ length: n }, (_, i) => 100 + (i - (n - 1) / 2) * 26);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={`Level ${n}: ${name}`}>
      <path d="M100 8L184 54V146L100 192L16 146V54Z" fill={color} stroke="#1A2233" strokeWidth="6" strokeLinejoin="round" />
      <path d="M100 26L168 64V136L100 174L32 136V64Z" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
      <text x="100" y="78" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="40" fill="#fff">{n}</text>
      {stars.map((x) => <path key={x} d={starPath(x, 104, 12)} fill="#F2B134" stroke="#1A2233" strokeWidth="2" strokeLinejoin="round" />)}
      <rect x="22" y="122" width="156" height="34" rx="6" fill="#1A2233" />
      <text x="100" y="145" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize={name.length > 12 ? 15 : 19} letterSpacing="1.5" fill="#fff">{name.toUpperCase()}</text>
    </svg>
  );
}
