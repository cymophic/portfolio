# Zip the Lambda function
data "archive_file" "contributions" {
  type        = "zip"
  source_file = "${path.module}/../lambda/contributions.mjs"
  output_path = "${path.module}/../lambda/contributions.zip"
}

# IAM role for Lambda
resource "aws_iam_role" "lambda_contributions" {
  name = "${var.project_name}-lambda-contributions"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_contributions.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda function
resource "aws_lambda_function" "contributions" {
  filename         = data.archive_file.contributions.output_path
  function_name    = "${var.project_name}-contributions"
  role             = aws_iam_role.lambda_contributions.arn
  handler          = "contributions.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.contributions.output_base64sha256

  environment {
    variables = {
      GITHUB_TOKEN    = var.github_pat
      GITHUB_USERNAME = var.github_username
    }
  }
}

# API Gateway
resource "aws_apigatewayv2_api" "contributions" {
  name          = "${var.project_name}-contributions-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [var.allowed_origin]
    allow_methods = ["GET"]
  }
}

resource "aws_apigatewayv2_integration" "contributions" {
  api_id                 = aws_apigatewayv2_api.contributions.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contributions.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contributions" {
  api_id    = aws_apigatewayv2_api.contributions.id
  route_key = "GET /contributions"
  target    = "integrations/${aws_apigatewayv2_integration.contributions.id}"
}

resource "aws_apigatewayv2_stage" "contributions" {
  api_id      = aws_apigatewayv2_api.contributions.id
  name        = "$default"
  auto_deploy = true
}

# Allow API Gateway to invoke Lambda
resource "aws_lambda_permission" "contributions" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contributions.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contributions.execution_arn}/*/*"
}