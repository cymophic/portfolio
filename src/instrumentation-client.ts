import * as Sentry from "@sentry/nextjs";

function initSentry() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: process.env.NODE_ENV === "production",
    environment: process.env.NODE_ENV === "production" ? "prod" : "dev",
    sendDefaultPii: true,
  });
}

if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(initSentry, { timeout: 2000 });
  } else {
    setTimeout(initSentry, 1000);
  }
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
