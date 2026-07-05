import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { orderId, orderNumber } = await req.json();

    if (!orderId || !orderNumber) {
      return Response.json({ error: "orderId and orderNumber are required" }, { status: 400 });
    }

    const order = await base44.asServiceRole.entities.Order.get(orderId).catch(() => null);

    // orderNumber acts as a proof-of-ownership check since guests aren't logged in
    if (!order || order.order_number !== orderNumber) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }

    return Response.json({ order });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
