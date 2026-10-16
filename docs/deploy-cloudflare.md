# Deploy on Cloudflare Workers

This site stays a normal Next.js app. `npm run dev` and `npm run build` are unchanged (`next` with webpack). Cloudflare packaging is a separate step: OpenNext writes a Worker into `.open-next/`, and Wrangler is the only tool that talks to Cloudflare.

Do not run upload or deploy until the owner says so. Local build and local preview do not need a Cloudflare login and do not send secrets anywhere.

There is no custom domain, no route, and no variable block in `wrangler.jsonc`. The Worker name is `personal-web`. `workers_dev` is on, so a future deploy can use the `workers.dev` subdomain. `preview_urls` is on, so an uploaded version can get a version preview URL. No R2, KV, D1, Images, or other paid binding is configured.

## Build

From the repo root:

```bash
npm run cf:build
```

That runs `opennextjs-cloudflare build`. It calls the existing `npm run build` (`next build --webpack`), then writes `.open-next/worker.js` and `.open-next/assets`.

`.open-next/` and `.wrangler/` are gitignored. Do not commit them.

## Local preview

Day-to-day work stays on the Next.js dev server:

```bash
npm run dev
```

`next.config.ts` calls `initOpenNextCloudflareForDev()` only when `NODE_ENV` is `development`, so `npm run dev` can see local Cloudflare bindings. The production build does not call it.

To run the production build inside the Workers runtime on this machine:

```bash
npm run cf:preview
```

That builds again, then runs `opennextjs-cloudflare preview`. It does not deploy.

Copy `.dev.vars.example` to `.dev.vars` and fill values only on your machine. `.dev.vars` is gitignored. The example file has empty values on purpose. Wrangler reads `.dev.vars` for local preview. Next.js also reads `.env` files. OpenNext’s dev-deploy guide says a local `.dev.vars` or Next `.env` file can override what you expect during `build`. For a repeatable production build, set variables in the build environment (or Workers Builds) instead of relying on a laptop file.

`NEXTJS_ENV` selects which Next `.env` file OpenNext loads. If it is unset, OpenNext uses `production`.

## Environment keys

Every key from `.env.example` is listed below. Nothing here has a value. Do not paste real values into git, into this doc, or into chat.

Two different clocks apply:

1. **Build time.** Next.js copies every `NEXT_PUBLIC_*` value into the browser bundle while `cf:build` runs. Changing a Worker secret later does not change those already-built public values. Set them in the environment of the build (or in a local `.env.production` that is not committed) before `npm run cf:build`. Public keys from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` (canonical URL, sitemap, SEO)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public anon key; still do not commit it)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
2. **Runtime.** Server-only keys are read when a request runs. With `nodejs_compat`, the Worker sees secrets on `process.env`. Put those on the Worker with Wrangler. They are not required in the client bundle.

The site still builds with these empty. Account, payment, mail, and analytics features stay off until the matching keys exist.

### `wrangler secret put` deploys immediately

`npx wrangler secret put <NAME>` stores the secret, creates a new Worker version, and **deploys that version immediately**. It is a production change. Do not run it without owner approval.

```bash
npx wrangler secret put NEXT_PUBLIC_SITE_URL
npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put PAYMOB_API_KEY
npx wrangler secret put PAYMOB_INTEGRATION_ID
npx wrangler secret put PAYMOB_HMAC_SECRET
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_TO_EMAIL
npx wrangler secret put MAILCHIMP_API_KEY
npx wrangler secret put MAILCHIMP_AUDIENCE_ID
npx wrangler secret put NEXT_PUBLIC_GA_ID
npx wrangler secret put NEXT_PUBLIC_PLAUSIBLE_DOMAIN
```

Each command prompts for the value. It does not take the value as an argument. Even the `NEXT_PUBLIC_*` names are listed, because they exist in `.env.example`. A secret put does **not** rebuild the client bundle. For public keys, rebuild with `npm run cf:build` after the value is in the build environment, then upload or deploy that new build. Use the secret only so server code can also read the same name at runtime.

### `wrangler versions secret put` does not deploy

For a staged version (preview URL or a gradual rollout), use `versions secret put`. Cloudflare’s secrets docs say this command only creates a new version. It does not send traffic to that version. You deploy it later with `npx wrangler versions deploy`, which also needs owner approval.

```bash
npx wrangler versions secret put NEXT_PUBLIC_SITE_URL
npx wrangler versions secret put NEXT_PUBLIC_SUPABASE_URL
npx wrangler versions secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
npx wrangler versions secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler versions secret put STRIPE_SECRET_KEY
npx wrangler versions secret put NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
npx wrangler versions secret put STRIPE_WEBHOOK_SECRET
npx wrangler versions secret put PAYMOB_API_KEY
npx wrangler versions secret put PAYMOB_INTEGRATION_ID
npx wrangler versions secret put PAYMOB_HMAC_SECRET
npx wrangler versions secret put RESEND_API_KEY
npx wrangler versions secret put CONTACT_TO_EMAIL
npx wrangler versions secret put MAILCHIMP_API_KEY
npx wrangler versions secret put MAILCHIMP_AUDIENCE_ID
npx wrangler versions secret put NEXT_PUBLIC_GA_ID
npx wrangler versions secret put NEXT_PUBLIC_PLAUSIBLE_DOMAIN
```

Same rebuild rule for `NEXT_PUBLIC_*`: the public value must be present at `cf:build` time. `versions secret put` only attaches a runtime secret to a new unpublished version.

`middleware.ts` stays the Edge middleware file. Do not rename it to `proxy.ts`. Next.js 16’s proxy file runs on Node.js. This project keeps the Edge middleware.

## Preview version (upload only)

When the owner wants a Cloudflare preview version, not production:

```bash
npm run cf:upload
```

That builds, then runs `opennextjs-cloudflare upload`. OpenNext’s deploy guide says `upload` creates a new version and does not start serving it. With `preview_urls` enabled, that version can be opened on a preview URL (`<version>-personal-web.<subdomain>.workers.dev`) without moving production traffic. This still writes to the Cloudflare account, so run it only when the owner asks for a preview upload.

## Production deploy

Production goes live only after the owner approves that exact step.

```bash
npm run cf:deploy
```

That builds, then runs `opennextjs-cloudflare deploy`, which uploads and starts serving the Worker. `npx wrangler versions deploy` is the other production switch, used after a staged upload or `versions secret put`. Neither command is part of local setup.

## Free plan

No paid bindings are configured. The Worker script limit on both Free and Paid is 64 MiB uncompressed. Cloudflare does not apply a compressed (gzip) size limit. Static files live in Workers assets, not inside that script limit. Free plan also caps the Worker at 10 ms of CPU per request, 100,000 requests per day, and 128 MB of memory. Observability is enabled so logs can be inspected. Workers Logs on the Free plan include 200,000 events per day and 3 days of retention. Starting 1 December 2026, Cloudflare’s newer observability pricing gives the Free plan 0.5 GB of log ingestion per day and does not sell extra ingestion on Free. Logs are not a paid add-on in this config. Logpush, tail Workers, R2 cache, and a higher CPU limit are not turned on.
