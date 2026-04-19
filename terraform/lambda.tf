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

# GitHub Endpoint
data "archive_file" "github" {
  type        = "zip"
  source_file = "${path.module}/../lambda/github.mjs"
  output_path = "${path.module}/../lambda/github.zip"
}

resource "aws_lambda_function" "github" {
  filename         = data.archive_file.github.output_path
  function_name    = "${var.project_name}-github"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "github.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.github.output_base64sha256
  timeout          = 10

  environment {
    variables = {
      GITHUB_TOKEN    = var.github_pat
      GITHUB_USERNAME = var.github_username
    }
  }
}

resource "aws_apigatewayv2_integration" "github" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.github.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "github" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /github"
  target    = "integrations/${aws_apigatewayv2_integration.github.id}"
}

resource "aws_lambda_permission" "github" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.github.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# Coding Stats Endpoint
data "archive_file" "wakatime" {
  type        = "zip"
  source_file = "${path.module}/../lambda/wakatime.mjs"
  output_path = "${path.module}/../lambda/wakatime.zip"
}

resource "aws_lambda_function" "wakatime" {
  filename         = data.archive_file.wakatime.output_path
  function_name    = "${var.project_name}-wakatime"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "wakatime.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.wakatime.output_base64sha256
  timeout = 10

  environment {
    variables = {
      WAKATIME_API_KEY = var.wakatime_api_key
    }
  }
}

resource "aws_apigatewayv2_integration" "wakatime" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.wakatime.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "wakatime" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /wakatime"
  target    = "integrations/${aws_apigatewayv2_integration.wakatime.id}"
}

resource "aws_lambda_permission" "wakatime" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.wakatime.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# Spotify Endpoint
data "archive_file" "spotify" {
  type        = "zip"
  source_file = "${path.module}/../lambda/spotify.mjs"
  output_path = "${path.module}/../lambda/spotify.zip"
}

resource "aws_lambda_function" "spotify" {
  filename         = data.archive_file.spotify.output_path
  function_name    = "${var.project_name}-spotify"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "spotify.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.spotify.output_base64sha256
  timeout = 15

  environment {
    variables = {
      SPOTIFY_CLIENT_ID     = var.spotify_client_id
      SPOTIFY_CLIENT_SECRET = var.spotify_client_secret
      SPOTIFY_REFRESH_TOKEN = var.spotify_refresh_token
    }
  }
}

resource "aws_apigatewayv2_integration" "spotify" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.spotify.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "spotify" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /spotify"
  target    = "integrations/${aws_apigatewayv2_integration.spotify.id}"
}

resource "aws_lambda_permission" "spotify" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.spotify.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# Monkeytype Endpoint
data "archive_file" "monkeytype" {
  type        = "zip"
  source_file = "${path.module}/../lambda/monkeytype.mjs"
  output_path = "${path.module}/../lambda/monkeytype.zip"
}

resource "aws_lambda_function" "monkeytype" {
  filename         = data.archive_file.monkeytype.output_path
  function_name    = "${var.project_name}-monkeytype"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "monkeytype.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.monkeytype.output_base64sha256
  timeout          = 10

  environment {
    variables = {
      MONKEYTYPE_API_KEY = var.monkeytype_api_key
    }
  }
}

resource "aws_apigatewayv2_integration" "monkeytype" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.monkeytype.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "monkeytype" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /monkeytype"
  target    = "integrations/${aws_apigatewayv2_integration.monkeytype.id}"
}

resource "aws_lambda_permission" "monkeytype" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.monkeytype.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}