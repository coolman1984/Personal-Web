/** جدول مقارنة المستويات التلاتة. */
import { getAllLevels, getCourseCountByLevel } from "@/lib/queries";
import { accentFor } from "@/lib/tokens";
import { cn, formatNumber } from "@/lib/utils";
import { getIcon } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import type { Level } from "@/types";

export async function CompareTable() {
  const [levels, counts] = await Promise.all([getAllLevels(), getCourseCountByLevel()]);

  // ⚠️ كل خلية بتتحسب من بيانات المستوى نفسه (`content/levels.ts`) بمعرّفه
  // (`level.id`)، مش برقم موضعه في المصفوفة — لو اتضاف مستوى رابع أو
  // اتغيّر ترتيبهم، الجدول بيفضل صح من غير ما نلمس الملف ده.
  const rows: { label: string; get: (level: Level) => string }[] = [
    { label: "الجملة", get: (level) => level.tagline },
    {
      label: "عدد الكورسات",
      get: (level) => `${formatNumber(counts[level.id] ?? 0)} كورسات`,
    },
    // أول عنصر في `prerequisites` بيلخّص المطلوب قبل ما تبدأ — نفس المعنى
    // المقصود هنا بالظبط.
    { label: "محتاج برمجة؟", get: (level) => level.prerequisites[0] ?? "—" },
    { label: "الأنسب لـ", get: (level) => level.audience[0] ?? "—" },
    { label: "أهم مخرج", get: (level) => level.outcomes[0] ?? "—" },
  ];

  return (
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full min-w-[46rem] border-separate border-spacing-0 text-start">
        <caption className="sr-only">مقارنة بين المستويات التلاتة</caption>
        <thead>
          <tr>
            <th scope="col" className="w-40 p-4 text-start text-[13px] font-bold text-fg-subtle">
              وجه المقارنة
            </th>
            {levels.map((level) => {
              const Icon = getIcon(level.icon);
              const accent = accentFor(level.id);
              return (
                <th key={level.id} scope="col" className="p-4 text-start align-top">
                  <span className="flex flex-col gap-2">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl border",
                        accent.bg,
                        accent.border,
                        accent.text,
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="text-base font-extrabold text-fg">{level.shortLabel}</span>
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="border-t border-line p-4 text-start align-top text-[13px] font-bold text-fg-subtle"
              >
                {row.label}
              </th>
              {levels.map((level) => (
                <td
                  key={level.id}
                  className="border-t border-line p-4 align-top text-[14px] leading-snug text-fg-muted"
                >
                  {row.get(level)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="border-t border-line p-4" />
            {levels.map((level) => (
              <td key={level.id} className="border-t border-line p-4">
                <Button href={`/levels/${level.id}`} variant="secondary" size="sm" fullWidth>
                  شوف المستوى
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
