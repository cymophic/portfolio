resource "aws_acm_certificate" "portfolio" {
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = [for domain in local.all_domains : domain if domain != var.domain_name]

  tags = {
    Project = var.project_name
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "portfolio" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.portfolio.arn
}