"use client";

// Home page: a header, then one tile per trail with the learner's progress on it.
// Only one real trail exists; the ghost tile announces the next one (subject not decided yet).

import Link from "next/link";
import { Nimbus } from "./characters";
import { Arrow, Star } from "./icons";
import { MODULES, TRAIL } from "@/lib/curriculum";
import { TRAIL_MAX_POINTS } from "@/lib/scoring";
import { useProgress } from "@/lib/progress";

const fmt = (n: number) => n.toLocaleString("en-US");

function TrailTile() {
  const p = useProgress();
  const unitsDone = MODULES.reduce((n, m) => n + m.units.filter((_, u) => p.isUnitDone(m.n, u)).length, 0);
  const unitsTotal = MODULES.reduce((n, m) => n + m.units.length, 0);
  const pct = Math.round((unitsDone / unitsTotal) * 100);
  const finished = p.completedModules.length === MODULES.length;
  const action = finished ? "Review" : unitsDone > 0 ? "Resume" : "Start";

  return (
    <Link href="/trail" className="tile" aria-label={`${TRAIL.name}: ${pct}% done. ${action} the trail`}>
      <div className="tile-top">
        <Nimbus size={88} />
        <span className="ptag">+{fmt(TRAIL_MAX_POINTS)} points</span>
      </div>
      <span className="eyebrow">Trail · {MODULES.length} modules</span>
      <h2>{TRAIL.name}</h2>
      <p>{TRAIL.desc}</p>
      <div className="tile-progress">
        <div className="row between" style={{ gap: 8, fontSize: 14, fontWeight: 700 }}>
          <span>{pct}% done</span>
          <span style={{ color: "var(--muted)" }}>{p.completedModules.length} / {MODULES.length} badges</span>
        </div>
        <div className="meter" role="progressbar" aria-label="Trail progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><div style={{ width: `${pct}%` }} /></div>
        <span className="tile-points"><Star size={14} /> {fmt(p.points)} points earned</span>
      </div>
      <span className="cta gold small" aria-hidden="true">{action} <Arrow size={16} /></span>
    </Link>
  );
}

function GhostTile() {
  return (
    <article className="tile ghost" aria-label="Next trail: coming soon">
      <div className="tile-top">
        <span className="tile-ghost-ic" aria-hidden="true">?</span>
        <span className="ptag">Coming soon</span>
      </div>
      <span className="eyebrow">Trail</span>
      <h2>A new trail is on its way</h2>
      <p>Its subject is not decided yet.</p>
    </article>
  );
}

export default function HomeView() {
  return (
    <div className="page">
      <header className="home-head">
        <span className="eyebrow">Agent Path</span>
        <h1 className="display">Pick a trail</h1>
        <p>Each trail is a set of modules: short lessons, real post-mortems, hands-on labs and a deliverable for your own company.</p>
      </header>
      <section className="tiles" aria-label="Trails">
        <TrailTile />
        <GhostTile />
      </section>
    </div>
  );
}
