import { notFound } from "next/navigation";
import LessonView from "@/components/LessonView";
import { LEVELS, getLevel } from "@/lib/curriculum";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEVELS.map((l) => ({ n: String(l.n) }));
}

export default async function LevelPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const level = Number(n);
  if (!Number.isInteger(level) || !getLevel(level)) notFound();
  return <LessonView level={level} />;
}
