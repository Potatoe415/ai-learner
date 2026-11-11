"use client";

import Link from "next/link";
import { Cap, Loop, Plug, Ward } from "./characters";
import { Arrow, Check, Flag, Flame, Lock, Medal, Star } from "./icons";
import { LEVELS, MAX_LEVEL, STEPS, ZONES, getLevel, levelsOfZone, type Zone } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

const Mascot = ({ who, size }: { who: Zone["mascot"] | "Loop"; size: number }) =>
  who === "Plug" ? <Plug size={size} /> : who === "Ward" ? <Ward size={size} /> : who === "Cap" ? <Cap size={size} /> : <Loop size={size} />;

export default function PathView() {
  const p = useProgress();
  const current = getLevel(p.currentLevel)!;
  const currentZone = ZONES.find((z) => z.key === current.zone);
  const camp = getLevel(0)!;
  const campDone = p.completedLevels.includes(0);
  const finished = p.completedLevels.includes(MAX_LEVEL);
  const firstOpenStep = Math.max(0, STEPS.findIndex((_, i) => !p.isStepDone(current.n, i)));
  const started = p.xp > 0 || p.completedLevels.length > 0 || (p.ready && p.isStepDone(current.n, 0));

  return (
    <div className="page">
      <header className="row between" style={{ gap: 16 }}>
        <Link href="/" className="brand"><Loop size={52} />Agent Path</Link>
        <div className="row">
          <span className="pill"><Flame />Streak: {p.streak} {p.streak === 1 ? "day" : "days"}</span>
          <span className="pill gold">{p.xp.toLocaleString("en-US")} XP</span>
          <Link href="/trophies" className="pill"><Star />Trophies {p.unlockedCount} / {p.trophies.length}</Link>
        </div>
      </header>

      <section className="hero">
        <div className="col">
          <span className="eyebrow" style={{ color: "var(--gold)", fontSize: 14, letterSpacing: "0.12em" }}>
            {current.zone === "base" ? "Level 0 · Base camp" : `Level ${current.n} · ${currentZone?.name}`}
          </span>
          <h1>{finished ? "You made it to the top" : current.title}</h1>
          <p className="lead">{finished ? "Every level is complete. Your adoption plan is ready to present." : current.sub + "."}</p>
          <div className="chips">
            {STEPS.map((s, i) => (
              <span key={s} className={`chip ${p.isStepDone(current.n, i) ? "on" : i === firstOpenStep ? "on" : ""}`} style={p.isStepDone(current.n, i) ? { opacity: 0.7 } : undefined}>
                {i + 1} · {s}
              </span>
            ))}
          </div>
          <div className="row" style={{ gap: 16 }}>
            <Link className="cta gold" href={`/level/${current.n}`}>
              {started ? "Resume lesson" : "Start learning"} <Arrow />
            </Link>
            <span style={{ fontSize: 15, color: "#d7dbe5" }}>{STEPS[firstOpenStep]} · about 5 min</span>
          </div>
        </div>
        <div className="mascot">
          <div className="bubble">{started ? "Shall we plug in?" : "Ready when you are!"}</div>
          <Mascot who={currentZone?.mascot ?? "Loop"} size={240} />
        </div>
      </section>

      <section className="camp">
        <Loop size={68} />
        <div className="grow">
          <span className="eyebrow">Base camp · Level 0</span>
          <strong>{camp.title}</strong>
        </div>
        {campDone ? (
          <span className="tag-done"><Check size={16} />Done · Trophy {camp.trophy.name}</span>
        ) : (
          <Link href="/level/0" className="pill" style={{ background: "var(--gold)" }}>Start <Arrow size={16} /></Link>
        )}
      </section>

      {ZONES.map((zone) => {
        const nodes = levelsOfZone(zone.key);
        const inset = 100 / (2 * nodes.length) + "%";
        return (
          <div className="zonewrap" key={zone.key}>
            <div className="dots" aria-hidden="true" />
            <section className="zone" style={{ background: zone.tint }}>
              <div className="side">
                <Mascot who={zone.mascot} size={124} />
                <span className="eyebrow" style={{ color: "var(--ink)" }}>{zone.range}</span>
                <h2>{zone.name}</h2>
                <span style={{ fontWeight: 700, fontSize: 16, color: zone.color }}>{zone.sub}</span>
                <p className="desc">{zone.desc}</p>
                <span className="boss"><Flag />{zone.boss}</span>
              </div>
              <div className="nodes">
                <div className="rail" aria-hidden="true" style={{ left: inset, right: inset, borderColor: zone.line }} />
                {nodes.map((lv) => {
                  const done = p.completedLevels.includes(lv.n);
                  const isCurrent = lv.n === p.currentLevel;
                  const locked = !done && !isCurrent;
                  return (
                    <div className="node" key={lv.n}>
                      {done && (
                        <Link href={`/level/${lv.n}`} className="orb done" aria-label={`Review level ${lv.n}`} style={{ background: zone.color }}>
                          <Check size={34} color="#fff" w={3.2} />
                        </Link>
                      )}
                      {isCurrent && (
                        <Link href={`/level/${lv.n}`} className="pulse-wrap" aria-label={`Resume level ${lv.n}`}>
                          <span className="pulse" style={{ background: zone.color }} />
                          <span className="orb current" style={{ borderColor: zone.color }}>{lv.n}</span>
                        </Link>
                      )}
                      {locked && <div className="orb locked"><Lock size={28} color="#8A92A6" /></div>}
                      <span className="lvl">Level {lv.n}</span>
                      <span className="ttl">{lv.title}</span>
                      <span className="sub">{lv.sub}</span>
                      <span className="tro"><Medal fill={done ? zone.color : "#D3D6DE"} />{lv.trophy.name}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
      })}

      <div className="zonewrap">
        <div className="dots" aria-hidden="true" />
        <section className="summit">
          <Loop mood="cheer" size={150} />
          <div className="col">
            <span className="eyebrow" style={{ color: "var(--ink)", fontSize: 14, letterSpacing: "0.12em" }}>Level 10 · Ready</span>
            <h2>At the finish line, you hold your own adoption plan.</h2>
            <p>Stack choice, cost model, NIST security posture, Crawl-Walk-Run rollout, guardrails and executive KPIs: a complete file ready to present to a committee, plus a completion certificate.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
