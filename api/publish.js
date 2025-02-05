import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: "backend",
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { post, link } = req.body;
    console.log("Publishing post to LinkedIn", { post, link });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    res.status(200).json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error in publish API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}