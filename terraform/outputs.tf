output "acm_validation_records" {
  description = "DNS validation records to add to Cloudflare"
  value       = aws_acm_certificate.portfolio.domain_validation_options
}

output "contributions_api_url" {
  description = "Lambda + API Gateway URL"
  value       = "${aws_apigatewayv2_stage.contributions.invoke_url}contributions"
}