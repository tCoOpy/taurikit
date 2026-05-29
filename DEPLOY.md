# Crabyard — Deploy Guide

Step-by-step to get Crabyard live.

## Prerequisites

- Railway account (for API, PostgreSQL, and web app)
- Cloudflare account (for DNS)
- Stripe account (test or live)
- Resend account (for email delivery)
- Domain: `crabyard.dev`

## 1. Deploy the API (`crabyard-api`)

### Create Railway project

1. Go to https://railway.com/new → **Deploy from GitHub repo** → select `tCoOpy/taurikit`
2. Set **Root Directory** to `crabyard-api`
3. Add a **PostgreSQL** database service (click **+ New** → **Database** → **PostgreSQL**)
4. Railway auto-injects `DATABASE_URL` when Postgres is linked

### Set environment variables

In Railway → your API service → **Variables**:

```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
RESEND_API_KEY=re_...
GITHUB_TOKEN=ghp_...
ADMIN_KEY=<generate-a-random-secret>
PORT=3000
```

Generate `ADMIN_KEY` with `openssl rand -hex 32`. `GITHUB_TOKEN` is used by `/cli/latest` and `/cli/download/:target` to read GitHub Release assets.

### Run migrations

After first deploy, open the Railway service shell or use the Railway CLI:

```sh
railway run bun run db:migrate
```

### Verify and upload initial template

Run this from the repository root before uploading a new template:

```sh
cd crabyard-cli
cargo test
cargo run -- new "Template Smoke Test" --template ../scaffold --yes --no-git --no-install --pm bun --auth none --ui shadcn --output /tmp/crabyard-template-smoke
test -f /tmp/crabyard-template-smoke/AGENTS.md
test -f /tmp/crabyard-template-smoke/CLAUDE.md
test -f /tmp/crabyard-template-smoke/.cursorrules
test -f /tmp/crabyard-template-smoke/.github/copilot-instructions.md
! grep -R "{{" /tmp/crabyard-template-smoke/AGENTS.md /tmp/crabyard-template-smoke/CLAUDE.md /tmp/crabyard-template-smoke/.cursorrules /tmp/crabyard-template-smoke/.github/copilot-instructions.md
cd ..
```

Then upload the scaffold:

```sh
export API_URL=https://<your-railway-domain>
export ADMIN_KEY=<your-admin-key>
TEMPLATE_VERSION=1.6.0
./crabyard-api/scripts/upload-template.sh scaffold "$TEMPLATE_VERSION"
```

The uploaded archive must include `base/AGENTS.md`, `base/CLAUDE.md`, `base/.cursorrules`, and `base/.github/copilot-instructions.md`. If you need to inspect a local package before upload:

```sh
tar -czf /tmp/crabyard-template-check.tar.gz -C scaffold --exclude='.git' --exclude='node_modules' --exclude='target' --exclude='.claude' --exclude='MEMORY.md' base auth ui manifest.toml
tar -tzf /tmp/crabyard-template-check.tar.gz | grep -E 'base/(AGENTS.md|CLAUDE.md|\.cursorrules|\.github/copilot-instructions.md)'
```

### Custom domain

Railway → API service → **Settings** → **Networking** → **Custom Domain** → add `api.crabyard.dev`

### Set up Stripe webhook

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://api.crabyard.dev/stripe/webhook`
- Events: `checkout.session.completed`
- Copy the signing secret → update `STRIPE_WEBHOOK_SECRET` in Railway variables

## 2. Deploy the web app (`crabyard-web`)

### Create Railway service

1. Go to https://railway.com/new → **Deploy from GitHub repo** → select `tCoOpy/taurikit`
2. Set **Root Directory** to `crabyard-web`
3. Railway should detect the `Dockerfile`
4. The container listens on `PORT=3000`

For a local production check:

```sh
cd crabyard-web
bun install
bun run build
bun start
```

### Configure custom domain

Railway → web service → **Settings** → **Networking** → **Custom Domain** → add `crabyard.dev`.

### Verify setup scripts

The install and setup scripts live in `crabyard-web/public/` and are served by the web app:

```sh
curl -fsSL https://crabyard.dev/install.sh | sh
curl -fsSL https://crabyard.dev/setup.sh | sh
```

They call the API service for CLI release metadata and binary downloads, so verify `GITHUB_TOKEN` is configured on the API before testing them.

## 3. Release the CLI (`crabyard-cli`)

### Push and tag

```sh
cd crabyard-cli
git add -A && git commit -m "v0.2.0"
git tag v0.2.0
git push origin main --tags
```

The release workflow builds binaries for all platforms and creates a GitHub Release.

### Verify setup wizard

```sh
# macOS/Linux — installs CLI + launches interactive wizard
curl -fsSL https://crabyard.dev/setup.sh | sh

# Windows (PowerShell)
irm https://crabyard.dev/setup.ps1 | iex
```

The scripts download the CLI from GitHub Releases (release must exist first), then immediately launch `crabyard new`.

CLI-only install scripts are also available at `crabyard.dev/install.sh` and `crabyard.dev/install.ps1`.

All scripts live in `crabyard-web/public/` and are served automatically by the web app.

## 4. End-to-end verification

```sh
# 1. Run setup wizard (installs CLI + launches project generator)
curl -fsSL https://crabyard.dev/setup.sh | sh

# Or install CLI only, then run separately:
# curl -fsSL https://crabyard.dev/install.sh | sh
# crabyard doctor

# 2. Generate a project
crabyard new "Test App" --auth github --ui shadcn --yes

# 3. Run it
cd test-app
bun install
bun run tauri dev
```

## DNS summary

| Record | Type | Target |
|--------|------|--------|
| `crabyard.dev` | CNAME | Railway web service |
| `api.crabyard.dev` | CNAME | Railway |

## GitHub repo secrets

| Secret or variable | Used by |
|--------------------|---------|
| `ADMIN_KEY` secret | Template upload in `package-template.yml` and `release-cli.yml` |
| `API_URL` secret/variable | Template upload target; default release workflow value is `https://taurikit-api-production.up.railway.app` |
