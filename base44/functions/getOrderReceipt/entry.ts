import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { orderId, orderNumber } = await req.json();

    if (typeof orderId !== "string" || typeof orderNumber !== "string" || !orderId || !orderNumber || orderId.length > 64 || orderNumber.length > 64) {
      return Response.json({ error: "orderId and orderNumber are required" }, { status: 400 });
    }

    const order = await base44.asServiceRole.entities.Order.get(orderId).catch(() => null);

    // The order number is a random code only the customer who placed the
    // order receives, so it acts as proof of ownership (Order.read is
    // admin-only). Receipts are only served for recent orders.
    const RECEIPT_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
    const tooOld = order && Date.now() - new Date(order.created_date).getTime() > RECEIPT_WINDOW_MS;
    if (!order || order.order_number !== orderNumber || tooOld) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }

    return Response.json({ order });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
