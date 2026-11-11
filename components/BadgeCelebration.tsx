"use client";

// Full-screen celebration shown once, right after a module badge is earned:
// the badge pops in at the centre, confetti falls, a congratulation message shows, then it closes itself.

import { useEffect, useState, type CSSProperties } from "react";
import { ModuleBadge } from "./badges";

const DURATION_MS = 4500;
const COLORS = ["#F2B134", "#0E7C7B", "#3B3FA8", "#B84E00", "#0A7D4D", "#E4572E"];

/** Random confetti pieces, computed once per celebration (client only, after a user action). */
const makeConfetti = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.9,
    fall: 2.4 + Math.random() * 1.8,
    drift: (Math.random() - 0.5) * 220,
    spin: (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 720),
    w: 7 + Math.random() * 7,
    round: i % 5 === 0,
    color: COLORS[i % COLORS.length],
  }));

export default function BadgeCelebration({ module, name, onClose }: { module: number; name: string; onClose: () => void }) {
  const [pieces] = useState(() => makeConfetti(90));

  useEffect(() => {
    const t = window.setTimeout(onClose, DURATION_MS);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="celebrate" onClick={onClose} data-testid="badge-celebration">
      <div className="confetti" aria-hidden="true">
        {pieces.map((c, i) => (
          <i
            key={i}
            style={{
              left: `${c.left}%`,
              width: c.w,
              height: c.round ? c.w : c.w * 0.45,
              borderRadius: c.round ? "50%" : 2,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.fall}s`,
              "--drift": `${c.drift}px`,
              "--spin": `${c.spin}deg`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="celebrate-card" role="status" aria-live="assertive">
        <div className="celebrate-badge"><ModuleBadge module={module} earned size={180} /></div>
        <span className="eyebrow">Badge earned</span>
        <strong className="display">Congratulations!</strong>
        <span>You earned the <b>{name}</b> badge.</span>
      </div>
    </div>
  );
}
