resource "aws_acm_certificate" "portfolio" {
  provider          = aws.us_east_1
  domain_name       = "luisabhram.dev"
  validation_method = "DNS"

  tags = {
    Project = var.project_name
  }

  lifecycle {
    create_before_destroy = true
  }
}