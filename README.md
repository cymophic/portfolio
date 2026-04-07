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

---

## 🌐 Live Deployment

The site is live at [luisabhram.dev](https://luisabhram.dev).

---

## ⚙️ Architecture & Tech Stack

### Application
- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP

### Infrastructure
- **Hosting:** AWS S3
- **CDN:** AWS CloudFront
- **SSL:** AWS Certificate Manager
- **DNS:** Cloudflare
- **IaC:** Terraform

### CI/CD
- **Pipeline:** GitHub Actions

---

## 📁 Project Structure

```
luisabhram.dev/
├── .github/
│   └── workflows/
│       └── deploy.yml                    # GitHub Actions deployment workflow
├── public/                               # Static assets served as-is
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── favicon.ico                   # Site favicon
│   │   ├── globals.css                   # Global styles and Tailwind imports
│   │   ├── layout.tsx                    # Root layout component
│   │   └── page.tsx                      # Root page
│   ├── components/
│   │   ├── layout/                       # App-wide layout components
│   │   │   ├── Nav.tsx                   # GSAP-animated hamburger nav
│   │   │   └── ThemeProvider.tsx         # next-themes provider wrapper
│   │   ├── pages/                        # Full page-level components
│   │   │   └── ComingSoon.tsx            # Coming soon placeholder page
│   │   ├── sections/                     # Page section components
│   │   └── ui/                           # Small reusable UI components
│   │       └── ThemeToggle.tsx           # Dark/light mode toggle button
│   └── lib/
│       └── site.ts                       # Site settings
├── terraform/                            # AWS infrastructure as code
│   ├── .terraform.lock.hcl               # Terraform provider version lock file
│   ├── main.tf                           # S3, CloudFront, ACM, and IAM resources
│   ├── outputs.tf                        # Terraform output values
│   └── variables.tf                      # Input variables (region, bucket name, etc.)
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

- **Node.js** v20+
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
- An AWS IAM user with S3, CloudFront, ACM, and IAM permissions

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
| `CNAME` | ACM validation name | ACM validation value (from `terraform output acm_validation_records`) |

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