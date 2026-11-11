import { Suspense } from "react";
import { notFound } from "next/navigation";
import LessonView, { LessonFromUrl } from "@/components/LessonView";
import { MODULES, getModule } from "@/lib/curriculum";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODULES.map((m) => ({ n: String(m.n) }));
}

export default async function ModulePage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const module = Number(n);
  if (!Number.isInteger(module) || !getModule(module)) notFound();
  return (
    <Suspense fallback={<LessonView module={module} startUnit={null} />}>
      <LessonFromUrl module={module} />
    </Suspense>
  );
}
