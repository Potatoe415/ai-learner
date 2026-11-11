"use client";

// Renderers for the content-driven lesson units: Reading (Concept), Case study, Lab, Deliverable.
// Each unit reports wrong answers through `onMiss` and completion through `onComplete`;
// points and persistence stay in `lib/scoring.ts` and `lib/progress.tsx`.

import { useState, type ReactNode } from "react";
import { Check, Star } from "./icons";
import type { DeliverableStep, Lab, CaseStudy, Question, Reading, Section, Table } from "@/lib/lessons";

interface StepProps<T> {
  data: T;
  done: boolean;
  /** Points earned (done) or at stake (not done yet). */
  points: number;
  onComplete: () => void;
  onMiss: () => void;
}

function DataTable({ table }: { table: Table }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>{table.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionBlock({ s }: { s: Section }) {
  return (
    <section className="lsec">
      <h2>{s.heading}</h2>
      {s.body.map((p, i) => <p key={i}>{p}</p>)}
      {s.bullets && <ul>{s.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
      {s.table && <DataTable table={s.table} />}
      {s.callout && (
        <aside className="callout">
          <span className="eyebrow" style={{ color: "var(--ink)" }}>{s.callout.label}</span>
          <p>{s.callout.text}</p>
        </aside>
      )}
    </section>
  );
}

function QuestionBlock({ q, done, onRight, onWrong, kicker }: { q: Question; done: boolean; onRight: () => void; onWrong: () => void; kicker: string }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [tried, setTried] = useState<string[]>([]);
  const solved = done || picked === q.correct;
  const wrong = !!picked && !solved;
  const pick = (id: string) => {
    if (solved) return;
    setPicked(id);
    if (id === q.correct) return onRight();
    // Each wrong option costs points once, however many times it is clicked.
    if (!tried.includes(id)) {
      setTried((t) => [...t, id]);
      onWrong();
    }
  };
  return (
    <section className="card">
      <span className="eyebrow">{kicker}</span>
      <h2 className="qtitle">{q.prompt}</h2>
      <div className="opts text">
        {q.options.map((o, i) => {
          const right = solved && o.id === q.correct;
          const bad = picked === o.id && !right;
          return (
            <button key={o.id} type="button" className={`opt ${right ? "right" : bad ? "wrong" : ""}`} onClick={() => pick(o.id)} aria-pressed={picked === o.id}>
              <span className="letter">{String.fromCharCode(65 + i)}</span>
              <span style={{ flex: 1 }}>{o.text}</span>
              {right && <Check size={24} color="#0E7C7B" w={3.4} />}
            </button>
          );
        })}
      </div>
      {wrong && picked && <div role="status" className="hint">{q.hints[picked] ?? "Not quite. Try another option."}</div>}
      {solved && <div role="status" className="hint ok">{q.explanation}</div>}
    </section>
  );
}

function Checklist({ items, done, onAllTicked, label }: { items: string[]; done: boolean; onAllTicked: () => void; label: string }) {
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => done));
  const all = done || ticked.every(Boolean);
  return (
    <section className="card">
      <span className="eyebrow">Checklist</span>
      <ul className="checks">
        {items.map((it, i) => (
          <li key={it}>
            <label>
              <input
                type="checkbox"
                checked={done || ticked[i]}
                disabled={done}
                onChange={() => setTicked((t) => t.map((v, j) => (j === i ? !v : v)))}
              />
              <span>{it}</span>
            </label>
          </li>
        ))}
      </ul>
      {!done && (
        <button type="button" className="cta dark" disabled={!all} onClick={onAllTicked} style={{ alignSelf: "flex-start" }}>
          {all ? label : `Tick all ${items.length} items to continue`}
        </button>
      )}
    </section>
  );
}

export const PointsEarned = ({ points }: { points: number }) => (
  <span className="pill gold" style={{ alignSelf: "flex-start", fontWeight: 800 }}><Star fill="#fff" size={18} />+{points} points</span>
);

const Head = ({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) => (
  <header className="card">
    <span className="eyebrow">{kicker}</span>
    <h1>{title}</h1>
    {children}
  </header>
);

export function ReadingStep({ data, done, points, onComplete, onMiss }: StepProps<Reading>) {
  return (
    <>
      <Head kicker={data.kicker} title={data.title}><p className="lead">{data.intro}</p></Head>
      <article className="card prose">{data.sections.map((s) => <SectionBlock key={s.heading} s={s} />)}</article>
      <section className="card">
        <span className="eyebrow">Takeaways</span>
        <ul className="checks static">{data.takeaways.map((t) => <li key={t}><Check size={20} color="#0E7C7B" /> <span>{t}</span></li>)}</ul>
      </section>
      {data.check && (
        <>
          <QuestionBlock q={data.check} done={done} onRight={onComplete} onWrong={onMiss} kicker="Check your understanding" />
          {done && <PointsEarned points={points} />}
        </>
      )}
    </>
  );
}

export function CaseStudyStep({ data, done, points, onComplete, onMiss }: StepProps<CaseStudy>) {
  return (
    <>
      <Head kicker={data.kicker} title={data.title}><p className="lead">{data.context}</p></Head>
      <div className="numbers">
        {data.numbers.map((n) => <div key={n.label}><strong>{n.value}</strong><span>{n.label}</span></div>)}
      </div>
      <section className="card">
        <span className="eyebrow">What happened</span>
        <ol className="timeline">{data.timeline.map((t) => <li key={t.label}><b>{t.label}</b><span>{t.text}</span></li>)}</ol>
      </section>
      <section className="card">
        <span className="eyebrow">Lessons</span>
        <ul className="checks static">{data.lessons.map((l) => <li key={l}><Check size={20} color="#0E7C7B" /> <span>{l}</span></li>)}</ul>
      </section>
      <QuestionBlock q={data.question} done={done} onRight={onComplete} onWrong={onMiss} kicker="Your call" />
      {done && <PointsEarned points={points} />}
      <footer className="sources">
        <span className="eyebrow">Sources</span>
        <ul>{data.sources.map((s) => <li key={s}>{s}</li>)}</ul>
      </footer>
    </>
  );
}

export function LabStepView({ data, done, points, onComplete }: StepProps<Lab>) {
  return (
    <>
      <Head kicker={data.kicker} title={data.title}>
        <p className="lead">{data.goal}</p>
        <div className="row" style={{ gap: 8 }}>
          <span className="pill">⏱ {data.duration}</span>
          {data.prerequisites.map((p) => <span key={p} className="pill">{p}</span>)}
        </div>
      </Head>
      <ol className="labsteps">
        {data.steps.map((s, i) => (
          <li key={s.title} className="card">
            <span className="eyebrow">Step {i + 1}</span>
            <h2>{s.title}</h2>
            {s.body.map((p, j) => <p key={j}>{p}</p>)}
            {s.code && <pre className="code" aria-label={`${s.code.lang} snippet`}><code>{s.code.text}</code></pre>}
          </li>
        ))}
      </ol>
      <Checklist items={data.checklist} done={done} onAllTicked={onComplete} label={`Mark the lab done (+${points} points)`} />
      {done && <PointsEarned points={points} />}
    </>
  );
}

export function DeliverableStepView({ data, done, points, onComplete }: StepProps<DeliverableStep>) {
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(data.template);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([data.template], { type: "text/markdown;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = data.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <Head kicker={data.kicker} title={data.title}><p className="lead">{data.purpose}</p></Head>
      <section className="card">
        <div className="row between">
          <span className="eyebrow">Template · {data.fileName}</span>
          <div className="row" style={{ gap: 8 }}>
            <button type="button" className="pill" onClick={copy}>{copied === "ok" ? "Copied" : "Copy"}</button>
            <button type="button" className="pill gold" onClick={download}>Download .md</button>
          </div>
        </div>
        {copied === "fail" && <div role="status" className="hint">Copy is blocked in this browser. Use Download instead.</div>}
        <pre className="code tpl"><code>{data.template}</code></pre>
      </section>
      <Checklist items={data.checklist} done={done} onAllTicked={onComplete} label={`My deliverable is filled in (+${points} points)`} />
      {done && <PointsEarned points={points} />}
    </>
  );
}
