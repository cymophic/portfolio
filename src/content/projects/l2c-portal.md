## Overview

Enterprise CRM platform built for a retail company serving 1–2K users across a 3-tier location hierarchy. The system manages leads, waivers, product configurations, and customer data with role-based dashboards at each tier.

## My Contribution

Sole infrastructure engineer and backend lead. Delivered MVP in two weeks.

### Backend & API

Django Ninja REST API with RBAC across all endpoints — four permission levels controlling dashboard views and data access per location tier. Two-factor authentication with trusted device support, rate limiting on login attempts, and async bulk user import with per-row error reporting.

### Infrastructure & DevOps

Three-environment architecture (dev / staging / prod) fully containerized with Docker. 30+ command Makefile CLI for setup, migrations, backups, log inspection, and container management — with production guards preventing destructive commands on live servers.

CI/CD via self-hosted GitHub Actions runners with pull request checks, linting, build validation, and security scanning. Cache invalidation at both the application and CDN layers on every deployment.

### Observability

Sentry for real-time error tracking with full stack traces across environments. Grafana, Prometheus, and Loki for metrics and log aggregation. Automated daily PostgreSQL backups with tiered retention.

## What I Learned

End-to-end ownership of a production system — database design, API architecture, server provisioning, CI/CD, and monitoring. Working without a senior on the infrastructure side required independent research, cross-referencing multiple sources, and deliberate architectural decisions.

## Technologies

**Backend:** Django, Django Ninja, Celery, PostgreSQL, Redis  
**Infrastructure:** Docker, Nginx, Gunicorn, Ansible  
**CI/CD:** GitHub Actions (self-hosted runners)  
**Observability:** Sentry, Grafana, Prometheus, Loki  
**Security:** 2FA, RBAC, rate limiting, Dependabot, CodeQL  
**Documentation:** Post-mortems, runbooks, Ansible Vault for secrets
