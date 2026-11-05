import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { priceItems } from '../../shared/pricing.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Public checkout intake: prices come from the MenuItem catalog, never from the
// browser, so an order's totals can't be forged.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { customer_name, customer_email, customer_phone, fulfillment_type, delivery_address, items } = body;

    if (typeof customer_name !== "string" || !customer_name.trim() || customer_name.length > 120) {
      return Response.json({ error: "customer_name is required" }, { status: 400 });
    }
    if (typeof customer_email !== "string" || customer_email.length > 200 || !EMAIL_RE.test(customer_email.trim())) {
      return Response.json({ error: "valid customer_email is required" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return Response.json({ error: "items are required" }, { status: 400 });
    }

    const fulfillmentType = fulfillment_type === "delivery" ? "delivery" : "pickup";
    const street = delivery_address && typeof delivery_address.street === "string" ? delivery_address.street.slice(0, 200) : "";
    if (fulfillmentType === "delivery" && !street.trim()) {
      return Response.json({ error: "delivery_address is required" }, { status: 400 });
    }

    // Catalog prices are admin-managed, so they are the source of truth.
    const catalog = await base44.asServiceRole.entities.MenuItem.list();
    const catalogPrices = new Map(catalog.map((menuItem) => [menuItem.name, menuItem.price]));

    let priced;
    try {
      priced = priceItems(items, catalogPrices);
    } catch (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    const randomHex = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    const orderNumber = "ORD-" + randomHex;

    const orderData = {
      customer_name: customer_name.trim(),
      customer_email: customer_email.trim(),
      customer_phone: typeof customer_phone === "string" ? customer_phone.slice(0, 50) : "",
      fulfillment_type: fulfillmentType,
      items: priced.items,
      subtotal: priced.subtotal,
      tax: priced.tax,
      total: priced.total,
      reward_applied: false,
      reward_discount: 0,
      order_number: orderNumber,
    };
    if (fulfillmentType === "delivery") {
      orderData.delivery_address = {
        street,
        city: delivery_address && typeof delivery_address.city === "string" ? delivery_address.city.slice(0, 100) : "",
        zip: delivery_address && typeof delivery_address.zip === "string" ? delivery_address.zip.slice(0, 20) : "",
      };
    }

    const order = await base44.asServiceRole.entities.Order.create(orderData);

    return Response.json({
      id: order.id,
      order_number: orderNumber,
      subtotal: priced.subtotal,
      tax: priced.tax,
      total: priced.total,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}