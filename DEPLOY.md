# TauriKit — Deploy Guide

Step-by-step to get TauriKit live.

## Prerequisites

- Railway account (for API + PostgreSQL)
- Cloudflare account (Pages — for static sites)
- Stripe account (test or live)
- Resend account (for email delivery)
- Domain: `taurikit.dev`

## 1. Deploy the API (`taurikit-api`)

### Create Railway project

1. Go to https://railway.com/new → **Deploy from GitHub repo** → select `tCoOpy/taurikit`
2. Set **Root Directory** to `taurikit-api`
3. Add a **PostgreSQL** database service (click **+ New** → **Database** → **PostgreSQL**)
4. Railway auto-injects `DATABASE_URL` when Postgres is linked

### Set environment variables

In Railway → your API service → **Variables**:

```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
RESEND_API_KEY=re_...
ADMIN_KEY=<generate-a-random-secret>
PORT=3000
```

Generate `ADMIN_KEY` with: `openssl rand -hex 32`

### Run migrations

After first deploy, open the Railway service shell or use the Railway CLI:

```sh
railway run bun run db:migrate
```

### Upload initial template

```sh
export API_URL=https://<your-railway-domain>
export ADMIN_KEY=<your-admin-key>
./scripts/upload-template.sh scaffold 0.1.0
```

### Custom domain

Railway → API service → **Settings** → **Networking** → **Custom Domain** → add `api.taurikit.dev`

### Set up Stripe webhook

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://api.taurikit.dev/stripe/webhook`
- Events: `checkout.session.completed`
- Copy the signing secret → update `STRIPE_WEBHOOK_SECRET` in Railway variables

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

### Verify setup wizard

```sh
# macOS/Linux — installs CLI + launches interactive wizard
curl -fsSL https://taurikit.dev/setup.sh | sh

# Windows (PowerShell)
irm https://taurikit.dev/setup.ps1 | iex
```

The scripts download the CLI from GitHub Releases (release must exist first), then immediately launch `taurikit new`.

CLI-only install scripts are also available at `taurikit.dev/install.sh` and `taurikit.dev/install.ps1`.

All scripts live in `taurikit-web/public/` and are served automatically by the landing page.

## 4. End-to-end verification

```sh
# 1. Run setup wizard (installs CLI + launches project generator)
curl -fsSL https://taurikit.dev/setup.sh | sh

# Or install CLI only, then run separately:
# curl -fsSL https://taurikit.dev/install.sh | sh
# taurikit doctor

# 2. Insert a test license directly via Railway shell or CLI:
# railway run bun -e "import pg from 'postgres'; const s=pg(process.env.DATABASE_URL); await s\`INSERT INTO licenses (id,email,key,plan) VALUES ('test','test@example.com','TK-TEST00000000-00000000-00000000-00000000-00000000','standard')\`; await s.end()"

# 3. Generate a project
export TAURIKIT_LICENSE_KEY=TK-TEST00000000-00000000-00000000-00000000-00000000
taurikit new "Test App" --auth github --ui shadcn --yes

# 4. Run it
cd test-app
bun install
bunx tauri dev
```

## DNS summary

| Record | Type | Target |
|--------|------|--------|
| `taurikit.dev` | CNAME | Cloudflare Pages |
| `api.taurikit.dev` | CNAME | Railway |

## GitHub repo secrets

| Secret | Used by |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Landing page + docs deploy |
| `CLOUDFLARE_ACCOUNT_ID` | Landing page + docs deploy |
| `ADMIN_KEY` | Template upload workflow |
| `API_URL` | Template upload workflow |
