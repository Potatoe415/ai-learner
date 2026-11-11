"use client";

import Link from "next/link";
import { Loop } from "./characters";
import { Arrow, Back, Check, DocIcon, Lock } from "./icons";
import { DELIVERABLES, getLevel, getZone } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

const GLYPHS: Record<string, { d: string; fill: string; stroke: string }> = {
  "level-0": { d: "M38 32L58 44L38 56Z", fill: "#1A2233", stroke: "#fff" },
  "level-1": { d: "M58 44a14 14 0 1 1-4.5-10.3M55 27v8h-8", fill: "#0E7C7B", stroke: "#fff" },
  "level-2": { d: "M30 44a14 14 0 1 0 28 0a14 14 0 1 0-28 0M38 44a6 6 0 1 0 12 0a6 6 0 1 0-12 0", fill: "#0E7C7B", stroke: "#fff" },
  "level-3": { d: "M36 32h-6v24h6M52 32h6v24h-6M40 44h8", fill: "#0E7C7B", stroke: "#fff" },
  "level-4": { d: "M38 32v10M50 32v10M34 42h20v4a10 10 0 0 1-20 0ZM44 58v6", fill: "#0E7C7B", stroke: "#fff" },
  "level-5": { d: "M30 42a10 10 0 1 0 20 0a10 10 0 1 0-20 0M47 49L58 60", fill: "#3B3FA8", stroke: "#fff" },
  "level-6": { d: "M44 30L57 35V45C57 53 51 58 44 61C37 58 31 53 31 45V35ZM38 45l4 4 8-9", fill: "#3B3FA8", stroke: "#fff" },
  "level-7": { d: "M32 36a12 5 0 1 0 24 0a12 5 0 1 0-24 0M32 36v16a12 5 0 0 0 24 0V36M32 44a12 5 0 0 0 24 0", fill: "#3B3FA8", stroke: "#fff" },
  "level-8": { d: "M36 60V30M36 31h20l-5 6 5 6H36", fill: "#B84E00", stroke: "#fff" },
  "level-9": { d: "M34 58V32h12M44 44h16M54 38l6 6-6 6", fill: "#B84E00", stroke: "#fff" },
  "level-10": { d: "M44 29l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5L44 53l-9.4 5 1.8-10.5-7.7-7.5 10.6-1.5Z", fill: "#F2B134", stroke: "#1A2233" },
  "streak-7": { d: "M44 28C45 36 56 40 56 50a12 12 0 0 1-24 0C32 43 37 40 39 34C41 38 43 37 44 28Z", fill: "#1A2233", stroke: "#F2B134" },
};

