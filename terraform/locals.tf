locals {
  primary_domain = [var.domain_name, "www.${var.domain_name}"]
  all_domains    = distinct(flatten([local.primary_domain, var.other_domains]))
  cors_origins = concat(
    [for domain in local.all_domains : "https://${domain}"],
    var.dev_origins
  )
  gitlab_instances = concat(
    var.gitlab_personal_token != "" ? [{
      name     = "gitlab-personal"
      baseUrl  = var.gitlab_personal_base_url
      username = var.gitlab_personal_username
      token    = var.gitlab_personal_token
    }] : [],
    var.gitlab_pgx_token != "" ? [{
      name     = "gitlab-pgx"
      baseUrl  = var.gitlab_pgx_base_url
      username = var.gitlab_pgx_username
      token    = var.gitlab_pgx_token
    }] : [],
  )
}