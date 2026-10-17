# Deploy on Cloudflare Workers

This site stays a normal Next.js app. `npm run dev` and `npm run build` are unchanged (`next` with webpack). Cloudflare packaging is a separate step: OpenNext writes a Worker into `.open-next/`, and Wrangler is the only tool that talks to Cloudflare.

Do not run upload or deploy until the owner says so. Local build and local preview do not need a Cloudflare login and do not send secrets anywhere.

There is no custom domain and no route in `wrangler.jsonc`. The Worker name is `personal-web`. `workers_dev` is on, so a future deploy can use the `workers.dev` subdomain. `preview_urls` is on, so an uploaded version can get a version preview URL. No R2, KV, D1, Images, or other paid binding is configured.

`wrangler.jsonc` has one plain var, not a secret:

```jsonc
"vars": {
  "NEXT_PUBLIC_SITE_URL": "https://personal-web.mflma2040.workers.dev"
}
```

Next.js inlines `NEXT_PUBLIC_*` while `cf:build` runs. OpenNext does not copy `wrangler.jsonc` `vars` into that Next build automatically. `src/lib/utils.ts` (`DEFAULT_SITE_URL` / `siteUrl()`) uses the same workers.dev URL when `NEXT_PUBLIC_SITE_URL` is missing or blank, so the build still emits that canonical URL with no `.env` file. `src/content/site.ts` uses the same constant. A later custom domain should be set as a Workers Builds build variable named `NEXT_PUBLIC_SITE_URL` before the build, so Next can inline it. See [OpenNext env vars](https://opennext.js.org/cloudflare/howtos/env-vars).

## Build

From the repo root:

```bash
npm run cf:build
```

That runs `opennextjs-cloudflare build` only. It calls the existing `npm run build` (`next build --webpack`), then writes `.open-next/worker.js` and `.open-next/assets`. `cf:deploy` and `cf:upload` do not build.

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

1. **Build time.** Next.js copies every `NEXT_PUBLIC_*` value into the browser bundle while `cf:build` runs. Changing a Worker secret later does not change those already-built public values. Set them in the environment of the build (Workers Builds build variables, or a local `.env.production` that is not committed) before `npm run cf:build`. `NEXT_PUBLIC_SITE_URL` is the exception: if it is unset, the code fallback above is what the build uses. Other public keys from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public anon key; still do not commit it)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
2. **Runtime.** Server-only keys are read when a request runs. With `nodejs_compat`, the Worker sees secrets on `process.env`. Put those on the Worker with Wrangler. They are not required in the client bundle.

The site still builds with the integration keys empty. Account, payment, newsletter, and analytics stay off until the matching keys exist. Contact and manual enroll need `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Without them the contact page and the homepage contact section show `mailto:mflma2030@gmail.com` and `https://www.linkedin.com/in/mohamedfawzy1984/` instead of a form, and the dependent APIs return JSON `503` before any external client is created. First launch adds no secrets.

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

Each command prompts for the value. It does not take the value as an argument. Even the `NEXT_PUBLIC_*` names are listed, because they exist in `.env.example`. Do not run them for the first launch. `NEXT_PUBLIC_SITE_URL` is already a plain `vars` entry plus the code fallback, so it does not need `secret put`. A secret put does **not** rebuild the client bundle. For other public keys, rebuild with `npm run cf:build` after the value is in the build environment, then upload or deploy that new build. Use the secret only so server code can also read the same name at runtime.

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

When the owner wants a Cloudflare preview version, not production, build first, then upload:

```bash
npm run cf:build
npm run cf:upload
```

`npm run cf:upload` runs `opennextjs-cloudflare upload` only. It does not build. OpenNext’s deploy guide says `upload` creates a new version and does not start serving it. With `preview_urls` enabled, that version can be opened on a version preview URL (`<version>-personal-web.<subdomain>.workers.dev`) without moving production traffic. This still writes to the Cloudflare account, so run it only when the owner asks for a preview upload.

## Production deploy

Production goes live only after the owner approves that exact step.

```bash
npm run cf:build
npm run cf:deploy
```

