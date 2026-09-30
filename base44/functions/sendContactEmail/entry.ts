import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // one send per IP per minute

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, email, phone, event_type, event_date, event_address, guest_count, quantity, items_of_interest, fulfillment_type, message, type } = body;

    // Catering requests don't require a message; contact messages do.
    if (!name || !email || (type !== "catering" && !message)) {
      return Response.json({ error: "name, email, and message are required" }, { status: 400 });
    }
    if (String(name).length > 200 || String(email).length > 200 || String(message || "").length > 5000 || String(event_address || "").length > 500) {
      return Response.json({ error: "Input too long" }, { status: 400 });
    }

    // Use a single global rate key instead of the client-supplied
    // x-forwarded-for header, which can be spoofed to bypass per-IP limits.
    const rateKey = "global_contact_email";

    const now = new Date();
    const recent = await base44.asServiceRole.entities.EmailRateLimit.filter({ rate_key: rateKey }, "-last_sent", 1);

    if (recent.length > 0) {
      const lastSent = new Date(recent[0].last_sent);
      if (now.getTime() - lastSent.getTime() < RATE_LIMIT_WINDOW_MS) {
        return Response.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
      }
      await base44.asServiceRole.entities.EmailRateLimit.update(recent[0].id, { last_sent: now.toISOString() });
    } else {
      await base44.asServiceRole.entities.EmailRateLimit.create({ rate_key: rateKey, last_sent: now.toISOString() });
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