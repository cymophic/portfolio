# My Portfolio

Personal portfolio site built with Next.js, deployed on AWS (S3 + CloudFront) with infrastructure provisioned via Terraform and CI/CD through GitHub Actions.

---

## 📚 Table of Contents

1. 🌐 [Live Deployment](#-live-deployment)
2. ⚙️ [Architecture & Tech Stack](#-architecture--tech-stack)
3. 📁 [Project Structure](#-project-structure)
4. 🚀 [Local Development](#-local-development)
5. 🏗️ [Infrastructure Setup](#-infrastructure-setup)
6. 🔄 [Deployment Process](#-deployment-process)
7. 🔌 [API Endpoints](#-api-endpoints)

---

## 🌐 Live Deployment

The site is live at [luisabhram.dev](https://luisabhram.dev)

---

## ⚙️ Architecture & Tech Stack

### Application
- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP

### Infrastructure
- **Frontend Hosting:** AWS S3 & AWS CloudFront 
- **Serverless Backend:** AWS Lambda & API Gateway  
- **DNS & Security:** Cloudflare (DNS) & AWS ACM (SSL)
- **IaC:** Terraform
- **Observability:** Sentry (Errors), AWS CloudWatch (Logs + Metrics)
- **Analytics:** Google Analytics

### CI/CD
- **Pipeline:** GitHub Actions

---

## 📁 Project Structure
```
luisabhram.dev/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml                    # GitHub Actions deployment workflow
│   │   └── check.yml                     # PR validation workflow
│   └── dependabot.yml                    # Dependabot for automatic dependency updates
├── lambda/
│   ├── github.mjs                        # GitHub profile stats Lambda function
│   ├── monkeytype.mjs                    # Monkeytype personal bests Lambda function
│   ├── spotify.mjs                       # Spotify music stats Lambda function
│   └── wakatime.mjs                      # Wakatime coding stats Lambda function
├── public/                               # Static assets
├── scripts/                              # Build-time scripts
├── src/
│   ├── app/                              # App routes
│   │   ├── globals.css                   # Global styles and Tailwind imports
│   │   ├── layout.tsx                    # Root layout component
│   │   └── page.tsx                      # Root page
│   ├── components/
│   │   ├── layout/                       # App-wide layout components
│   │   ├── pages/                        # Full page-level components
│   │   ├── ui/                           # Small reusable UI components
│   │   └── sections/                     # Page section components
│   │       └── common/                   # Child components used within sections
│   ├── hooks/
│   │   └── animations/                   # GSAP animation hooks
│   ├── lib/
│   │   ├── types/                        # Type definitions
│   │   ├── utils/                        # Utilities
│   │   └── site.ts                       # Site configurations
├── terraform/                            # AWS infrastructure as code
│   ├── terraform.tfvars.example          # Terraform variable template
│   ├── main.tf                           # Terraform and provider configuration
│   ├── s3.tf                             # S3 bucket, policy, and access configuration
│   ├── cloudfront.tf                     # CloudFront distribution, OAC, and functions
│   ├── acm.tf                            # ACM SSL certificate
│   ├── outputs.tf                        # Terraform output values
│   ├── locals.tf                         # Centralized logic and data transformation layer
│   └── variables.tf                      # Input definitions
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

---

## 🏗️ Infrastructure Setup

### Prerequisites

- **Terraform** v1.14+
- **AWS CLI** configured with valid credentials (`aws configure`)
- An AWS IAM user with S3, CloudFront, ACM, IAM, Lambda, and API Gateway permissions

### Terraform Variables

Create a `terraform/terraform.tfvars` file based on the example below:

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
budget_alert_email = ["your@email.com"]

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

### DNS Setup

After provisioning, add these records in Cloudflare:

| Type | Name | Value |
|---|---|---|
| `CNAME` | `@` | Your CloudFront domain (from `terraform output cloudfront_domain`) |
| `CNAME` | `www` | Your CloudFront domain (from `terraform output cloudfront_domain`) |
| `CNAME` | ACM validation names | ACM validation values (from `terraform output acm_validation_records`) |

> ⚠️ Set both records to **DNS only** (grey cloud) — not proxied.

---

## 🔄 Deployment Process

Deployments are fully automated via GitHub Actions.

### How it works

1. Merge a PR into `main`
2. GitHub Actions runs automatically:
   - Installs dependencies
   - Builds the Next.js static export
   - Syncs `/out` to S3
   - Invalidates the CloudFront cache
3. Changes are live at [luisabhram.dev](https://luisabhram.dev)

### GitHub Secrets & Variables

| Name | Type | Description |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | Secret | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | Secret | IAM user secret key |
| `CLOUDFRONT_DISTRIBUTION_ID` | Secret | CloudFront distribution ID |
| `S3_BUCKET_NAME` | Variable | S3 bucket name |
| `NEXT_PUBLIC_SITE_MODE` | Variable | Controls which page is displayed (`live`, `coming_soon`, `maintenance`) |
| `NEXT_PUBLIC_GA_ID` | Variable | Google Analytics Measurement ID |
| `NEXT_PUBLIC_SENTRY_DSN` | Secret | Sentry DSN for error monitoring |
| `SENTRY_AUTH_TOKEN` | Secret | Sentry auth token for source map uploads |
| `NEXT_PUBLIC_API_URL` | Variable | Lambda + API Gateway URL |

---

## 🔌 API Endpoints

Serverless endpoints powered by AWS Lambda & API Gateway. Base URL is stored in `NEXT_PUBLIC_API_URL`.

| Method | Endpoint | Description | Response |
|---|---|---|---|
| `GET` | `/github` | GitHub profile stats | `{ contributions, totalCommits, recentPortfolioCommits, recentActivity }` |
| `GET` | `/wakatime` | WakaTime coding hours | `{ monthly: number, yearly: number }` |
| `GET` | `/spotify` | Spotify music stats | `{ topTrack, topArtist, nowPlaying, lastPlayed }` |
| `GET` | `/monkeytype` | Monkeytype personal bests | `{ time: { 15/60 { wpm, acc, consistency, timestamp } } }` |