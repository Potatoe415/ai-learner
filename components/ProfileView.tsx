"use client";

// Profile page, on the Trailhead model (decision 0006): rank insignia, badges / points / trails,
// what is missing for the next rank, the six ranks, the badge cabinet and the deliverables.

import Link from "next/link";
import { Loop } from "./characters";
import { Arrow, Check, DocIcon, Lock } from "./icons";
import { ModuleBadge, RankInsignia } from "./badges";
import { DELIVERABLES, MODULES } from "@/lib/curriculum";
import { RANKS } from "@/lib/scoring";
import { useProgress } from "@/lib/progress";

const fmt = (n: number) => n.toLocaleString("en-US");
const fmtDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function ProfileView() {
  const p = useProgress();
  const badges = p.completedModules.length;
  const next = p.nextRank;
  const needBadges = next ? Math.max(0, next.badges - badges) : 0;
  const needPoints = next ? Math.max(0, next.points - p.points) : 0;
  // Progress to the next rank: the slower of the two requirements.
  const pct = next
    ? Math.round(100 * Math.min(
        (badges - p.rank.badges) / Math.max(1, next.badges - p.rank.badges),
        (p.points - p.rank.points) / Math.max(1, next.points - p.rank.points),
        1
      ))
    : 100;
  const trailDone = badges === MODULES.length;

  return (
    <div className="page" style={{ gap: 32 }}>
      <div className="profile-grid">
        <section className="profile">
          <div className="avatar"><Loop size={140} /></div>
          <div style={{ flex: "1 1 320px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="eyebrow" style={{ color: p.rank.color, fontSize: 14, letterSpacing: "0.12em" }}>Level {p.rank.n} of {RANKS.length - 1}</span>
            <h1 className="display" style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.04 }}>{p.rank.name}</h1>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--body)" }}>{p.rank.blurb}</p>
            <div className="row" style={{ gap: 16 }}>
              {!trailDone && <Link href={`/module/${p.currentModule}`} className="cta dark" style={{ minHeight: 52, fontSize: 17, padding: "0 24px" }}>Resume module {p.currentModule} <Arrow size={18} color="#F7F3EA" /></Link>}
            </div>
          </div>
        </section>

        <aside className="rankcard">
          <span className="eyebrow" style={{ color: "var(--ink)", fontSize: 15 }}>Your level</span>
          <RankInsignia n={p.rank.n} name={p.rank.name} color={p.rank.color} />
          <div className="stats">
            <div><b>{badges}</b><span>Badges</span></div>
            <div><b>{fmt(p.points)}</b><span>Points</span></div>
            <div><b>{trailDone ? 1 : 0}</b><span>Trails</span></div>
          </div>
          {next ? (
            <div className="nextrank">
              <div className="ring" style={{ background: `conic-gradient(var(--teal) ${pct * 3.6}deg, #E3DED1 0)` }} aria-hidden="true"><span>{next.n}</span></div>
              <p>
                Earn {needBadges > 0 && <><b>{needBadges}</b> more {needBadges === 1 ? "badge" : "badges"}</>}
                {needBadges > 0 && needPoints > 0 && " and "}
                {needPoints > 0 && <><b>{fmt(needPoints)}</b> more points</>} to reach <b>level {next.n} · {next.name}</b>.
              </p>
            </div>
          ) : (
            <p className="nextrank" style={{ fontWeight: 700 }}>Top level reached. The whole trail is done.</p>
          )}
        </aside>
      </div>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 className="display" style={{ fontSize: 32, letterSpacing: "-0.015em" }}>Levels</h2>
        <ol className="ranks">
          {RANKS.map((r) => {
            const reached = r.n <= p.rank.n;
            return (
              <li key={r.n} className={reached ? "on" : ""} aria-current={r.n === p.rank.n ? "true" : undefined}>
                <RankInsignia n={r.n} name={r.name} color={reached ? r.color : "#B9BFCC"} size={84} />
                <div className="grow">
                  <strong>Level {r.n} · {r.name}</strong>
                  <span>{r.n === 0 ? "Where everyone starts." : `${r.badges} ${r.badges === 1 ? "badge" : "badges"} and ${fmt(r.points)} points`}</span>
                </div>
                {reached && <Check size={22} color="#0A5E5D" w={3.2} />}
              </li>
            );
          })}
        </ol>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div className="row between" style={{ alignItems: "baseline", gap: 8 }}>
          <h2 className="display" style={{ fontSize: 32, letterSpacing: "-0.015em" }}>Badges</h2>
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--muted)" }}>{badges} earned out of {MODULES.length}</span>
        </div>
        <div className="grid-badges">
          {MODULES.map((m) => {
            const earned = p.isModuleDone(m.n);
            const date = p.badgeDate(m.n);
            return (
              <article key={m.n} className="badge" style={{ background: earned ? "#fff" : "#F1EDE2", borderColor: earned ? "#1A2233" : "#CFC8B8" }}>
                <ModuleBadge module={m.n} earned={earned} />
                <span className="eyebrow" style={{ marginTop: 6, fontSize: 13 }}>Module {m.n}</span>
                <span className="badge nm" style={{ border: 0, padding: 0 }}>{m.badge.name}</span>
                <span className="how">{m.badge.how}</span>
                {earned ? (
                  <span className="status" style={{ color: "#0A5E5D" }}><Check size={16} color="#0A5E5D" w={3.2} />+{fmt(p.modulePoints(m.n))} points{date ? ` · ${fmtDate(date)}` : ""}</span>
                ) : (
                  <span className="status" style={{ color: "var(--muted)" }}><Lock />Not earned yet</span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h2 className="display" style={{ fontSize: 32, letterSpacing: "-0.015em" }}>Your executive file</h2>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--body)", maxWidth: 720, textWrap: "pretty" }}>Badges are fun, but deliverables are useful: three templates you fill in for your own company.</p>
        </div>
        <div className="grid-badges" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))" }}>
          {DELIVERABLES.map((d) => {
            const open = p.isModuleDone(d.module);
            return (
              <article key={d.title} className={`doc ${open ? "open" : ""}`}>
                <div className="row" style={{ gap: 14, flexWrap: "nowrap" }}>
                  <span className="ic" style={{ background: d.tint }}><DocIcon /></span>
                  <span className="display" style={{ fontSize: 21, lineHeight: 1.15, letterSpacing: 0 }}>{d.title}</span>
                </div>
                <span style={{ fontSize: 15, lineHeight: 1.45, color: "var(--body)" }}>{d.desc}</span>
                {open ? (
                  <Link href={`/module/${d.module}?unit=3`} className="status" style={{ color: "#0A5E5D", marginTop: 0 }}><Check size={16} color="#0A5E5D" w={3.2} />Open the template (module {d.module})</Link>
                ) : (
                  <span className="status" style={{ color: "var(--muted)", marginTop: 0 }}><Lock />Unlocks with module {d.module}</span>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
