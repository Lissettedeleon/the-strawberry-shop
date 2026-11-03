import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Gift card codes are generated here, with the crypto RNG, and the record always
// starts at "Pending Payment" — nothing about it can be set by the browser.
function generateCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let code = "SB-";
  for (let i = 0; i < 8; i++) code += CODE_CHARS[bytes[i] % CODE_CHARS.length];
  return code;
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { amount, sender_name, sender_email, recipient_name, recipient_email, message, delivery_date } = body;

    const nameOk = (value) => typeof value === "string" && value.trim().length > 0 && value.length <= 120;
    const emailOk = (value) => typeof value === "string" && value.length <= 200 && EMAIL_RE.test(value.trim());

    if (!nameOk(sender_name) || !nameOk(recipient_name) || !emailOk(sender_email) || !emailOk(recipient_email)) {
      return Response.json({ error: "invalid_details" }, { status: 400 });
    }

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 1 || parsedAmount > 500) {
      return Response.json({ error: "invalid_amount" }, { status: 400 });
    }
    const giftAmount = Math.round(parsedAmount * 100) / 100;

    if (message !== undefined && message !== null && (typeof message !== "string" || message.length > 1000)) {
      return Response.json({ error: "invalid_message" }, { status: 400 });
    }
    if (delivery_date && (typeof delivery_date !== "string" || delivery_date.length > 30)) {
      return Response.json({ error: "invalid_delivery_date" }, { status: 400 });
    }

    const cardData = {
      code: generateCode(),
      amount: giftAmount,
      balance: giftAmount,
      sender_name: sender_name.trim(),
      sender_email: sender_email.trim(),
      recipient_name: recipient_name.trim(),
      recipient_email: recipient_email.trim(),
      message: typeof message === "string" ? message : "",
      status: "Pending Payment",
    };
    if (delivery_date) cardData.delivery_date = delivery_date;

    const card = await base44.asServiceRole.entities.GiftCard.create(cardData);

    return Response.json({ code: card.code, amount: giftAmount });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}