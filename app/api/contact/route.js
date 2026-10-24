const recipient = "namanyamervyn@gmail.com";
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
      remaining: 0,
      resetAt: bucket.resetAt,
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - bucket.count,
    resetAt: bucket.resetAt,
  };
}

export async function POST(request) {
  const limit = consumeRateLimit(getClientIp(request));
  if (!limit.allowed) {
    const waitMinutes = Math.max(1, Math.ceil(limit.retryAfter / 60));
    return Response.json(
      { error: "Too many messages. Please try again in about " + waitMinutes + " minute" + (waitMinutes === 1 ? "" : "s") + "." },
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return Response.json(
      { error: "Email sending is not configured yet. Please email me directly." },
      { status: 503 },
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
    !subject || subject.length > 180 ||
    !message || message.length > 5000
  ) {
    return Response.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: sender,
        subject,
        text: "From: " + name + " <" + sender + ">\n\n" + message,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Contact email provider returned status", response.status);
      return Response.json(
        { error: "Your message could not be sent. Please try again or email me directly." },
        { status: 502 },
      );
    }

    return Response.json({ sent: true });
  } catch {
    return Response.json(
      { error: "The email service could not be reached. Please try again." },
      { status: 502 },
    );
  }
}
