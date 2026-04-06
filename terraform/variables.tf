variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "ap-southeast-1"
}

variable "bucket_name" {
  description = "S3 bucket name for the portfolio site"
  default     = "cymo-portfolio-nextjs"
}

variable "project_name" {
  description = "Project name used for tagging resources"
  default     = "portfolio"
}