`npm run cf:deploy` runs `opennextjs-cloudflare deploy` only. It does not build. Deploy uploads and starts serving the Worker. `npx wrangler versions deploy` is the other production switch, used after a staged upload or `versions secret put`. Neither command is part of local setup.

## Workers Builds dashboard settings

Do this in the Cloudflare dashboard when the owner connects Git. Do not deploy from a laptop as part of setup. Official notes: [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), [Build settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [Build branches](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/), [Build image / NODE_VERSION](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/), [OpenNext dev and deploy](https://opennext.js.org/cloudflare/howtos/dev-deploy), and [OpenNext CLI](https://opennext.js.org/cloudflare/cli).

These are the dashboard labels as of October 2026. Type the commands exactly.

The click path to keep is **Workers & Pages > Create > Import a repository > coolman1984/Personal-Web**. Where the dashboard uses a newer label, both names are listed below.

1. Open **Workers & Pages**.
2. Select **Create**. The current control label is **Create application**.
3. Select **Import a repository**. The current screen may show **Get started** next to **Import a repository**.
4. Select the Git account, then select `coolman1984/Personal-Web`. Install and authorize the Cloudflare GitHub app so Cloudflare can read the repo and build on every push.
5. On the project form, set these fields:
   - **Project name** (Worker name): `personal-web`. This must match `"name": "personal-web"` in `wrangler.jsonc`. A mismatch fails the build.
   - **Git branch** (production branch; the default is `main`): `main`. Later this is the dropdown under **Settings → Build → Branch control**.
   - **Build command**: `npx opennextjs-cloudflare build`
   - **Deploy command**: `npx opennextjs-cloudflare deploy`
   - **Preview command**: `npx opennextjs-cloudflare upload`
   - **Root directory**: `/`
6. Leave secrets empty. Do not add Supabase, Stripe, Paymob, Resend, Mailchimp, Google Analytics, or Plausible. `NEXT_PUBLIC_SITE_URL` is already in `wrangler.jsonc` and in the code fallback, so the first build does not need that name as a secret or as a build variable.
7. Select **Save and Deploy** only when the owner wants Git to ship this Worker. That button is the dashboard deploy. It is not a laptop command.
8. After the Worker exists, open **Settings → Build → Branch control** and turn on **Builds for non-production branches**. The current checkbox label is **Enable Preview Builds**. Every push that is not `main` then runs the **Build command**, then the **Preview command**. The non-production command stays `npx opennextjs-cloudflare upload` (version upload, preview URL, no traffic shift).
9. Keep the **Preview command** as `npx opennextjs-cloudflare upload`. New Workers default this field to `npx wrangler preview`, which creates a Worker Preview. This project uses OpenNext `upload` instead (`wrangler versions upload`). Cloudflare’s build settings say that `npx wrangler versions upload` creates a Worker version and a [version URL](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/) and does not promote it to the active deployment. `preview_urls` is already on in `wrangler.jsonc`, so that version can be opened without shifting production traffic. Do not put `npx wrangler deploy` in the **Preview command**.
10. The build image’s default Node.js is 24. Node 22 is already installed on the image. Set `NODE_VERSION` to `22` only if a build fails on 24. Add it under **Settings → Build → Build variables and secrets** (build-time only; it is not a runtime secret).

Workers Builds runs the build command and the deploy command as two steps. That is why `cf:deploy` and `cf:upload` in `package.json` do not call `build` themselves. OpenNext’s own get-started sample still chains `build && deploy` inside npm scripts. Do not copy that pattern into these dashboard fields, or the deploy step would build a second time.

## Free plan

No paid bindings are configured. The Worker script limit on both Free and Paid is 64 MiB uncompressed. Cloudflare does not apply a compressed (gzip) size limit. Static files live in Workers assets, not inside that script limit. Free plan also caps the Worker at 10 ms of CPU per request, 100,000 requests per day, and 128 MB of memory. Observability is enabled so logs can be inspected. Workers Logs on the Free plan include 200,000 events per day and 3 days of retention. Starting 1 December 2026, Cloudflare’s newer observability pricing gives the Free plan 0.5 GB of log ingestion per day and does not sell extra ingestion on Free. Logs are not a paid add-on in this config. Logpush, tail Workers, R2 cache, and a higher CPU limit are not turned on.
