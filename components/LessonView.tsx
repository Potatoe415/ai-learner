"use client";

import Link from "next/link";
import { useState } from "react";
import { Cap, Loop, Plug, Ward } from "./characters";
import { Arrow, Check, Close, Star } from "./icons";
import { STEPS, getLevel, getZone, type Zone } from "@/lib/curriculum";
import { LESSONS, type ConceptQuiz } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

function Concept({ quiz, level, onDone }: { quiz: ConceptQuiz; level: number; onDone: () => void }) {
  const p = useProgress();
  const already = p.isStepDone(level, 0);
  const [picked, setPicked] = useState<string | null>(null);
  const solved = already || picked === quiz.correct;
  const wrong = !!picked && !solved;
  const mood = solved ? "happy" : wrong ? "oops" : "think";
  const bubble = solved ? quiz.bubbles.right : wrong ? quiz.bubbles.wrong : quiz.bubbles.start;

  const pick = (id: string) => {
    if (solved) return;
    setPicked(id);
    if (id === quiz.correct) p.completeStep(level, 0, quiz.xp);
  };

  return (
    <>
      <div className="mascot" style={{ flex: "0 1 240px" }}>
        <div className="bubble white" role="status">{bubble}</div>
        <Loop size={200} mood={mood} />
      </div>
      <div style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
        <section className="card">
          <span className="eyebrow">{quiz.kicker}</span>
          <h1>{quiz.question}</h1>
          <div className="opts">
            {quiz.options.map((o, i) => {
              const right = solved && o.id === quiz.correct;
              const bad = picked === o.id && !right;
              return (
                <button key={o.id} type="button" className={`opt ${right ? "right" : bad ? "wrong" : ""}`} onClick={() => pick(o.id)} aria-pressed={picked === o.id}>
                  <span className="letter">{String.fromCharCode(65 + i)}</span>
                  <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <span className="val">{o.value}</span>
                    <span className="cap">{right ? "Right answer" : bad ? "Not quite" : "integrations"}</span>
                  </span>
                  {right && <Check size={28} color="#0E7C7B" w={3.4} />}
                </button>
              );
            })}
          </div>
          {wrong && picked && <div role="status" className="hint">{quiz.hints[picked]}</div>}
        </section>

        {solved && (
          <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="compare">
              <div style={{ background: "#FAE6D2" }}><span className="eyebrow" style={{ color: "var(--ink)" }}>{quiz.solved.without.label}</span><strong>{quiz.solved.without.title}</strong><span className="t">{quiz.solved.without.text}</span></div>
              <div style={{ background: "#DCEFEE" }}><span className="eyebrow" style={{ color: "var(--ink)" }}>{quiz.solved.with.label}</span><strong>{quiz.solved.with.title}</strong><span className="t">{quiz.solved.with.text}</span></div>
            </div>
            <div className="row between" style={{ gap: 16 }}>
              <span className="pill gold" style={{ minHeight: 48, fontSize: 17, fontWeight: 800 }}><Star fill="#fff" size={20} />+{quiz.xp} XP</span>
              <button type="button" className="cta dark" onClick={onDone}>{quiz.next} <Arrow color="#F7F3EA" /></button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

const Mascot = ({ who }: { who: Zone["mascot"] | "Loop" }) =>
  who === "Plug" ? <Plug size={200} /> : who === "Ward" ? <Ward size={200} /> : who === "Cap" ? <Cap size={200} /> : <Loop size={200} />;

export default function LessonView({ level }: { level: number }) {
  const p = useProgress();
  const lv = getLevel(level)!;
  const zone = lv.zone === "base" ? null : getZone(lv.zone);
  const color = zone?.color ?? "#1A2233";
  const content = LESSONS[level];
  const locked = p.ready && level > p.currentLevel;
  const firstOpen = STEPS.findIndex((_, i) => !p.isStepDone(level, i));
  const [view, setView] = useState<number | null>(null);
  const step = view ?? (firstOpen === -1 ? STEPS.length - 1 : firstOpen);
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <div className="page narrow">
      <header className="row" style={{ gap: 16 }}>
        <Link href="/" className="close" aria-label="Leave the lesson and go back to the path"><Close /></Link>
        <div className="bar">
          <div className="row between" style={{ gap: 8, fontSize: 14, fontWeight: 700 }}>
            <span style={{ color }}>Level {level} · {lv.title}</span>
            <span style={{ color: "var(--muted)" }}>Step {step + 1} of {STEPS.length}</span>
          </div>
          <div className="seg">{STEPS.map((s, i) => <i key={s} style={i <= step || p.isStepDone(level, i) ? { background: color } : undefined} />)}</div>
          <div className="seg labels">{STEPS.map((s, i) => <span key={s} style={i === step ? { color: "var(--ink)", fontWeight: 700 } : undefined}>{s}</span>)}</div>
        </div>
        {step === 0 && content?.concept && !p.isStepDone(level, 0) && <span className="pill gold" style={{ fontWeight: 800 }}>+{content.concept.xp} XP at stake</span>}
      </header>

      <main className="scene">
        {locked ? (
          <div className="soon" style={{ flex: 1 }}>
            <span className="eyebrow">Locked</span>
            <h1 className="display" style={{ fontSize: 30 }}>Finish level {p.currentLevel} first</h1>
            <Link className="cta dark" href={`/level/${p.currentLevel}`} style={{ alignSelf: "flex-start" }}>Go to level {p.currentLevel} <Arrow color="#F7F3EA" /></Link>
          </div>
        ) : step === 0 && content?.concept ? (
          <Concept quiz={content.concept} level={level} onDone={() => setView(1)} />
        ) : (
          <>
            <div className="mascot" style={{ flex: "0 1 240px" }}>
              <div className="bubble white">Content coming soon!</div>
              <Mascot who={zone?.mascot ?? "Loop"} />
            </div>
            <div style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              <section className="soon">
                <span className="eyebrow">{STEPS[step]} · in preparation</span>
                <h1 className="display" style={{ fontSize: 30, lineHeight: 1.1 }}>{lv.title}</h1>
                <p style={{ fontSize: 16, color: "var(--body)" }}>This lesson will cover (MIT Applied Agentic AI, module {lv.mitModules.join(", ")}):</p>
                <ul>{lv.topics.map((t) => <li key={t}>{t}</li>)}</ul>
              </section>
              <div className="row" style={{ gap: 12 }}>
                {step > 0 && <button type="button" className="btn-ghost" onClick={() => setView(step - 1)}>← Previous step</button>}
                {isDev && !p.isStepDone(level, step) && (
                  <button type="button" className="btn-ghost" onClick={() => p.completeStep(level, step, 20)}>Dev: mark step done (+20 XP)</button>
                )}
                {p.isStepDone(level, step) && step < STEPS.length - 1 && (
                  <button type="button" className="cta dark" onClick={() => setView(step + 1)}>Next step <Arrow color="#F7F3EA" /></button>
                )}
                {p.isLevelDone(level) && step === STEPS.length - 1 && (
                  <Link href="/" className="cta dark">Level complete · back to the path <Arrow color="#F7F3EA" /></Link>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
