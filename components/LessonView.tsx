"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Cap, Loop, Plug, Ward } from "./characters";
import { Arrow, Check, Close, Star } from "./icons";
import { ModuleBadge } from "./badges";
import BadgeCelebration from "./BadgeCelebration";
import { getModule, getZone, isOptionalUnit, requiredUnitsOf, unitsOf, type UnitKind, type Zone } from "@/lib/curriculum";
import { LESSONS, unitContent, type ConceptQuiz, type LessonContent } from "@/lib/lessons";
import { DeliverableStepView, LabStepView, CaseStudyStep, ReadingStep } from "./LessonSteps";
import { useProgress } from "@/lib/progress";
import { moduleMaxPoints } from "@/lib/scoring";

/** Mascot size in the lesson view: small enough to leave the lesson text most of the width. */
const LESSON_MASCOT = 140;

function Concept({ quiz, module, unit, onSolved, onDone }: { quiz: ConceptQuiz; module: number; unit: number; onSolved: () => void; onDone: () => void }) {
  const p = useProgress();
  const already = p.isUnitDone(module, unit);
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
      p.recordMiss(module, unit);
    }
  };

  return (
    <>
      <div className="mascot" style={{ flex: "0 1 180px" }}>
        <div className="bubble white" role="status">{bubble}</div>
        <Loop size={LESSON_MASCOT} mood={mood} />
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
              <span className="pill gold" style={{ minHeight: 48, fontSize: 17, fontWeight: 800 }}><Star fill="#fff" size={20} />+{p.unitValue(module, unit)} points</span>
              <button type="button" className="cta dark" onClick={onDone}>{quiz.next} <Arrow color="#F7F3EA" /></button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

const bubbleOf = (c: LessonContent, kind: UnitKind) => {
  const d = unitContent(c, kind);
  return d && "bubble" in d ? d.bubble : "";
};

interface UnitProps {
  content: LessonContent;
  kind: UnitKind;
  done: boolean;
  points: number;
  onComplete: () => void;
  onMiss: () => void;
}

function UnitBody({ content, kind, ...props }: UnitProps) {
  if (kind === "History" && content.history) return <ReadingStep data={content.history} {...props} />;
  if (kind === "Concept" && content.reading) return <ReadingStep data={content.reading} {...props} />;
  if (kind === "Case study" && content.caseStudy) return <CaseStudyStep data={content.caseStudy} {...props} />;
  if (kind === "Lab" && content.lab) return <LabStepView data={content.lab} {...props} />;
  if (kind === "Deliverable" && content.deliverable) return <DeliverableStepView data={content.deliverable} {...props} />;
  return null;
}

const Mascot = ({ who }: { who: Zone["mascot"] }) =>
  who === "Plug" ? <Plug size={LESSON_MASCOT} /> : who === "Ward" ? <Ward size={LESSON_MASCOT} /> : who === "Cap" ? <Cap size={LESSON_MASCOT} /> : <Loop size={LESSON_MASCOT} />;

const noop = () => {};

/** Reads `?unit=N` (links from the trail's unit list). Needs a Suspense boundary on a static page. */
export function LessonFromUrl({ module }: { module: number }) {
  const raw = useSearchParams().get("unit");
  const n = raw !== null && /^\d$/.test(raw) ? Number(raw) : null;
  return <LessonView module={module} startUnit={n !== null && n < unitsOf(module).length ? n : null} />;
}

export default function LessonView({ module, startUnit }: { module: number; startUnit: number | null }) {
  const p = useProgress();
  const mod = getModule(module)!;
  const zone = getZone(mod.zone);
  const color = zone.color;
  // Every module 1-8 has content (lib/lessons.ts); a missing unit would be a content bug.
  const content = LESSONS[module] ?? {};
  const units = unitsOf(module);
  const firstOpen = units.findIndex((_, i) => !p.isUnitDone(module, i));
  const router = useRouter();
  const pathname = usePathname();
  // The URL (`?unit=N`) is the single source of truth, so the side menu, the back button and
  // in-lesson buttons always agree. Every unit of every module is open.
  const unit = startUnit ?? (firstOpen === -1 ? units.length - 1 : firstOpen);
  const kind = units[unit];
  const unitDone = p.isUnitDone(module, unit);
  const points = p.unitValue(module, unit);
  const moduleDone = p.isModuleDone(module);
  const optional = isOptionalUnit(module, unit);
  const doneValue = (optionalUnits: boolean) =>
    units.reduce((sum, _, i) => sum + (isOptionalUnit(module, i) === optionalUnits && p.isUnitDone(module, i) ? p.unitValue(module, i) : 0), 0);
  const requiredPoints = doneValue(false);
  const bonusPoints = doneValue(true);
  const show = (u: number) => router.replace(`${pathname}?unit=${u}`, { scroll: false });
  const go = (u: number) => { show(u); window.scrollTo(0, 0); };
  // Stay on the unit just completed (explanation, points earned) instead of jumping to the next open one.
  const [celebrate, setCelebrate] = useState(false);
  const endCelebration = useCallback(() => setCelebrate(false), []);
  const complete = (u: number) => {
    show(u);
    // Celebrate only the completion that earns the badge, not revisits of a finished module.
    // Optional units are not needed for the badge (decision 0009).
    if (!p.isUnitDone(module, u) && !moduleDone && requiredUnitsOf(module).every((i) => i === u || p.isUnitDone(module, i))) setCelebrate(true);
    p.completeUnit(module, u);
  };

  const nav = (
    <div className="row" style={{ gap: 12 }}>
      {unit > 0 && <button type="button" className="btn-ghost" onClick={() => go(unit - 1)}>← Previous unit</button>}
      {unit < units.length - 1 && (
        <button type="button" className="cta dark" onClick={() => go(unit + 1)}>Next: {units[unit + 1]}{isOptionalUnit(module, unit + 1) ? " (optional)" : ""} <Arrow color="#F7F3EA" /></button>
      )}
    </div>
  );

  return (
    <div className="page narrow">
      {celebrate && <BadgeCelebration module={module} name={mod.badge.name} onClose={endCelebration} />}
      <header className="row" style={{ gap: 16 }}>
        <div className="bar">
          <div className="row between" style={{ gap: 8, fontSize: 14, fontWeight: 700 }}>
            <span style={{ color }}>
              Module {module} · {mod.title}{" "}
              <span className="mod-points">({requiredPoints.toLocaleString("en-US")} / {moduleMaxPoints(module).toLocaleString("en-US")} points{bonusPoints > 0 ? ` + ${bonusPoints} bonus` : ""})</span>
            </span>
            <span style={{ color: "var(--muted)" }}>Unit {unit + 1} of {units.length}</span>
          </div>
          <div className="seg">{units.map((s, i) => <i key={s} style={i <= unit || p.isUnitDone(module, i) ? { background: color } : undefined} />)}</div>
          <div className="seg labels">{units.map((s, i) => <span key={s} style={i === unit ? { color: "var(--ink)", fontWeight: 700 } : undefined}>{s}{isOptionalUnit(module, i) && <span className="optional-tag">Optional</span>}</span>)}</div>
        </div>
        {!unitDone && <span className="pill gold" style={{ fontWeight: 800 }}>+{points} {optional ? "bonus points" : "points at stake"}</span>}
        <Link href="/trail" className="close" aria-label="Leave the module and go back to the trail"><Close /></Link>
      </header>

      {moduleDone && unit === units.length - 1 && (
        <section className="earned" role="status">
          <ModuleBadge module={module} earned size={84} />
          <div className="grow">
            <span className="eyebrow">Badge earned · +{p.modulePoints(module).toLocaleString("en-US")} points</span>
            <strong>{mod.badge.name}</strong>
            <span>You are level {p.rank.n} · {p.rank.name}.</span>
          </div>
          <Link href="/trail" className="cta dark">Back to the trail <Arrow color="#F7F3EA" /></Link>
        </section>
      )}

      <main className="scene">
        {kind === "Concept" && content.concept ? (
          <>
            {content.reading && (
              <div style={{ flex: "1 1 100%", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                <ReadingStep data={content.reading} done={unitDone} points={points} onComplete={noop} onMiss={noop} />
              </div>
            )}
            <Concept quiz={content.concept} module={module} unit={unit} onSolved={() => complete(unit)} onDone={() => go(unit + 1)} />
          </>
        ) : unitContent(content, kind) ? (
          <>
            <div className="mascot sticky" style={{ flex: "0 1 180px" }}>
              <div className="bubble white">{bubbleOf(content, kind)}</div>
              {zone.mascot === "Loop" ? <Loop size={LESSON_MASCOT} mood={unitDone ? "cheer" : "think"} /> : <Mascot who={zone.mascot} />}
            </div>
            <div key={unit} style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              {optional && (
                <p className="optional-note" role="note">
                  <span className="optional-tag">Optional</span>
                  This unit needs some code. You can skip it: the badge does not need it, and its points are a bonus.
                </p>
              )}
              <UnitBody
                content={content}
                kind={kind}
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
