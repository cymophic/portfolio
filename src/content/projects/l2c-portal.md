## Live Deployment

The site is deployed at [rsoconnect.powermaccenter.com](https://rsoconnect.powermaccenter.com).

---

## Features

- **Lead Management**: Capture, track, and qualify new customer leads from walk-in customers
- **Waiver Management**: Digital job orders and setup activation forms with PDF generation and e-signatures
- **Product Configuration**: Dynamic product selection with specifications
- **Multi-Location Support**: Hierarchical location management (Territory → Area → Branch)
- **Advanced Filtering**: Search and filter leads by status, location, product category, and date ranges
- **Lead Status Tracking**: Monitor leads through various stages (New, Notified, Pending, Served)
- **Customer Data Management**: Centralized customer database with 1nfinite integration support
- **Role-Based Access**: Different dashboard views for Mac Experts, Branch Heads, Area Managers, Territory Managers, and Directors
- **Two-Factor Authentication**: Email OTP verification with optional trusted device support
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Automated Database Backups**: Daily scheduled backups with automatic cleanup and retention policy
- **Observability Stack**: Real-time error tracking with Sentry and metrics/log aggregation via Grafana, Prometheus, and Loki

---

## Technologies Used

- **Backend:** Django 5.2, Django Ninja (REST API), Celery + Celery Beat (async & scheduled tasks)
- **Frontend:** TailwindCSS v4, CSS/JS
- **Database:** PostgreSQL 16
- **Cache / Broker:** Redis 7
- **Admin Interface:** Django Unfold
- **Additional:** `django-money`, `django-phonenumber-field`, `django-allauth`, `django-currentuser`, `django-import-export`, `django-simple-history`, `django-otp`, `weasyprint`
- **Deployment:** Docker, Nginx, Gunicorn
- **Monitoring & Observability:** Sentry (error tracking), Grafana, Prometheus, Loki (metrics & log aggregation)
- **Infrastructure:** Ansible (server provisioning)

---

## Project Structure

```
l2c-portal/
├── .github/workflows/            # GitHub Actions workflows
├── ansible/                      # Ansible playbooks for server provisioning
│   ├── inventory.ini             # Server inventory (staging, prod)
│   └── playbooks/
│       └── setup-server.yml      # Server setup playbook
├── apps/                         # Django applications
│   ├── core/                     # Base views, mixins, and shared management commands
│   ├── leads/                    # Lead and customer management
│   ├── locations/                # Territory, Area, Branch, and Service Center models
│   ├── products/                 # Product catalog and specs
│   ├── users/                    # User management, authentication, and 2FA
│   └── waivers/                  # Job orders and setup activation forms
├── config/                       # Django project configuration
│   ├── settings/                 # Environment-specific settings
│   │   ├── base.py               # Shared base settings
│   │   ├── dev.py                # Development settings
│   │   ├── staging.py            # Staging settings
│   │   └── prod.py               # Production settings
│   ├── celery.py                 # Celery configuration
│   └── urls.py                   # Root URL configuration
├── data/                         # CSV seed files for management commands
├── docs/                         # Documentation
├── monitoring/                   # Monitoring configuration (Prometheus, Promtail)
├── nginx/                        # Nginx configuration
├── scripts/                      # Server setup and utility scripts
├── static/                       # Project-wide static files
├── templates/                    # HTML templates
├── docker-compose.yml            # Docker Compose service definitions
├── Dockerfile.dev                # Docker image for development
├── Dockerfile.prod               # Docker image for production
├── makefile                      # Custom project commands
└── pyproject.toml                # Python project configuration
```

---

## Getting Started

### Prerequisites

- **Docker Desktop** ([docker.com](https://www.docker.com/products/docker-desktop/))
- **uv** (Python package manager)
- **Ansible** — for server provisioning

### Installation

Clone the repository and configure your environment:

```bash
git clone https://github.com/PMC-BIT/l2c-portal.git
cd l2c-portal
cp .env.example .env
```

Key environment variables:

| Variable | Description |
|---|---|
| `ENVIRONMENT` | `dev`, `staging`, or `prod` |
| `POSTGRES_DB` | PostgreSQL database name |
| `POSTGRES_USER` | PostgreSQL username |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `SECRET_KEY` | Django secret key |
| `DEBUG` | `True` for development, `False` for production |
| `ALLOWED_HOSTS` | Comma-separated allowed hostnames |
| `REDIS_URL` | Redis connection URL |

The project uses two SMTP accounts to avoid hitting daily sending limits — Gmail for low-priority emails and GoDaddy for high-priority (OTP, welcome, password reset).

### Setup

```bash
make setup-dev
```

This creates containers, applies migrations, and creates a superuser. For normal startups afterward, use `make start`.

### Server Provisioning

Add the server IP to `ansible/inventory.ini` and run:

```bash
ansible-playbook -i ansible/inventory.ini ansible/playbooks/setup-server.yml --limit production --ask-pass --ask-become-pass
```

---

## Development Notes

### Environment Differences

| Setting | Dev | Staging | Prod |
|---|---|---|---|
| `DEBUG` | `True` | `True` | `False` |
| `SSL/HTTPS` | Disabled | Disabled | Configurable |
| `CSP` | Report-only | Enforced | Enforced |
| `LOG_LEVEL` | `DEBUG` | `INFO` | `WARNING` |

### Monitoring

| Service | URL | Purpose |
|---|---|---|
| Grafana | `http://localhost:3000` | Metrics dashboards |
| Prometheus | `http://localhost:9090` | Raw metrics |
| Loki | `http://localhost:3100` | Log aggregation |

### Sentry

Set `SENTRY_DSN` in `.env` to enable error tracking. Errors are tagged by environment — check the correct filter in the Sentry dashboard.
