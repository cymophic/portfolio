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
  description = "GitHub PAT for contributions API"
  sensitive   = true
}

variable "github_username" {
  description = "GitHub username for contributions API"
  type        = string
}

# WakaTime
variable "wakatime_api_key" {
  description = "WakaTime API key for coding stats API"
  sensitive   = true
}

# Spotify
variable "spotify_client_id" {
  description = "Spotify client ID for music stats API"
  sensitive   = true
}

variable "spotify_client_secret" {
  description = "Spotify client secret for music stats API"
  sensitive   = true
}

variable "spotify_refresh_token" {
  description = "Spotify refresh token for music stats API"
  sensitive   = true
}