import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) {
      return Response.json({ error: "not_authenticated" }, { status: 401 });
    }

    const orders = await base44.asServiceRole.entities.Order.filter(
      { customer_email: user.email },
      "-created_date",
      20
    );

    return Response.json({ orders });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
