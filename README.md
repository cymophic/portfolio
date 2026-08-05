# My Portfolio

Personal portfolio site built with Next.js, deployed on AWS (S3 + CloudFront) with infrastructure provisioned via Terraform and CI/CD through GitHub Actions.

---

## 📚 Table of Contents

1. 🌐 [Live Deployment](#-live-deployment)
2. ⚙️ [Architecture and Tech Stack](#️-architecture-and-tech-stack)
3. 📁 [Project Structure](#-project-structure)
4. 🚀 [Local Development](#-local-development)
5. 🏗️ [Infrastructure Setup](#️-infrastructure-setup)
6. 🔄 [Deployment Process](#-deployment-process)
7. 🔌 [Data Sources](#-data-sources)

---

## 🌐 Live Deployment

The site is live at [luisabhram.dev](https://luisabhram.dev)

---

## ⚙️ Architecture and Tech Stack

### Application
- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP, Motion

### Infrastructure
- **Frontend Hosting:** AWS S3 & AWS CloudFront
- **Serverless Backend:** AWS Lambda & API Gateway
- **Scheduled Jobs:** AWS EventBridge Scheduler
- **DNS & Security:** Cloudflare (DNS) & AWS ACM (SSL)
- **IaC:** Terraform
- **Observability:** AWS CloudWatch

### CI/CD
- **Pipeline:** GitHub Actions

---

## 📁 Project Structure
```
luisabhram.dev/
├── .github/
│   └── workflows/
│       ├── build-app.yml                 # Reusable build workflow
│       ├── check-pr.yml                  # PR validation workflow
│       ├── deploy-infra.yml              # Infrastructure deployment workflow
│       ├── deploy-site.yml               # Website deployment workflow
│       ├── mirror-gitlab.yml             # Mirrors repo to GitLab
│       ├── resolve-issues.yml            # Updates project fields of linked issues on merge
│       └── track-issues.yml              # Updates project fields from created issues
├── lambda/
│   ├── spotify/
│   │   ├── now-playing.mjs               # Spotify now playing Lambda (live, API Gateway)
│   │   └── stats.mjs                     # Spotify static stats Lambda (scheduled, S3)
│   ├── github.mjs                        # GitHub profile stats Lambda function
│   ├── monkeytype.mjs                    # Monkeytype personal bests Lambda function
│   └── wakatime.mjs                      # Wakatime coding stats Lambda function
├── public/                               # Static assets
├── scripts/                              # Build-time and maintenance scripts
├── src/
│   ├── app/
│   │   ├── (main)/                       # Main route group
│   │   │   ├── layout.tsx                # Main layout component
│   │   │   ├── page.tsx                  # Homepage
│   │   │   └── projects/                 # Projects subpages
│   │   ├── coming-soon.tsx               # Work in progress page
│   │   ├── globals.css                   # Global styles and Tailwind imports
│   │   ├── icon.png                      # Site favicon
│   │   ├── layout.tsx                    # Root layout component
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── robots.ts                     # Crawler instructions
│   │   └── sitemap.ts                    # Sitemap
│   ├── assets/                           # Source images
│   ├── components/
│   │   ├── layout/                       # App-wide layout components
│   │   ├── ui/                           # Small reusable UI components
│   │   └── sections/                     # Page section components
│   ├── hooks/
│   │   ├── animations/                   # GSAP animation hooks
│   │   └── utils/                        # Utility hooks
│   └── lib/
│       ├── services/                     # External integrations
│       ├── types/                        # Type definitions
│       ├── utils/                        # Utilities
│       └── site.ts                       # Site configurations
├── terraform/                            # AWS infrastructure as code
│   ├── acm.tf                            # ACM SSL certificate
│   ├── budgets.tf                        # AWS budget alerts
│   ├── cloudfront.tf                     # CloudFront distribution, OAC, and functions
│   ├── eventbridge.tf                    # EventBridge scheduled triggers for Lambda
│   ├── lambda.tf                         # Lambda functions and IAM roles
│   ├── locals.tf                         # Centralized logic and data transformation layer
│   ├── main.tf                           # Terraform, providers, and S3 backend config
│   ├── outputs.tf                        # Terraform output values
│   ├── s3.tf                             # S3 bucket, policy, and access configuration
│   ├── variables.tf                      # Input definitions
│   └── terraform.tfvars.example          # Terraform variable template
├── .env.example                          # Required environment variables
├── .gitignore
├── eslint.config.mjs
├── next.config.ts                        # Next.js configuration (static export)
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🚀 Local Development

### Prerequisites

- **Node.js** v22+
- **npm** v10+

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/cymophic/portfolio.git
    cd portfolio
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build static export to `/out` |
| `npm run lint` | Run ESLint |
| `npm run set-tfvars` | Sync `terraform/terraform.tfvars` to the `TERRAFORM_TFVARS` GitHub secret |

---

## 🏗️ Infrastructure Setup

### Prerequisites

- **Terraform** v1.14+
- **AWS CLI** configured with valid credentials (`aws configure`)
- An AWS IAM user with S3, CloudFront, ACM, IAM, Lambda, API Gateway, and EventBridge permissions

### Terraform Variables

Variables are set up in `terraform/terraform.tfvars` file. An [example](terraform/terraform.tfvars.example) file is provided to assist with the setup:

```hcl
# General
domain_name        = ""
project_name       = ""
aws_region         = ""

# Domain & CORS
other_domains      = []
dev_origins        = ["http://localhost:3000", "http://localhost:3001"]

# S3
bucket_name        = ""

# Budget
budget_limit_usd   = "100.0"
budget_alert_email = ["name@email.com"]

# GitHub
github_pat         = ""
github_username    = ""

# WakaTime
wakatime_api_key   = ""

# Spotify
spotify_client_id     = ""
spotify_client_secret = ""
spotify_refresh_token = ""

# Monkeytype
monkeytype_api_key = ""
```

> This file is gitignored and never committed. The CI workflows read the same values from the `TERRAFORM_TFVARS` GitHub secret — after editing `terraform/terraform.tfvars`, sync it with `npm run set-tfvars`.

### Remote State

Terraform state is stored remotely in S3 and configured in `terraform/main.tf` — no extra setup needed. Just run `terraform init`.

### Provision AWS Resources

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

This provisions:
- S3 bucket for static file hosting
- CloudFront distribution with HTTPS
- ACM SSL certificate for the custom domain
- S3 bucket policy scoped to CloudFront only
- Lambda functions for stats and Spotify now playing
- EventBridge schedules for automated stats updates

### DNS Setup

After provisioning, these records are created in Cloudflare:

| Type | Name | Value |
|---|---|---|
| `CNAME` | `@` | CloudFront domain (from `terraform output cloudfront_domain`) |
| `CNAME` | `www` | CloudFront domain (from `terraform output cloudfront_domain`) |
| `CNAME` | ACM validation names | ACM validation values (from `terraform output acm_validation_records`) |

### Seeding Static Stats

After provisioning, these commands can invoke each scheduled Lambda and seed the initial JSON files manually in S3:

```bash
aws lambda invoke --function-name <project_name>-github /dev/null
aws lambda invoke --function-name <project_name>-wakatime /dev/null
aws lambda invoke --function-name <project_name>-spotify-stats /dev/null
aws lambda invoke --function-name <project_name>-monkeytype /dev/null
```

---

## 🔄 Deployment Process

Deployments are fully automated via GitHub Actions.

### Prerequisites

The following are configured in **Settings → Secrets and Variables → Actions**:

**Secrets**
| Name | Description |
|---|---|
| `GH_PAT` | GitHub Personal Access Token with relevant scopes |
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |
| `S3_BUCKET_NAME` | S3 bucket name |
| `CLOUDFLARE_ZONE_ID` | Cloudflare Zone ID |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `GITLAB_TOKEN` | GitLab project access token |
| `TERRAFORM_TFVARS` | Base64-encoded `terraform/terraform.tfvars` (set via `npm run set-tfvars`) |

**Variables**
| Name | Description |
|---|---|
| `PROJECT_ID` | GitHub Projects node ID |
| `DATE_CREATED_FIELD_ID` | "Date Created" field node ID in GitHub Projects |
| `DATE_RESOLVED_FIELD_ID` | "Date Resolved" field node ID in GitHub Projects |
| `NEXT_PUBLIC_SITE_MODE` | Controls which page is displayed (`live`, `coming_soon`, `maintenance`) |
| `NEXT_PUBLIC_API_URL` | Lambda + API Gateway URL |
| `NEXT_PUBLIC_CDN_URL` | CloudFront CDN URL for static stats JSON |

### Process Breakdown

**On pull request to `main`** — `check-pr.yml` runs:
1. Lints the codebase
2. Calls the reusable `build-app.yml` workflow to build the Next.js static export
3. Runs security analysis with CodeQL
4. Validates infrastructure with Terraform (format, validate, and plan)

**On merge to `main`** — `deploy-site.yml` runs:
1. Calls the reusable `build-app.yml` workflow
2. Uploads the `/out` build artifact
3. Downloads the `/out` artifact in the deploy job
4. Syncs `/out` to S3, preserving the `stats/` folder managed by Lambda
5. Invalidates the CloudFront cache
6. Updates the "Date Resolved" field on any linked GitHub Projects issue

**On merge to `main` (infra changes only)** — `deploy-infra.yml` runs:
1. Runs a Terraform plan against the existing remote state
2. Applies the changes only if the plan reports infrastructure changes

**On push to `main` or `dev`** — `mirror-gitlab.yml` runs:
1. Mirrors both branches to the GitLab read-only mirror

---

## 🔌 Data Sources

### Site Content
Static site content is defined in `src/lib/site.ts` and rendered at build time.

### Build-Time Assets
Assets that are fetched automatically during `prebuild`.

| Asset | Description |
|---|---|
| `public/avatar.png` | Profile avatar |
| `src/app/icon.png` | Site favicon |
| `public/**/*.webp` | WebP versions of project covers and logos |

### Live Endpoints
Serverless endpoints powered by AWS Lambda & API Gateway. Base URL is stored in `NEXT_PUBLIC_API_URL`.

| Method | Endpoint | Description | Response |
|---|---|---|---|
| `GET` | `/spotify/now-playing` | Spotify currently playing | `{ nowPlaying: { song, artist, url, isPlaying } }` |

### Static Stats
Pre-generated JSON files served from CloudFront, updated on a schedule via EventBridge. Base URL is stored in `NEXT_PUBLIC_CDN_URL`.

| File | Description | Schedule | Response |
|---|---|---|---|
| `/stats/github.json` | GitHub profile stats | Hourly | `{ contributions, totalCommits, weeks, recentPortfolioCommits, recentActivity }` |
| `/stats/wakatime.json` | WakaTime coding hours | Hourly | `{ today, weekly, monthly, yearly }` |
| `/stats/spotify.json` | Spotify static stats | Hourly | `{ topTrack, topArtist, lastPlayed }` |
| `/stats/monkeytype.json` | Monkeytype personal bests | Daily | `{ time: { 15, 60: { wpm, acc, consistency, timestamp } } }` |
