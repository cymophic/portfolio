locals {
  primary_domain = [var.domain_name, "www.${var.domain_name}"]
  all_domains = distinct(flatten([local.primary_domain, var.other_domains]))
  cors_origins = concat(
    [for domain in local.all_domains : "https://${domain}"],
    var.dev_origins
  )
}