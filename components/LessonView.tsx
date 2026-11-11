"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Cap, Loop, Plug, Ward } from "./characters";
import { Arrow, Check, Close, Star } from "./icons";
import { ModuleBadge } from "./badges";
import { UNITS, getModule, getZone, type Zone } from "@/lib/curriculum";
import { LESSONS, unitData, type ConceptQuiz, type LessonContent } from "@/lib/lessons";
import { DeliverableStepView, LabStepView, PostMortemStep, ReadingStep } from "./LessonSteps";
import { useProgress } from "@/lib/progress";

function Concept({ quiz, module, onSolved, onDone }: { quiz: ConceptQuiz; module: number; onSolved: () => void; onDone: () => void }) {
  const p = useProgress();
  const already = p.isUnitDone(module, 0);
  const [picked, setPicked] = useState<string | null>(null);
  const [tried, setTried] = useState<string[]>([]);
  const solved = already || picked === quiz.correct;
  const wrong = !!picked && !solved;
  const mood = solved ? "happy" : wrong ? "oops" : "think";
  const bubble = solved ? quiz.bubbles.right : wrong ? quiz.bubbles.wrong : quiz.bubbles.start;

  const pick = (id: string) => {
    if (solved) return;
    setPicked(id);
    if (id === quiz.correct) return onSolved();
    // Each wrong option costs points once, however many times it is clicked.
    if (!tried.includes(id)) {
      setTried((t) => [...t, id]);
      p.recordMiss(module, 0);
    }
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
              <span className="pill gold" style={{ minHeight: 48, fontSize: 17, fontWeight: 800 }}><Star fill="#fff" size={20} />+{p.unitValue(module, 0)} points</span>
              <button type="button" className="cta dark" onClick={onDone}>{quiz.next} <Arrow color="#F7F3EA" /></button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

const bubbleOf = (c: LessonContent, unit: number) => {
  const d = unitData(c, unit);
  return d && "bubble" in d ? d.bubble : "";
};

interface UnitProps {
  content: LessonContent;
  unit: number;
  done: boolean;
  points: number;
  onComplete: () => void;
  onMiss: () => void;
}

function UnitBody({ content, unit, ...props }: UnitProps) {
  if (unit === 0 && content.reading) return <ReadingStep data={content.reading} {...props} />;
  if (unit === 1 && content.postMortem) return <PostMortemStep data={content.postMortem} {...props} />;
  if (unit === 2 && content.lab) return <LabStepView data={content.lab} {...props} />;
  if (unit === 3 && content.deliverable) return <DeliverableStepView data={content.deliverable} {...props} />;
  return null;
}

const Mascot = ({ who }: { who: Zone["mascot"] | "Loop" }) =>
  who === "Plug" ? <Plug size={200} /> : who === "Ward" ? <Ward size={200} /> : who === "Cap" ? <Cap size={200} /> : <Loop size={200} />;

const noop = () => {};

/** Reads `?unit=N` (links from the trail's unit list). Needs a Suspense boundary on a static page. */
export function LessonFromUrl({ module }: { module: number }) {
  const raw = useSearchParams().get("unit");
  const n = raw !== null && /^\d$/.test(raw) ? Number(raw) : null;
  return <LessonView module={module} startUnit={n !== null && n < UNITS.length ? n : null} />;
}

export default function LessonView({ module, startUnit }: { module: number; startUnit: number | null }) {
  const p = useProgress();
  const mod = getModule(module)!;
  const zone = mod.zone === "base" ? null : getZone(mod.zone);
  const color = zone?.color ?? "#1A2233";
  // Every module 0-10 has content (lib/lessons.ts); a missing unit would be a content bug.
  const content = LESSONS[module] ?? {};
  const locked = p.ready && module > p.currentModule;
  const firstOpen = UNITS.findIndex((_, i) => !p.isUnitDone(module, i));
  const [view, setView] = useState<number | null>(null);
  // A requested unit opens only if it is done or the next one to do.
  const requested = startUnit !== null && p.ready && (firstOpen === -1 || startUnit <= firstOpen) ? startUnit : null;
  const unit = view ?? requested ?? (firstOpen === -1 ? UNITS.length - 1 : firstOpen);
  const unitDone = p.isUnitDone(module, unit);
  const points = p.unitValue(module, unit);
  const moduleDone = p.isModuleDone(module);
  const go = (u: number) => { setView(u); window.scrollTo(0, 0); };
  // Stay on the unit just completed (explanation, points earned) instead of jumping to the next open one.
  const complete = (u: number) => { setView(u); p.completeUnit(module, u); };

  const nav = (
    <div className="row" style={{ gap: 12 }}>
      {unit > 0 && <button type="button" className="btn-ghost" onClick={() => go(unit - 1)}>← Previous unit</button>}
      {unitDone && unit < UNITS.length - 1 && (
        <button type="button" className="cta dark" onClick={() => go(unit + 1)}>Next: {UNITS[unit + 1]} <Arrow color="#F7F3EA" /></button>
      )}
    </div>
  );

  return (
    <div className="page narrow">
      <header className="row" style={{ gap: 16 }}>
        <Link href="/" className="close" aria-label="Leave the module and go back to the trail"><Close /></Link>
        <div className="bar">
          <div className="row between" style={{ gap: 8, fontSize: 14, fontWeight: 700 }}>
            <span style={{ color }}>Module {module} · {mod.title}</span>
            <span style={{ color: "var(--muted)" }}>Unit {unit + 1} of {UNITS.length}</span>
          </div>
          <div className="seg">{UNITS.map((s, i) => <i key={s} style={i <= unit || p.isUnitDone(module, i) ? { background: color } : undefined} />)}</div>
          <div className="seg labels">{UNITS.map((s, i) => <span key={s} style={i === unit ? { color: "var(--ink)", fontWeight: 700 } : undefined}>{s}</span>)}</div>
        </div>
        {!locked && !unitDone && <span className="pill gold" style={{ fontWeight: 800 }}>+{points} points at stake</span>}
      </header>

      {moduleDone && unit === UNITS.length - 1 && (
        <section className="earned" role="status">
          <ModuleBadge module={module} earned size={84} />
          <div className="grow">
            <span className="eyebrow">Badge earned · +{p.modulePoints(module).toLocaleString("en-US")} points</span>
            <strong>{mod.badge.name}</strong>
            <span>You are level {p.rank.n} · {p.rank.name}.</span>
          </div>
          <Link href="/" className="cta dark">Back to the trail <Arrow color="#F7F3EA" /></Link>
        </section>
      )}

      <main className="scene">
        {locked ? (
          <div className="soon" style={{ flex: 1 }}>
            <span className="eyebrow">Locked</span>
            <h1 className="display" style={{ fontSize: 30 }}>Finish module {p.currentModule} first</h1>
            <Link className="cta dark" href={`/module/${p.currentModule}`} style={{ alignSelf: "flex-start" }}>Go to module {p.currentModule} <Arrow color="#F7F3EA" /></Link>
          </div>
        ) : unit === 0 && content.concept ? (
          <>
            {content.reading && (
              <div style={{ flex: "1 1 100%", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                <ReadingStep data={content.reading} done={unitDone} points={points} onComplete={noop} onMiss={noop} />
              </div>
            )}
            <Concept quiz={content.concept} module={module} onSolved={() => complete(0)} onDone={() => go(1)} />
          </>
        ) : unitData(content, unit) ? (
          <>
            <div className="mascot sticky" style={{ flex: "0 1 240px" }}>
              <div className="bubble white">{bubbleOf(content, unit)}</div>
              {zone ? <Mascot who={zone.mascot} /> : <Loop size={200} mood={unitDone ? "cheer" : "think"} />}
            </div>
            <div key={unit} style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              <UnitBody
                content={content}
                unit={unit}
                done={unitDone}
                points={points}
                onComplete={() => complete(unit)}
                onMiss={() => p.recordMiss(module, unit)}
              />
              {nav}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
