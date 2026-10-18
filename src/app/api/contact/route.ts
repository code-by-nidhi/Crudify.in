import { NextResponse } from "next/server";

const PHONE_RE = /^[0-9+\s()-]{8,25}$/;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  if (rateLimitMap.size > 1000) {
    for (const [key, list] of rateLimitMap.entries()) {
      if (list.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const forwardedHeader = request.headers.get("x-forwarded-for");
    const realIpHeader = request.headers.get("x-real-ip");
    const clientIp = forwardedHeader ? forwardedHeader.split(",")[0].trim() : realIpHeader || "unknown";

    if (checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    if (typeof body._hp === "string" && body._hp.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const name = String(body.name ?? "").trim().replace(/[\r\n\t]/g, " ").slice(0, 100);
    const phone = String(body.phone ?? "").trim().replace(/[\r\n\t]/g, " ").slice(0, 25);
    const service = String(body.service ?? body.course ?? "").trim().replace(/[\r\n\t]/g, " ").slice(0, 150);

    if (!name || !phone || !service) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and service are required." },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!PHONE_RE.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone number (8-25 characters)." },
        { status: 400 }
      );
    }

    if (service.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please select a valid service." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SCRIPT_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const secret = process.env.GOOGLE_SHEETS_SECRET;

    if (!webhookUrl) {
      console.error("[contact] Google Sheets integration is not configured.");
      return NextResponse.json(
        { success: false, error: "Server error: Google Sheets integration is not configured." },
        { status: 500 }
      );
    }

    const payload: Record<string, string> = {
      name,
      phone,
      service,
      page: request.headers.get("referer") ?? "",
      userAgent: request.headers.get("user-agent") ?? "",
    };
    if (secret) payload.secret = secret;

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        redirect: "follow",
        signal: AbortSignal.timeout(35000),
      });

      const responseText = await res.text();
      let responseData: Record<string, unknown> | null = null;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = null;
      }

      // Apps Script (google-apps-script/Code.gs) replies with { ok: true }.
      const confirmed = responseData?.ok === true || responseData?.success === true;
      if (!res.ok || !confirmed) {
        const errorMessage =
          responseData && typeof responseData.error === "string"
            ? responseData.error
            : "Google Sheets integration failed to confirm submission.";
        return NextResponse.json({ success: false, error: errorMessage }, { status: 502 });
      }
    } catch (err) {
      console.error("[contact] Google Sheets submission failed:", err);
      return NextResponse.json(
        { success: false, error: "Could not submit right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error in contact route:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
