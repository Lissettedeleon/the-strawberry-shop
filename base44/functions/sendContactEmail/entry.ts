import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { name, email, phone, event_date, quantity, items_of_interest, message, type } = body;

    let subject, emailBody;
    if (type === "catering") {
      subject = `🍓 New Catering Inquiry from ${name}`;
      emailBody = `
New catering request from The Strawberry Shop website:

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Event Date: ${event_date}
Quantity: ${quantity || "Not specified"}
Items: ${items_of_interest || "Not specified"}
Message: ${message || "None"}

— Sent from thestrawberryshop.com
`;
    } else {
      subject = `💬 New Contact Message from ${name}`;
      emailBody = `
New message from The Strawberry Shop website:

Name: ${name}
Email: ${email}
Message: ${message}

— Sent from thestrawberryshop.com
`;
    }

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "Strawberryshopoh@gmail.com",
      subject,
      body: emailBody,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});