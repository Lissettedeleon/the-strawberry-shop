import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { checkRateLimit } from '../../shared/rateLimit.ts';

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

    // Throttle per sender address (so one person can't flood the shop) plus a
    // looser global hourly cap. The client-supplied x-forwarded-for header is
    // not used because it can be spoofed to bypass per-IP limits.
    const senderKey = `contact:${String(email).trim().toLowerCase()}`;
    const senderAllowed = await checkRateLimit(base44, senderKey, 2, 10 * 60 * 1000);
    if (!senderAllowed) {
      return Response.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
    }

    const globalAllowed = await checkRateLimit(base44, "global_contact_email", 20, 60 * 60 * 1000);
    if (!globalAllowed) {
      return Response.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
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

    // Send as plain text (not html/body) so user-supplied content can't render
    // as HTML in the shop owner's inbox. Strip angle brackets from the name
    // used in the subject as a defense against any client that renders it.
    const safeName = String(name).replace(/[\r\n<>]/g, " ").trim();

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "strawberryshopoh@gmail.com",
      subject: `${label} — ${safeName}`,
      text: bodyLines,
      from_name: "The Strawberry Shop Website",
    });

    return Response.json({ success: true, message: `${label} from ${name} received` });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});