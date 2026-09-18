"use client";
/** محرّك اختبار تحديد المستوى — سؤال في كل مرة مع شريط تقدّم. */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { resolveQuizResult } from "@/lib/queries";
import { track } from "@/lib/analytics";
import { accentFor, levelShortLabel } from "@/lib/tokens";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/course/course-card";
import type { Course, QuizQuestion } from "@/types";

export function QuizRunner({
  questions,
  courses,
}: {
  questions: QuizQuestion[];
  courses: Course[];
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const score = useMemo(() => answers.reduce((s, v) => s + v, 0), [answers]);
  const result = useMemo(() => (done ? resolveQuizResult(score) : null), [done, score]);

  const recommended = useMemo(() => {
    if (!result) return [];
    return courses.filter((c) => c.level === result.level).slice(0, 3);
  }, [result, courses]);

  function choose(value: number) {
    if (step === 0) track("start_quiz");
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setDone(true);
      const total_ = next.reduce((s, v) => s + v, 0);
      track("finish_quiz", { score: total_, level: resolveQuizResult(total_).level });
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setDone(false);
  }

  if (done && result) {
    const accent = accentFor(result.level);
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl"
      >
        <div className="rounded-[28px] border border-line bg-surface p-8 text-center noise ring-gradient md:p-12">
          <Badge
            tone={result.level === "beginner" ? "aqua" : result.level === "intermediate" ? "brand" : "gold"}
            size="lg"
            className="mb-5"
          >
            {levelShortLabel[result.level]}
          </Badge>
          <h2 className={cn("text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] font-black", accent.text)}>
            {result.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.95] text-fg-muted">
            {result.message}
          </p>
          <p className="mt-5 text-[13px] text-fg-subtle">
            درجتك: <span className="ltr-nums font-bold">{formatNumber(score)}</span> من{" "}
            <span className="ltr-nums font-bold">{formatNumber(total * 3)}</span>
          </p>
          <Button
            onClick={restart}
            variant="ghost"
            size="sm"
            icon={<RotateCcw />}
            className="mt-4"
          >
            أعِد الاختبار
          </Button>
        </div>

        {recommended.length > 0 && (
          <section className="mt-12">
            <h3 className="mb-6 text-xl font-extrabold text-fg">الكورسات اللي أرشّحهالك</h3>
            <ul className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommended.map((c) => (
                <li key={c.slug} className="h-full">
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </motion.div>
    );
  }

  const q = questions[step]!;

  return (
    <div className="mx-auto max-w-2xl">
      {/* التقدّم */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-[13px] text-fg-subtle">
          <span>
            سؤال <span className="ltr-nums font-bold text-fg">{formatNumber(step + 1)}</span> من{" "}
            <span className="ltr-nums">{formatNumber(total)}</span>
          </span>
          <span className="ltr-nums">{formatNumber(Math.round(((step + 1) / total) * 100))}٪</span>
        </div>
        <Progress value={step + 1} max={total} label="تقدّم الاختبار" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(1.25rem,2.5vw+0.5rem,1.625rem)] font-extrabold leading-snug text-fg">
            {q.question}
          </h2>

          <ul className="mt-7 flex flex-col gap-3">
            {q.options.map((opt) => (
              <li key={opt.label}>
                <button
                  onClick={() => choose(opt.score)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-5 text-start",
                    "text-[15px] font-medium text-fg-muted shadow-soft transition-all",
                    "hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-fg hover:shadow-lift",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ring)",
                  )}
                >
                  <span className="size-4 shrink-0 rounded-full border-2 border-line-strong transition-colors group-hover:border-brand-500" />
                  <span className="flex-1">{opt.label}</span>
                  <ArrowLeft className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      {step > 0 && (
        <Button
          onClick={() => setStep(step - 1)}
          variant="ghost"
          size="sm"
          icon={<ArrowRight />}
          className="mt-6"
        >
          رجوع
        </Button>
      )}
    </div>
  );
}
