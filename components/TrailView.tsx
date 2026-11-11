"use client";

// Trail page, on the Trailhead model (decision 0006): trail header with points, time left and % done,
// then one card per module (badge, points, completion date, collapsible units), grouped by zone.

import Link from "next/link";
import { useState } from "react";
import { Cap, Loop, Nimbus, Plug, Ward } from "./characters";
import { Arrow, Check, Flag, Lock, Star } from "./icons";
import { ModuleBadge, RankInsignia } from "./badges";
import { MODULES, TRAIL, UNITS, ZONES, getModule, modulesOfZone, type CourseModule, type Zone } from "@/lib/curriculum";
import { unitMinutes, unitTitle } from "@/lib/lessons";
import { MODULE_MAX_POINTS, RANKS, TRAIL_MAX_POINTS } from "@/lib/scoring";
import { useProgress } from "@/lib/progress";

const Mascot = ({ who, size }: { who: Zone["mascot"]; size: number }) =>
  who === "Plug" ? <Plug size={size} /> : who === "Ward" ? <Ward size={size} /> : who === "Cap" ? <Cap size={size} /> : <Loop size={size} />;

const fmt = (n: number) => n.toLocaleString("en-US");
const fmtDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtMinutes = (m: number) => {
  if (m < 60) return `~${m} mins`;
  const h = Math.floor(m / 60);
  return `~${h} ${h === 1 ? "hr" : "hrs"}${m % 60 ? ` ${m % 60} mins` : ""}`;
};

const TOP = RANKS[RANKS.length - 1];

const moduleMinutes = (m: number) => UNITS.reduce((sum, _, u) => sum + unitMinutes(m, u), 0);

function ModuleCard({ mod, color }: { mod: CourseModule; color: string }) {
  const p = useProgress();
  const done = p.isModuleDone(mod.n);
  const isCurrent = mod.n === p.currentModule && !done;
  const locked = p.ready && !done && !isCurrent;
  const [open, setOpen] = useState(false);
  const expanded = open || isCurrent;
  const date = p.badgeDate(mod.n);
  const earned = p.modulePoints(mod.n);
  const firstOpen = UNITS.findIndex((_, u) => !p.isUnitDone(mod.n, u));

  return (
    <article className={`mcard ${locked ? "locked" : ""}`} style={{ borderTopColor: color }}>
      <div className="mhead">
        <ModuleBadge module={mod.n} earned={done} size={96} />
        <div className="grow">
          <div className="row between" style={{ gap: 8, alignItems: "flex-start" }}>
            <span className="eyebrow">Module {mod.n}</span>
            <span className="ptag">{done ? `+${fmt(earned)}` : `+${fmt(MODULE_MAX_POINTS)}`} points</span>
          </div>
          {locked ? (
            <h3 className="mtitle">{mod.title}</h3>
          ) : (
            <h3 className="mtitle"><Link href={`/module/${mod.n}`}>{mod.title}</Link></h3>
          )}
          <p className="msub">{mod.sub}. Badge: <b>{mod.badge.name}</b>.</p>
          <div className="row between" style={{ gap: 8 }}>
            {isCurrent ? (
              <Link href={`/module/${mod.n}`} className="cta gold small">{firstOpen > 0 ? "Resume" : "Start"} <Arrow size={16} /></Link>
            ) : locked ? (
              <span className="status" style={{ color: "var(--muted)", marginTop: 0 }}><Lock />Finish module {p.currentModule} first</span>
            ) : <span />}
            <span className="mmeta">{done && date ? `Completed ${fmtDate(date)}` : fmtMinutes(moduleMinutes(mod.n))}</span>
          </div>
        </div>
      </div>

      {expanded && (
        <ol className="units">
          {UNITS.map((u, i) => {
            const unitDone = p.isUnitDone(mod.n, i);
            const reachable = !locked && (unitDone || i === firstOpen);
            const title = unitTitle(mod.n, i);
            return (
              <li key={u}>
                <div className="grow">
                  {reachable ? <Link href={`/module/${mod.n}?unit=${i}`} className="utitle">{title}</Link> : <span className="utitle off">{title}</span>}
                  <span className="umeta">{u} · {fmtMinutes(unitMinutes(mod.n, i))}{unitDone ? ` · +${p.unitValue(mod.n, i)} points` : ""}</span>
                </div>
                {unitDone ? (
                  <span className="udone" aria-label="Done"><Check size={20} color="#fff" w={3.2} /></span>
                ) : (
                  <span className="utodo" aria-label="Not done yet" />
                )}
              </li>
            );
          })}
        </ol>
      )}
      {!isCurrent && (
        <button type="button" className="toggle" aria-expanded={expanded} onClick={() => setOpen((o) => !o)}>
          {expanded ? "⌃ Hide" : "⌄ Show"} {UNITS.length} units
        </button>
      )}
    </article>
  );
}

