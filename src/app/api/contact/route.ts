import { NextResponse } from "next/server";

// In-memory sliding window rate limiter
// 5 requests per 60 seconds per IP address
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

  // Periodically evict old keys to avoid memory leaks
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
    // 1. IP extraction for basic abuse protection
    const forwardedHeader = request.headers.get("x-forwarded-for");
    const realIpHeader = request.headers.get("x-real-ip");
    const clientIp = forwardedHeader
      ? forwardedHeader.split(",")[0].trim()
      : realIpHeader || "unknown";

    if (checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    // 2. Parse request body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot check for bots
    if (typeof body._hp === "string" && body._hp.trim() !== "") {
      // Silently accept honeypot submissions so bots do not retry
      return NextResponse.json({ success: true });
    }

    const rawName = typeof body.name === "string" ? body.name : "";
    const rawPhone = typeof body.phone === "string" ? body.phone : "";
    const rawService =
      typeof body.service === "string"
        ? body.service
        : typeof body.course === "string"
        ? body.course
        : "";

    // 4. Validate required fields
    if (!rawName.trim() || !rawPhone.trim() || !rawService.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and service are required." },
        { status: 400 }
      );
    }

    // 5. Sanitize and length-check
    const name = rawName.trim().replace(/[\r\n\t]/g, " ").slice(0, 100);
    const phone = rawPhone.trim().replace(/[\r\n\t]/g, " ").slice(0, 25);
    const service = rawService.trim().replace(/[\r\n\t]/g, " ").slice(0, 150);

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    // Standard phone validation: digits, +, spaces, hyphens, parentheses (8 to 25 chars)
    const phoneRegex = /^[0-9+\s()-]{8,25}$/;
    if (!phoneRegex.test(phone)) {
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

    // 6. Verify environment variable configuration
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      console.error("[contact] GOOGLE_SCRIPT_URL environment variable is not configured.");
      return NextResponse.json(
        { success: false, error: "Server error: Google Sheets integration is not configured." },
        { status: 500 }
      );
    }

    // 7. Dispatch to Google Apps Script Web App
    // Note: Do NOT log personal data (name or phone) to adhere to privacy requirements
    const scriptPayload = {
      name,
      phone,
      service,
    };

    let scriptRes: Response;
    try {
      scriptRes = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scriptPayload),
        redirect: "follow",
        signal: AbortSignal.timeout(35000),
      });
    } catch (networkErr) {
      console.error(
        "[contact] Network failure while calling Google Apps Script:",
        networkErr instanceof Error ? `${networkErr.name}: ${networkErr.message}` : networkErr
      );
      const isTimeout =
        networkErr instanceof Error && (networkErr.name === "TimeoutError" || networkErr.name === "AbortError");
      return NextResponse.json(
        {
          success: false,
          error: isTimeout
            ? "Google Sheets service took too long to respond. Please try again."
            : "Unable to reach Google Sheets service. Please check your internet connection.",
        },
        { status: 504 }
      );
    }

    const responseText = await scriptRes.text();
    let responseData: Record<string, unknown> | null = null;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      // Response is not JSON (e.g., Google login HTML or 401/403 page)
      responseData = null;
    }

    // Report success only when Apps Script explicitly confirms { success: true }
    if (!scriptRes.ok || !responseData || responseData.success !== true) {
      console.error(
        `[contact] Google Apps Script responded with HTTP ${scriptRes.status}. Expected JSON with { "success": true }. Response:`,
        responseText.slice(0, 300)
      );
      const errorMessage =
        responseData && typeof responseData.error === "string"
          ? responseData.error
          : "Google Sheets integration failed to confirm submission. Please check Google Apps Script deployment permissions.";
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
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
