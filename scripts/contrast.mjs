/**
 * فحص تباين الألوان الآلي — بيمشي على الصفحات في الوضعين (نهاري وليلي)
 * ويطلّع أي نصّ تباينه تحت معيار WCAG AA.
 *
 * التشغيل:
 *   npm run build && npx next start -p 3000
 *   npm run contrast                       # بيفحص localhost:3000
 *   npm run contrast -- http://localhost:3100 /courses /about
 *
 * ⚠️ مهم: بنرسم كل لون فعليًا على <canvas> ونقرا البكسل — مش بنحلّل نصّ اللون.
 * السبب: getComputedStyle بترجّع oklab(...) و lab(...)، واللي بيحاول يقراهم
 * كأنهم rgb() بيطلّع أرقام غلط تمامًا.
 *
 * المرجع: docs/DESIGN.md §11.1
 */
import { chromium } from "playwright";

const DEFAULT_PAGES = [
  "/", "/courses", "/about", "/pricing", "/contact", "/quiz", "/faq",
  "/roadmap", "/projects", "/articles", "/levels/beginner", "/levels/advanced",
  "/courses/ai-essentials", "/enroll/ai-essentials", "/login",
];

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) ?? "http://localhost:3000";
const paths = args.filter((a) => a.startsWith("/"));
const pages = paths.length ? paths : DEFAULT_PAGES;

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM ?? undefined,
});

let failures = 0;

for (const mode of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: mode });
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: "load", timeout: 60000 });
    const bad = await page.evaluate(() => {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 1;
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      const cache = new Map();
      const toRGBA = (str) => {
        if (cache.has(str)) return cache.get(str);
        ctx.globalCompositeOperation = "copy";
        ctx.fillStyle = str;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        const v = [d[0], d[1], d[2], d[3] / 255];
        cache.set(str, v);
        return v;
      };
      const lum = (c) => {
        const [r, g, b] = c.slice(0, 3).map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const bgOf = (el) => {
        let n = el, first = null;
        while (n && n !== document.documentElement) {
          const c = toRGBA(getComputedStyle(n).backgroundColor);
          if (c[3] > 0.05) {
            if (!first) first = c;
            if (c[3] > 0.92) return first[3] > 0.92 ? first : c;
          }
          n = n.parentElement;
        }
        return toRGBA(getComputedStyle(document.body).backgroundColor);
      };
      const out = [];
      document
        .querySelectorAll("h1,h2,h3,h4,p,span,li,a,button,strong,div,label,td,th")
        .forEach((el) => {
          const hasText = [...el.childNodes].some(
            (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
          );
          if (!hasText) return;
          const r = el.getBoundingClientRect();
          if (r.width < 4 || r.height < 4) return;
          const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.2) return;
          // النصّ المتدرّج بيتلوّن بـbackground-clip مش بـcolor — نتخطّاه
          if (cs.webkitBackgroundClip === "text" || cs.backgroundClip === "text") return;
          const fg = toRGBA(cs.color);
          const bg = bgOf(el);
          const a = fg[3] * +cs.opacity;
          const mix = [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
          const L1 = lum(mix), L2 = lum(bg);
          const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          const size = parseFloat(cs.fontSize), weight = +cs.fontWeight;
          const need = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;
          if (ratio < need) {
            out.push({
              text: el.innerText.trim().slice(0, 34),
              ratio: +ratio.toFixed(2),
              need,
              px: Math.round(size),
              cls: String(el.className || "").slice(0, 58),
            });
          }
        });
      return out;
    });
    if (bad.length) {
      failures += bad.length;
      console.log(`\n### ${mode} ${path}  (${bad.length})`);
      bad.slice(0, 10).forEach((x) => console.log("  ", JSON.stringify(x)));
    }
  }
  await page.close();
}

await browser.close();
console.log(failures ? `\n❌ ${failures} موضع تباينه تحت المعيار` : "\n✅ كل النصوص عدّت معيار AA");
process.exit(failures ? 1 : 0);
