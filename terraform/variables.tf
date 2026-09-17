# General
variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Project name used for tagging resources"
  default     = "portfolio"
}

# S3
variable "bucket_name" {
  description = "S3 bucket name for the portfolio site"
  type        = string
}

# Budget
variable "budget_limit_usd" {
  description = "Monthly budget cap in USD"
  type        = string
}

variable "budget_alert_email" {
  description = "Email addresses for budget alerts"
  type        = list(string)
}

# Domain & CORS Logic
variable "domain_name" {
  description = "The primary root domain"
  type        = string
}

variable "other_domains" {
  description = "List of additional domains to support"
  type        = list(string)
  default     = []
}

variable "dev_origins" {
  description = "List of local development origins"
  type        = list(string)
  default     = []
}

# GitHub
variable "github_pat" {
  description = "GitHub PAT"
  sensitive   = true
}

variable "github_username" {
  description = "GitHub username"
  type        = string
}

# WakaTime
variable "wakatime_api_key" {
  description = "WakaTime API key"
  sensitive   = true
}

# Spotify
variable "spotify_client_id" {
  description = "Spotify client ID"
  sensitive   = true
}

variable "spotify_client_secret" {
  description = "Spotify client secret"
  sensitive   = true
}

variable "spotify_refresh_token" {
  description = "Spotify refresh token"
  sensitive   = true
}

# Monkeytype
variable "monkeytype_api_key" {
  type      = string
  sensitive = true
}

# GitLab: Personal (gitlab.com)
variable "gitlab_personal_base_url" {
  description = "Base URL for the personal GitLab instance"
  type        = string
  default     = "https://gitlab.com"
}

variable "gitlab_personal_username" {
  description = "GitLab username for the personal instance"
  type        = string
  default     = "cymophic"
}

variable "gitlab_personal_token" {
  description = "Personal access token (read_user scope) for gitlab.com"
  type        = string
  sensitive   = true
  default     = ""
}

# GitLab: PGX (repo.projectgrey.net)
variable "gitlab_pgx_base_url" {
  description = "Base URL for the PGX GitLab instance"
  type        = string
  default     = "https://repo.projectgrey.net"
}

variable "gitlab_pgx_username" {
  description = "GitLab username for the PGX instance"
  type        = string
  default     = "luis.abhram"
}

variable "gitlab_pgx_token" {
  description = "Personal access token (read_user scope) for repo.projectgrey.net"
  type        = string
  sensitive   = true
  default     = ""
}