import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, email, phone, event_date, quantity, items_of_interest, message, type } = body;
    const label = type === "catering" ? "Catering Request" : "Contact Message";

    const bodyLines = [
      `New ${label} from ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      event_date ? `Event Date: ${event_date}` : null,
      quantity ? `Guest Count / Quantity: ${quantity}` : null,
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