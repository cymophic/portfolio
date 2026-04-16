# API Gateway
resource "aws_apigatewayv2_api" "api" {
  name          = "${var.project_name}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = local.cors_origins
    allow_methods = ["GET"]
  }
}

resource "aws_apigatewayv2_stage" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

# Shared IAM Role for all Lambdas
resource "aws_iam_role" "lambda_shared" {
  name = "${var.project_name}-lambda-shared"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_shared_basic" {
  role       = aws_iam_role.lambda_shared.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Contributions Endpoint
data "archive_file" "contributions" {
  type        = "zip"
  source_file = "${path.module}/../lambda/contributions.mjs"
  output_path = "${path.module}/../lambda/contributions.zip"
}

resource "aws_lambda_function" "contributions" {
  filename         = data.archive_file.contributions.output_path
  function_name    = "${var.project_name}-contributions"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "contributions.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.contributions.output_base64sha256

  environment {
    variables = {
      GITHUB_TOKEN    = var.github_pat
      GITHUB_USERNAME = var.github_username
    }
  }
}

resource "aws_apigatewayv2_integration" "contributions" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contributions.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contributions" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /contributions"
  target    = "integrations/${aws_apigatewayv2_integration.contributions.id}"
}

resource "aws_lambda_permission" "contributions" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contributions.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# Coding Stats Endpoint
data "archive_file" "coding_stats" {
  type        = "zip"
  source_file = "${path.module}/../lambda/codingStats.mjs"
  output_path = "${path.module}/../lambda/codingStats.zip"
}

resource "aws_lambda_function" "coding_stats" {
  filename         = data.archive_file.coding_stats.output_path
  function_name    = "${var.project_name}-coding-stats"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "codingStats.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.coding_stats.output_base64sha256
  timeout = 10

  environment {
    variables = {
      WAKATIME_API_KEY = var.wakatime_api_key
    }
  }
}

resource "aws_apigatewayv2_integration" "coding_stats" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.coding_stats.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "coding_stats" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /coding-stats"
  target    = "integrations/${aws_apigatewayv2_integration.coding_stats.id}"
}

resource "aws_lambda_permission" "coding_stats" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.coding_stats.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# Music (Spotify) Endpoint
data "archive_file" "music" {
  type        = "zip"
  source_file = "${path.module}/../lambda/music.mjs"
  output_path = "${path.module}/../lambda/music.zip"
}

resource "aws_lambda_function" "music" {
  filename         = data.archive_file.music.output_path
  function_name    = "${var.project_name}-music"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "music.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.music.output_base64sha256
  timeout = 15

  environment {
    variables = {
      SPOTIFY_CLIENT_ID     = var.spotify_client_id
      SPOTIFY_CLIENT_SECRET = var.spotify_client_secret
      SPOTIFY_REFRESH_TOKEN = var.spotify_refresh_token
    }
  }
}

resource "aws_apigatewayv2_integration" "music" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.music.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "music" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /music"
  target    = "integrations/${aws_apigatewayv2_integration.music.id}"
}

resource "aws_lambda_permission" "music" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.music.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}