export default function TrophiesView() {
  const p = useProgress();
  const lv = getLevel(p.currentLevel)!;
  const zone = lv.zone === "base" ? null : getZone(lv.zone);
  const pct = Math.min(100, Math.round((p.xp / p.nextLevelXp) * 100));

  return (
    <div className="page" style={{ gap: 32 }}>
      <header className="row between" style={{ gap: 16 }}>
        <Link href="/" className="pill" style={{ minHeight: 48, padding: "0 20px 0 14px", borderRadius: 24, fontSize: 16 }}><Back />Back to the path</Link>
        <span className="brand">Agent Path</span>
      </header>

      <section className="profile">
        <div className="avatar"><Loop size={140} /></div>
        <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="eyebrow" style={{ color: zone?.color ?? "var(--ink)", fontSize: 14, letterSpacing: "0.12em" }}>Level {p.currentLevel} of 10</span>
            <h1 className="display" style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.04 }}>{lv.title}</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="row between" style={{ fontSize: 15, fontWeight: 700, gap: 8 }}>
              <span>{p.xp.toLocaleString("en-US")} XP</span>
              <span style={{ color: "var(--muted)" }}>Next level: {p.nextLevelXp.toLocaleString("en-US")} XP</span>
            </div>
            <div className="meter" role="progressbar" aria-label={`Progress to level ${p.currentLevel + 1}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><div style={{ width: `${pct}%` }} /></div>
          </div>
          <div className="row" style={{ gap: 16 }}>
            <Link href={`/level/${p.currentLevel}`} className="cta dark" style={{ minHeight: 52, fontSize: 17, padding: "0 24px" }}>Resume lesson <Arrow size={18} color="#F7F3EA" /></Link>
            <span style={{ fontSize: 15, color: "var(--body)", maxWidth: 360, lineHeight: 1.4 }}>{p.streak > 0 && p.streak < 7 ? `Come back tomorrow to keep your ${p.streak}-day streak alive.` : "Learn a little every day to unlock the 7-day streak trophy."}</span>
          </div>
        </div>
        <div className="tiles">
          <div className="tile"><span style={{ fontSize: 15, fontWeight: 600, color: "var(--body)" }}>Trophies</span><b>{p.unlockedCount} / {p.trophies.length}</b></div>
          <div className="tile"><span style={{ fontSize: 15, fontWeight: 600, color: "var(--body)" }}>Current streak</span><b>{p.streak} {p.streak === 1 ? "day" : "days"}</b></div>
          <div className="tile"><span style={{ fontSize: 15, fontWeight: 600, color: "var(--body)" }}>Levels completed</span><b>{p.completedLevels.filter((n) => n > 0).length} / 10</b></div>
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div className="row between" style={{ alignItems: "baseline", gap: 8 }}>
          <h2 className="display" style={{ fontSize: 32, letterSpacing: "-0.015em" }}>Your trophy cabinet</h2>
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--muted)" }}>{p.unlockedCount} unlocked out of {p.trophies.length}</span>
        </div>
        <div className="grid-badges">
          {p.trophies.map((t) => {
            const g = GLYPHS[t.id];
            return (
              <article key={t.id} className="badge" style={{ background: t.unlocked ? "#fff" : "#F1EDE2", borderColor: t.unlocked ? "#1A2233" : "#CFC8B8" }}>
                <svg width="92" height="92" viewBox="0 0 88 88" aria-hidden="true">
                  <path d="M44 4L80 24V62L44 84L8 62V24Z" fill={t.unlocked ? g.fill : "#E3DED1"} stroke={t.unlocked ? "#1A2233" : "#8A92A6"} strokeWidth="3.5" strokeLinejoin="round" />
                  <path d={g.d} fill="none" stroke={t.unlocked ? g.stroke : "#8A92A6"} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="eyebrow" style={{ marginTop: 6, fontSize: 13 }}>{t.tag}</span>
                <span className="badge nm" style={{ border: 0, padding: 0 }}>{t.name}</span>
                <span className="how">{t.how}</span>
                {t.unlocked ? (
                  <span className="status" style={{ color: "#0A5E5D" }}><Check size={16} color="#0A5E5D" w={3.2} />Unlocked</span>
                ) : (
                  <span className="status" style={{ color: "var(--muted)" }}><Lock />Locked</span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h2 className="display" style={{ fontSize: 32, letterSpacing: "-0.015em" }}>Your executive file</h2>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--body)", maxWidth: 720, textWrap: "pretty" }}>Trophies are fun, but deliverables are useful: three downloadable templates you fill in for your own company.</p>
        </div>
        <div className="grid-badges" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))" }}>
          {DELIVERABLES.map((d) => {
            const open = p.completedLevels.includes(d.level);
            return (
              <article key={d.title} className={`doc ${open ? "open" : ""}`}>
                <div className="row" style={{ gap: 14, flexWrap: "nowrap" }}>
                  <span className="ic" style={{ background: d.tint }}><DocIcon /></span>
                  <span className="display" style={{ fontSize: 21, lineHeight: 1.15, letterSpacing: 0 }}>{d.title}</span>
                </div>
                <span style={{ fontSize: 15, lineHeight: 1.45, color: "var(--body)" }}>{d.desc}</span>
                <span className="status" style={{ color: open ? "#0A5E5D" : "var(--muted)", marginTop: 0 }}>
                  {open ? <><Check size={16} color="#0A5E5D" w={3.2} />Unlocked (template coming soon)</> : <><Lock />Unlocks at level {d.level}</>}
                </span>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
