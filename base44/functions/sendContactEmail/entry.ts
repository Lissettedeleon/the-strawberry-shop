import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // one send per IP per minute

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, email, phone, event_type, event_date, event_address, guest_count, quantity, items_of_interest, fulfillment_type, message, type, company_website } = body;

    // Hidden form field that people never see or fill in. Bots that fill
    // every field get a normal-looking reply and no email is sent.
    if (company_website) {
      return Response.json({ success: true });
    }

    // Catering requests don't require a message; contact messages do.
    if (!name || !email || (type !== "catering" && !message)) {
      return Response.json({ error: "name, email, and message are required" }, { status: 400 });
    }
    const tooLong = (v, max) => String(v ?? "").length > max;
    if (tooLong(name, 200) || tooLong(email, 200) || tooLong(message, 5000) || tooLong(event_address, 500)
      || tooLong(phone, 50) || tooLong(event_type, 100) || tooLong(event_date, 50) || tooLong(guest_count ?? quantity, 20)
      || tooLong(items_of_interest, 1000) || tooLong(fulfillment_type, 50)) {
      return Response.json({ error: "Input too long" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    const now = new Date();
    const recent = await base44.asServiceRole.entities.EmailRateLimit.filter({ rate_key: ip }, "-last_sent", 1);

    if (recent.length > 0) {
      const lastSent = new Date(recent[0].last_sent);
      if (now.getTime() - lastSent.getTime() < RATE_LIMIT_WINDOW_MS) {
        return Response.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
      }
      await base44.asServiceRole.entities.EmailRateLimit.update(recent[0].id, { last_sent: now.toISOString() });
    } else {
      await base44.asServiceRole.entities.EmailRateLimit.create({ rate_key: ip, last_sent: now.toISOString() });
    }

    const label = type === "catering" ? "Catering Request" : "Contact Message";

    const bodyLines = [
      `New ${label} from ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      event_type ? `Event Type: ${event_type}` : null,
      event_date ? `Event Date: ${event_date}` : null,
      event_address ? `Event Location: ${event_address}` : null,
      (guest_count || quantity) ? `Guest Count: ${guest_count || quantity}` : null,
      fulfillment_type ? `Pickup or Delivery: ${fulfillment_type}` : null,
      items_of_interest ? `Items of Interest: ${items_of_interest}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean).join("\n");

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "strawberryshopoh@gmail.com",
      subject: `${label} — ${name}`,
      body: bodyLines,
      from_name: "The Strawberry Shop Website",
    });

    return Response.json({ success: true, message: `${label} from ${name} received` });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
