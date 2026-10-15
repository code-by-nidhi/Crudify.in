const PHONE_RE = /^[0-9+\s-]{8,15}$/;

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (!webhookUrl || !secret) {
    return Response.json({ ok: false, error: "Form is not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const phone = String(body.phone ?? "").trim().slice(0, 20);
  const service = String(body.service ?? "").trim().slice(0, 200);

  if (!name || !PHONE_RE.test(phone)) {
    return Response.json({ ok: false, error: "Please enter a valid name and phone number" }, { status: 400 });
  }

  try {
    // Apps Script answers with a 302 to googleusercontent.com; fetch follows it.
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name,
        phone,
        service,
        page: request.headers.get("referer") ?? "",
        userAgent: request.headers.get("user-agent") ?? "",
      }),
      cache: "no-store",
    });
    const result = (await res.json()) as { ok?: boolean };
    if (!result.ok) throw new Error("Sheet rejected submission");
  } catch (err) {
    console.error("[contact] Google Sheets submission failed:", err);
    return Response.json({ ok: false, error: "Could not submit right now. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
