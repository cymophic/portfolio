# Shared IAM Role for EventBridge Scheduler
resource "aws_iam_role" "eventbridge_scheduler" {
  name = "${var.project_name}-eventbridge-scheduler"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "scheduler.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "eventbridge_scheduler_invoke" {
  name = "${var.project_name}-eventbridge-invoke-lambda"
  role = aws_iam_role.eventbridge_scheduler.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = "lambda:InvokeFunction"
      Resource = [
        aws_lambda_function.github.arn,
        aws_lambda_function.wakatime.arn,
        aws_lambda_function.spotify_stats.arn,
        aws_lambda_function.monkeytype.arn,
      ]
    }]
  })
}

# Hourly Schedules
resource "aws_scheduler_schedule" "github" {
  name = "${var.project_name}-github"

  schedule_expression = "rate(1 hour)"
  flexible_time_window { mode = "OFF" }

  target {
    arn      = aws_lambda_function.github.arn
    role_arn = aws_iam_role.eventbridge_scheduler.arn
  }
}

resource "aws_scheduler_schedule" "wakatime" {
  name = "${var.project_name}-wakatime"

  schedule_expression = "rate(1 hour)"
  flexible_time_window { mode = "OFF" }

  target {
    arn      = aws_lambda_function.wakatime.arn
    role_arn = aws_iam_role.eventbridge_scheduler.arn
  }
}

resource "aws_scheduler_schedule" "spotify_stats" {
  name = "${var.project_name}-spotify-stats"

  schedule_expression = "rate(1 hour)"
  flexible_time_window { mode = "OFF" }

  target {
    arn      = aws_lambda_function.spotify_stats.arn
    role_arn = aws_iam_role.eventbridge_scheduler.arn
  }
}

# Daily Schedule
resource "aws_scheduler_schedule" "monkeytype" {
  name = "${var.project_name}-monkeytype"

  schedule_expression = "rate(24 hours)"
  flexible_time_window { mode = "OFF" }

  target {
    arn      = aws_lambda_function.monkeytype.arn
    role_arn = aws_iam_role.eventbridge_scheduler.arn
  }
}