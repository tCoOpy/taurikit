# TauriKit — Deploy Guide

Step-by-step to get TauriKit live.

## Prerequisites

- Cloudflare account (Workers, D1, R2, Pages)
- Stripe account (test or live)
- Resend account (for email delivery)
- GitHub repos created for `taurikit-cli`, `taurikit-api`, `taurikit-web`
- Domain: `taurikit.dev` pointed to Cloudflare

## 1. Deploy the API (`taurikit-api`)

### Create infrastructure

```sh
cd taurikit-api

# Create D1 database
wrangler d1 create taurikit-db
# → Copy the database_id into wrangler.toml

# Create R2 bucket
wrangler r2 bucket create taurikit-templates
```

### Configure secrets

```sh
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
```

### Update `wrangler.toml`

Set `STRIPE_PRICE_ID` to your Stripe Price ID, and replace the D1 `database_id` placeholder.

### Deploy

```sh
bun run deploy
```

### Run migrations

```sh
bun run db:migrate:remote
```

### Upload template

```sh
./scripts/upload-template.sh 0.1.0
```

### Configure custom domain

In the Cloudflare dashboard: Workers & Pages → taurikit-api → Settings → Domains & Routes → add `api.taurikit.dev`.

### Set up Stripe webhook

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://api.taurikit.dev/stripe/webhook`
- Events: `checkout.session.completed`
- Copy the signing secret → `wrangler secret put STRIPE_WEBHOOK_SECRET`

## 2. Deploy the landing page (`taurikit-web`)

### Create Pages project

```sh
cd taurikit-web
bun run build

# First deploy creates the project
wrangler pages deploy dist --project-name=taurikit-web
```

### Configure custom domain

In the Cloudflare dashboard: Workers & Pages → taurikit-web → Custom domains → add `taurikit.dev`.

### CI/CD

Push to `main` triggers `.github/workflows/deploy.yml`. Set these GitHub repo secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 3. Release the CLI (`taurikit-cli`)

### Push and tag

```sh
cd taurikit-cli
git add -A && git commit -m "v0.2.0"
git tag v0.2.0
git push origin main --tags
```

The release workflow builds binaries for all platforms and creates a GitHub Release.

### Verify install scripts

```sh
# macOS/Linux
curl -fsSL https://taurikit.dev/install.sh | sh

# Windows
irm https://taurikit.dev/install.ps1 | iex
```

The install scripts download from GitHub Releases, so the release must exist first.

### Host install scripts

Upload `install.sh` and `install.ps1` to the landing page's `public/` directory so they're served from `taurikit.dev/install.sh`.

```sh
cp taurikit-cli/install.sh taurikit-web/public/install.sh
cp taurikit-cli/install.ps1 taurikit-web/public/install.ps1
```

Then redeploy the landing page.

## 4. End-to-end verification

```sh
# 1. Install CLI
curl -fsSL https://taurikit.dev/install.sh | sh

# 2. Check prerequisites
taurikit doctor

# 3. Buy a license (or insert a test key directly via D1)
wrangler d1 execute taurikit-db --remote --command \
  "INSERT INTO licenses (id, email, key, plan) VALUES ('test', 'test@example.com', 'TK-TEST00000000-00000000-00000000-00000000-00000000', 'standard')"

# 4. Generate a project
export TAURIKIT_LICENSE_KEY=TK-TEST00000000-00000000-00000000-00000000-00000000
taurikit new "Test App" --auth github --ui shadcn --yes

# 5. Run it
cd test-app
bun install
bun tauri dev
```

## DNS summary

| Record | Type | Target |
|--------|------|--------|
| `taurikit.dev` | CNAME | Cloudflare Pages |
| `api.taurikit.dev` | CNAME/Worker Route | Cloudflare Workers |

## GitHub repo secrets (all repos)

| Secret | Used by |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | API deploy, site deploy |
| `CLOUDFLARE_ACCOUNT_ID` | API deploy, site deploy |
