output "acm_validation_records" {
  description = "DNS validation records to add to Cloudflare"
  value       = aws_acm_certificate.portfolio.domain_validation_options
}

output "api_url" {
  description = "Lambda + API Gateway base URL"
  value       = aws_apigatewayv2_stage.api.invoke_url
}