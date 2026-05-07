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

  default_route_settings {
    throttling_burst_limit = 5
    throttling_rate_limit  = 5
  }
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

resource "aws_iam_role_policy" "lambda_shared_s3" {
  name = "${var.project_name}-lambda-s3-write"
  role = aws_iam_role.lambda_shared.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "s3:PutObject"
      Resource = "${aws_s3_bucket.portfolio.arn}/stats/*"
    }]
  })
}

# GitHub Lambda
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
      S3_BUCKET_NAME  = var.bucket_name
    }
  }
}

resource "aws_lambda_permission" "github_eventbridge" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.github.function_name
  principal     = "scheduler.amazonaws.com"
}

# WakaTime Lambda
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
  timeout          = 10

  environment {
    variables = {
      WAKATIME_API_KEY = var.wakatime_api_key
      S3_BUCKET_NAME   = var.bucket_name
    }
  }
}

resource "aws_lambda_permission" "wakatime_eventbridge" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.wakatime.function_name
  principal     = "scheduler.amazonaws.com"
}

# Monkeytype Lambda
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
      S3_BUCKET_NAME     = var.bucket_name
    }
  }
}

resource "aws_lambda_permission" "monkeytype_eventbridge" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.monkeytype.function_name
  principal     = "scheduler.amazonaws.com"
}

# Spotify Now Playing Lambda
data "archive_file" "spotify_now_playing" {
  type        = "zip"
  source_file = "${path.module}/../lambda/spotify/now-playing.mjs"
  output_path = "${path.module}/../lambda/spotify/now-playing.zip"
}

resource "aws_lambda_function" "spotify_now_playing" {
  filename         = data.archive_file.spotify_now_playing.output_path
  function_name    = "${var.project_name}-spotify-now-playing"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "now-playing.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.spotify_now_playing.output_base64sha256
  timeout          = 15

  environment {
    variables = {
      SPOTIFY_CLIENT_ID     = var.spotify_client_id
      SPOTIFY_CLIENT_SECRET = var.spotify_client_secret
      SPOTIFY_REFRESH_TOKEN = var.spotify_refresh_token
    }
  }
}

resource "aws_apigatewayv2_integration" "spotify_now_playing" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.spotify_now_playing.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "spotify_now_playing" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /spotify/now-playing"
  target    = "integrations/${aws_apigatewayv2_integration.spotify_now_playing.id}"
}

resource "aws_lambda_permission" "spotify_now_playing_apigateway" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.spotify_now_playing.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

# Spotify Stats Lambda
data "archive_file" "spotify_stats" {
  type        = "zip"
  source_file = "${path.module}/../lambda/spotify/stats.mjs"
  output_path = "${path.module}/../lambda/spotify/stats.zip"
}

resource "aws_lambda_function" "spotify_stats" {
  filename         = data.archive_file.spotify_stats.output_path
  function_name    = "${var.project_name}-spotify-stats"
  role             = aws_iam_role.lambda_shared.arn
  handler          = "stats.handler"
  runtime          = "nodejs22.x"
  source_code_hash = data.archive_file.spotify_stats.output_base64sha256
  timeout          = 15

  environment {
    variables = {
      SPOTIFY_CLIENT_ID     = var.spotify_client_id
      SPOTIFY_CLIENT_SECRET = var.spotify_client_secret
      SPOTIFY_REFRESH_TOKEN = var.spotify_refresh_token
      S3_BUCKET_NAME        = var.bucket_name
    }
  }
}

resource "aws_lambda_permission" "spotify_stats_eventbridge" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.spotify_stats.function_name
  principal     = "scheduler.amazonaws.com"
}
