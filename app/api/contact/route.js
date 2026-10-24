import nodemailer from "nodemailer";

export const runtime = "nodejs";

const defaultRecipient = "namanyamervyn@gmail.com";
const rateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
let requestCount = 0;

function getClientIp(request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (realIp || forwardedIp || "unknown").slice(0, 128);
}

function consumeRateLimit(ip, now = Date.now()) {
  requestCount += 1;
  if (requestCount % 128 === 0) {
    for (const [key, bucket] of rateLimit) {
      if (bucket.resetAt <= now) rateLimit.delete(key);
    }
  }

  let bucket = rateLimit.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    if (!bucket && rateLimit.size >= 10000) {
      const oldestIp = rateLimit.keys().next().value;
      if (oldestIp) rateLimit.delete(oldestIp);
    }
    bucket = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimit.set(ip, bucket);
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
      resetAt: bucket.resetAt,
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    resetAt: bucket.resetAt,
  };
}

function createSmtpTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || !process.env.SMTP_FROM) return null;
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;

  const secureSetting = process.env.SMTP_SECURE?.toLowerCase();
  const secure = secureSetting ? secureSetting === "true" : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

export async function POST(request) {
  const limit = consumeRateLimit(getClientIp(request));
  if (!limit.allowed) {
    const waitMinutes = Math.max(1, Math.ceil(limit.retryAfter / 60));
    return Response.json(
      { error: `Too many messages. Please try again in about ${waitMinutes} minute${waitMinutes === 1 ? "" : "s"}.` },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfter),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(limit.resetAt / 1000)),
        },
      },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const sender = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    !name || name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender) || sender.length > 254 ||
    !subject || subject.length > 180 || /[\r\n]/.test(subject) ||
    !message || message.length > 5000
  ) {
    return Response.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const transporter = createSmtpTransport();
  if (!transporter) {
    return Response.json(
      { error: "SMTP email is not configured yet. Please email me directly." },
      { status: 503 },
    );
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_TO || defaultRecipient,
      replyTo: sender,
      subject,
      text: `From: ${name} <${sender}>\n\n${message}`,
    });

    return Response.json({ sent: true });
  } catch (error) {
    console.error("SMTP contact message failed:", error instanceof Error ? error.message : "Unknown SMTP error");
    return Response.json(
      { error: "Your message could not be sent. Please try again or email me directly." },
      { status: 502 },
    );
  }
}
