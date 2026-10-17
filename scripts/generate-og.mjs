/**
 * توليد صورة المشاركة (OpenGraph) كملف PNG ثابت.
 *
 * ليه مش بـ`next/og` الديناميكية؟ لأن محرّكها (Satori) لسه ما بيدعمش
 * تشكيل الحروف العربية بالكامل، وبيرمي: "substFormat: 3 is not yet supported".
 * فبنرسمها بمتصفّح حقيقي — ودي بتطلع مظبوطة ١٠٠٪.
 *
 * التشغيل:  node scripts/generate-og.mjs
 * المخرج:   public/og-default.png     (١٢٠٠×٦٣٠، الموقع العربي)
 *           public/og-workshop.png    (١٢٠٠×٦٣٠، عنوان الورشة واسم Mohamed Fawzy فقط)
 *
 * شغّلها تاني بعد أي تغيير في src/content/site.ts أو عنوان الورشة في src/content/workshop.ts
 */
import { chromium } from "playwright";
import { writeFileSync, readFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// نقرا البيانات من ملف المحتوى مباشرة عشان الصورة تفضل متطابقة معاه
const siteSrc = readFileSync(join(root, "src/content/site.ts"), "utf8");
const pick = (key) => siteSrc.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? "";

const name = pick("name");
const role = pick("role");
const tagline = pick("tagline");

const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@500;800;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;font-family:Tajawal,sans-serif;
       background:linear-gradient(135deg,#0d0e14 0%,#16121f 55%,#101a22 100%);
       display:flex;flex-direction:column;align-items:center;justify-content:center;
       position:relative;overflow:hidden;padding:80px;text-align:center}
  .blob{position:absolute;border-radius:9999px;filter:blur(10px)}
  .b1{top:-160px;inset-inline-end:40px;width:520px;height:520px;
      background:radial-gradient(circle,rgba(139,92,246,.42),transparent 70%)}
  .b2{bottom:-180px;inset-inline-start:20px;width:460px;height:460px;
      background:radial-gradient(circle,rgba(34,200,220,.28),transparent 70%)}
  .b3{top:40%;inset-inline-start:45%;width:340px;height:340px;
      background:radial-gradient(circle,rgba(234,179,8,.16),transparent 70%)}
  .grid{position:absolute;inset:0;
        background-image:linear-gradient(to left,rgba(255,255,255,.045) 1px,transparent 1px),
                         linear-gradient(to bottom,rgba(255,255,255,.045) 1px,transparent 1px);
        background-size:64px 64px;
        -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 10%,transparent 75%)}
  .role{position:relative;font-size:30px;font-weight:500;color:#c4b5fd;margin-bottom:26px}
  h1{position:relative;font-size:82px;font-weight:900;color:#fafaf9;line-height:1.3;margin-bottom:26px}
  .tag{position:relative;font-size:38px;font-weight:500;color:#a1a1aa;line-height:1.6;max-width:940px}
  .chips{position:relative;margin-top:44px;display:flex;gap:16px}
  .chip{font-size:24px;font-weight:800;color:#e4e4e7;border:1px solid rgba(255,255,255,.14);
        border-radius:999px;padding:10px 26px;background:rgba(255,255,255,.05)}
</style></head><body>
  <div class="grid"></div><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
  <div class="role">${role}</div>
  <h1>${name}</h1>
  <div class="tag">${tagline}</div>
  <div class="chips"><span class="chip">مبتدئ</span><span class="chip">متوسط</span><span class="chip">متقدّم</span></div>
</body></html>`;

const workshopSrc = readFileSync(join(root, "src/content/workshop.ts"), "utf8");
const headline = workshopSrc.match(/headline:\s*"([^"]+)"/)?.[1] ?? "";
const ownerName = workshopSrc.match(/owner:\s*\{[^}]*name:\s*"([^"]+)"/)?.[1] ?? "";
if (headline !== "Build your AI agent team" || ownerName !== "Mohamed Fawzy") {
  throw new Error(`Workshop card must be the headline and Mohamed Fawzy only. Got "${headline}" / "${ownerName}"`);
}

const workshopHtml = `<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;font-family:Geist,ui-sans-serif,system-ui,sans-serif;
       background:oklch(21.1% 0.017 234);color:oklch(98.5% 0.002 240);
       display:flex;flex-direction:column;justify-content:center;padding:88px 96px;
       position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;
        background-image:linear-gradient(to right,oklch(1 0 0 / 0.06) 1px,transparent 1px),
                         linear-gradient(to bottom,oklch(1 0 0 / 0.06) 1px,transparent 1px);
        background-size:64px 64px}
  .rule{position:relative;width:2rem;height:1px;background:oklch(62.9% 0.166 293.5);margin-bottom:28px}
  h1{position:relative;font-size:84px;font-weight:500;line-height:0.95;letter-spacing:-0.045em;max-width:980px}
  .name{position:relative;margin-top:36px;font-size:32px;font-weight:500;letter-spacing:-0.02em}
</style></head><body>
  <div class="grid"></div>
  <div class="rule"></div>
  <h1>${headline}</h1>
  <p class="name">${ownerName}</p>
</body></html>`;

function findChromium() {
  const fromEnv = process.env.PLAYWRIGHT_CHROMIUM;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  for (const candidate of ["/opt/pw-browsers/chromium", "/opt/google/chrome/chrome"]) {
    if (existsSync(candidate)) return candidate;
  }
  const cache = join(process.env.HOME ?? "", ".cache/ms-playwright");
  if (!existsSync(cache)) return undefined;
  const dirs = readdirSync(cache).filter((name) => name.startsWith("chromium-")).sort().reverse();
  for (const dir of dirs) {
    for (const relative of ["chrome-linux64/chrome", "chrome-linux/chrome"]) {
      const candidate = join(cache, dir, relative);
      if (existsSync(candidate)) return candidate;
    }
  }
  return undefined;
}

const executablePath = findChromium();
if (!executablePath) throw new Error("Chromium not found for OG generation");

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

async function shoot(markup, outfile) {
  await page.setContent(markup, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const buffer = await page.screenshot({ type: "png" });
  writeFileSync(join(root, outfile), buffer);
  console.log("wrote", outfile, buffer.length);
}

await shoot(html, "public/og-default.png");
await shoot(workshopHtml, "public/og-workshop.png");
await browser.close();