export default function TrailView() {
  const p = useProgress();
  const current = getModule(p.currentModule)!;
  const doneCount = p.completedModules.length;
  const unitsDone = MODULES.reduce((n, m) => n + UNITS.filter((_, u) => p.isUnitDone(m.n, u)).length, 0);
  const pct = Math.round((unitsDone / (MODULES.length * UNITS.length)) * 100);
  const minutesLeft = MODULES.reduce((sum, m) => sum + UNITS.reduce((s, _, u) => s + (p.isUnitDone(m.n, u) ? 0 : unitMinutes(m.n, u)), 0), 0);
  const finished = doneCount === MODULES.length;

  return (
    <div className="page">
      <header className="row between" style={{ gap: 16 }}>
        <span className="eyebrow">Your trail</span>
        <div className="row">
          <span className="pill gold"><Star fill="#fff" />{fmt(p.points)} points</span>
          <Link href="/profile" className="pill">Level {p.rank.n} · {p.rank.name}</Link>
        </div>
      </header>

      <section className="trailhead">
        <div className="col">
          <span className="eyebrow" style={{ color: "var(--gold)", letterSpacing: "0.12em" }}>Trail</span>
          <h1>{TRAIL.name}</h1>
          <p className="lead">{TRAIL.desc}</p>
          <div className="row" style={{ gap: 16 }}>
            {!finished && (
              <Link className="cta gold" href={`/module/${current.n}`}>
                {p.points > 0 ? "Resume" : "Start the trail"} <Arrow />
              </Link>
            )}
            <span style={{ fontSize: 15, color: "#d7dbe5" }}>
              {finished ? "Trail complete." : `Next: module ${current.n} · ${current.title}`}
            </span>
          </div>
        </div>
        <div className="side">
          <div className="trailmascot">
            <div className="bubble">{finished ? "You lit the whole trail!" : p.points > 0 ? "I'll light the way." : "Follow my lantern!"}</div>
            <Nimbus size={170} />
          </div>
          <span className="ptag big">+{fmt(TRAIL_MAX_POINTS)} points</span>
          <span className="trailstats">{finished ? "Done" : `${fmtMinutes(minutesLeft)} left`} · {pct}%</span>
          <div className="meter dark" role="progressbar" aria-label="Trail progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><div style={{ width: `${pct}%` }} /></div>
          <span className="trailstats">{doneCount} / {MODULES.length} badges</span>
        </div>
      </section>

      {ZONES.map((zone) => (
        <div className="zonewrap" key={zone.key}>
          <div className="dots" aria-hidden="true" />
          <section className="zoneband" style={{ background: zone.tint }}>
            <Mascot who={zone.mascot} size={96} />
            <div className="grow">
              <span className="eyebrow" style={{ color: "var(--ink)" }}>{zone.range}</span>
              <h2>{zone.name}</h2>
              <span style={{ fontWeight: 700, fontSize: 15, color: zone.color }}>{zone.sub}</span>
              <p className="desc">{zone.desc}</p>
            </div>
            <span className="boss"><Flag />{zone.boss}</span>
          </section>
          {modulesOfZone(zone.key).map((m) => (
            <ModuleCard key={m.n} mod={m} color={zone.color} />
          ))}
        </div>
      ))}

      <div className="zonewrap">
        <div className="dots" aria-hidden="true" />
        <section className="summit">
          <RankInsignia n={TOP.n} name={TOP.name} color={TOP.color} size={150} />
          <div className="col">
            <span className="eyebrow" style={{ color: "var(--ink)", fontSize: 14, letterSpacing: "0.12em" }}>End of the trail · Level {TOP.n}</span>
            <h2>At the finish line, you hold your own adoption plan.</h2>
            <p>Stack choice, cost model, NIST security posture, Crawl-Walk-Run rollout, guardrails and executive KPIs: a complete file ready to present to a committee.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
