"use client";

// Learner progress, stored in localStorage (decisions 0003, 0006 and 0007).
// Records, per unit, the points earned and the completion date, plus wrong answers on quiz units.
// v3 matches the 8-module trail. v1 and v2 used the former 0-10 numbering and other content: they are
// not migrated (no meaningful mapping) and are left untouched in storage.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MAX_MODULE, MODULES, UNITS } from "./curriculum";
import { maxUnitPoints, nextRankOf, rankOf, unitPoints, type Rank } from "./scoring";

const KEY = "agent-path:v3";

interface UnitRecord {
  points: number;
  /** Completion date, YYYY-MM-DD (local). */
  at: string;
}

interface Stored {
  /** module -> unit -> record */
  units: Record<number, Record<number, UnitRecord>>;
  /** module -> unit -> wrong answers given before completion */
  misses: Record<number, Record<number, number>>;
}

const EMPTY: Stored = { units: {}, misses: {} };

const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const isIndex = (k: string, max: number) => /^\d+$/.test(k) && Number(k) <= max;
const isModule = (k: string) => /^\d+$/.test(k) && MODULES.some((m) => m.n === Number(k));
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Keeps only well-formed entries; anything else in storage is dropped. */
function sanitize(raw: unknown): Stored {
  const out: Stored = { units: {}, misses: {} };
  if (!isObj(raw)) return out;
  if (isObj(raw.units)) {
    for (const [m, unitsOfM] of Object.entries(raw.units)) {
      if (!isModule(m) || !isObj(unitsOfM)) continue;
      for (const [u, rec] of Object.entries(unitsOfM)) {
        if (!isIndex(u, UNITS.length - 1) || !isObj(rec)) continue;
        const { points, at } = rec;
        if (typeof points !== "number" || !Number.isFinite(points) || points < 0 || points > maxUnitPoints(Number(u))) continue;
        if (typeof at !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(at)) continue;
        (out.units[Number(m)] ??= {})[Number(u)] = { points, at };
      }
    }
  }
  if (isObj(raw.misses)) {
    for (const [m, missOfM] of Object.entries(raw.misses)) {
      if (!isModule(m) || !isObj(missOfM)) continue;
      for (const [u, n] of Object.entries(missOfM)) {
        if (!isIndex(u, UNITS.length - 1) || typeof n !== "number" || !Number.isInteger(n) || n < 0) continue;
        (out.misses[Number(m)] ??= {})[Number(u)] = Math.min(n, 99);
      }
    }
  }
  return out;
}

function load(): Stored {
  const raw = localStorage.getItem(KEY);
  return raw ? sanitize(JSON.parse(raw)) : EMPTY;
}

interface Ctx {
  ready: boolean;
  points: number;
  /** Module numbers whose badge is earned (all units done). */
  completedModules: number[];
  /** First module without its badge (MAX_MODULE once everything is done). */
  currentModule: number;
  rank: Rank;
  nextRank: Rank | null;
  isUnitDone: (m: number, u: number) => boolean;
  /** Points earned on a unit, or the points it would pay if completed now. */
  unitValue: (m: number, u: number) => number;
  modulePoints: (m: number) => number;
  /** Date the badge was earned (YYYY-MM-DD), or null. */
  badgeDate: (m: number) => string | null;
  isModuleDone: (m: number) => boolean;
  recordMiss: (m: number, u: number) => void;
  completeUnit: (m: number, u: number) => void;
  reset: () => void;
}

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Stored>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setData(load());
    } catch {
      /* corrupted or unavailable storage: start empty */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Stored) => {
    setData(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage full or blocked: keep in-memory state */
    }
  }, []);

  const isUnitDone = useCallback((m: number, u: number) => !!data.units[m]?.[u], [data]);
  const misses = useCallback((m: number, u: number) => data.misses[m]?.[u] ?? 0, [data]);
  const unitValue = useCallback(
    (m: number, u: number) => data.units[m]?.[u]?.points ?? unitPoints(u, misses(m, u)),
    [data, misses]
  );
  const isModuleDone = useCallback((m: number) => Object.keys(data.units[m] ?? {}).length >= UNITS.length, [data]);
  const modulePoints = useCallback(
    (m: number) => Object.values(data.units[m] ?? {}).reduce((sum, r) => sum + r.points, 0),
    [data]
  );
  const badgeDate = useCallback(
    (m: number) => (isModuleDone(m) ? Object.values(data.units[m]).map((r) => r.at).sort().at(-1) ?? null : null),
    [data, isModuleDone]
  );

  const recordMiss = useCallback(
    (m: number, u: number) => {
      if (data.units[m]?.[u]) return;
      persist({ ...data, misses: { ...data.misses, [m]: { ...data.misses[m], [u]: misses(m, u) + 1 } } });
    },
    [data, misses, persist]
  );

  const completeUnit = useCallback(
    (m: number, u: number) => {
      if (data.units[m]?.[u]) return;
      const record = { points: unitPoints(u, misses(m, u)), at: dayKey() };
      persist({ ...data, units: { ...data.units, [m]: { ...data.units[m], [u]: record } } });
    },
    [data, misses, persist]
  );

  const reset = useCallback(() => persist(EMPTY), [persist]);

  const value = useMemo<Ctx>(() => {
    const completedModules = MODULES.filter((m) => isModuleDone(m.n)).map((m) => m.n);
    const first = MODULES.find((m) => !completedModules.includes(m.n));
    const points = MODULES.reduce((sum, m) => sum + modulePoints(m.n), 0);
    const rank = rankOf(completedModules.length, points);
    return {
      ready,
      points,
      completedModules,
      currentModule: first ? first.n : MAX_MODULE,
      rank,
      nextRank: nextRankOf(rank),
      isUnitDone,
      unitValue,
      modulePoints,
      badgeDate,
      isModuleDone,
      recordMiss,
      completeUnit,
      reset,
    };
  }, [ready, isUnitDone, unitValue, modulePoints, badgeDate, isModuleDone, recordMiss, completeUnit, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
