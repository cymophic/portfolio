## Overview

Client website for a Virtual Assistant provider — built as a freelance project. Static marketing site deployed on AWS with a serverless contact form.

## My Contribution

Full ownership from development through infrastructure and CI/CD.

### Application

Next.js 16 static site with Tailwind CSS v4. Contact form handled via Lambda with SES for email delivery. Pages for services, about, and contact with a Cal.com booking integration.

### Infrastructure

Infrastructure as Code with Terraform — S3 for hosting, CloudFront with HTTPS via ACM, and a Lambda function URL for the contact form endpoint. DNS managed through Cloudflare with budget alerts configured.

### CI/CD

GitHub Actions with pull request validation (lint, build check) and automated deployments. On merge to main, the pipeline builds the static export, syncs to S3, and invalidates cache at both CloudFront and Cloudflare.

## Technologies

**Application:** Next.js 16, TypeScript, Tailwind CSS v4  
**Infrastructure:** AWS (S3, CloudFront, Lambda, SES, ACM), Terraform  
**CI/CD:** GitHub Actions  
**DNS:** Cloudflare
