"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LEVELS, MAX_LEVEL, STEPS } from "./curriculum";

const KEY = "agent-path:v1";

interface Stored {
  xp: number;
  /** level number -> indexes of completed steps (0..3) */
  steps: Record<number, number[]>;
  streak: number;
  lastDay: string | null; // YYYY-MM-DD (local)
}

const EMPTY: Stored = { xp: 0, steps: {}, streak: 0, lastDay: null };

const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
};

export interface TrophyState {
  id: string;
  tag: string;
  name: string;
  how: string;
  level: number | null;
  unlocked: boolean;
}

interface Ctx {
  ready: boolean;
  xp: number;
  streak: number;
  completedLevels: number[];
  currentLevel: number;
  trophies: TrophyState[];
  unlockedCount: number;
  nextLevelXp: number;
  isStepDone: (level: number, step: number) => boolean;
  isLevelDone: (level: number) => boolean;
  completeStep: (level: number, step: number, xp?: number) => void;
  reset: () => void;
}

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Stored>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupted or unavailable storage */
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

  const isStepDone = useCallback((l: number, s: number) => !!data.steps[l]?.includes(s), [data]);
  const isLevelDone = useCallback((l: number) => (data.steps[l]?.length ?? 0) >= STEPS.length, [data]);

  const completeStep = useCallback(
    (level: number, step: number, xp = 0) => {
      if (data.steps[level]?.includes(step)) return;
      const today = dayKey();
      let streak = data.streak;
      if (data.lastDay !== today) streak = data.lastDay === yesterdayKey() ? streak + 1 : 1;
      persist({
        xp: data.xp + xp,
        steps: { ...data.steps, [level]: [...(data.steps[level] ?? []), step] },
        streak,
        lastDay: today,
      });
    },
    [data, persist]
  );

  const reset = useCallback(() => persist(EMPTY), [persist]);

  const value = useMemo<Ctx>(() => {
    const completedLevels = LEVELS.filter((l) => (data.steps[l.n]?.length ?? 0) >= STEPS.length).map((l) => l.n);
    const first = LEVELS.find((l) => !completedLevels.includes(l.n));
    const currentLevel = first ? first.n : MAX_LEVEL;
    // The streak only counts while it is still alive (active today or yesterday).
    const alive = data.lastDay === dayKey() || data.lastDay === yesterdayKey();
    const streak = alive ? data.streak : 0;

    const trophies: TrophyState[] = [
      ...LEVELS.map((l) => ({
        id: `level-${l.n}`,
        tag: `Level ${l.n}`,
        name: l.trophy.name,
        how: l.trophy.how,
        level: l.n,
        unlocked: completedLevels.includes(l.n),
      })),
      {
        id: "streak-7",
        tag: "Consistency",
        name: "7-day streak",
        how: "Learn seven days in a row.",
        level: null,
        unlocked: streak >= 7,
      },
    ];

    return {
      ready,
      xp: data.xp,
      streak,
      completedLevels,
      currentLevel,
      trophies,
      unlockedCount: trophies.filter((t) => t.unlocked).length,
      nextLevelXp: 400 * Math.max(1, currentLevel),
      isStepDone,
      isLevelDone,
      completeStep,
      reset,
    };
  }, [data, ready, isStepDone, isLevelDone, completeStep, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
