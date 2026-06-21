import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { code } = await req.json();

    if (!code) {
      return Response.json({ success: false }, { status: 400 });
    }

    // Find active, unexpired code
    const codes = await base44.asServiceRole.entities.ReceiptCode.filter({ code, status: "Active" }, "", 1);

    if (codes.length === 0) {
      return Response.json({ success: false });
    }

    const found = codes[0];
    const now = new Date();
    const expiresAt = found.expires_at ? new Date(found.expires_at) : null;

    if (expiresAt && now > expiresAt) {
      await base44.asServiceRole.entities.ReceiptCode.update(found.id, { status: "Expired" });
      return Response.json({ success: false });
    }

    // Mark as claimed
    const user = await base44.auth.me();
    await base44.asServiceRole.entities.ReceiptCode.update(found.id, {
      status: "Claimed",
      claimed_by: user?.id || "anonymous",
    });

    // Points = 1 point per $1
    const points = Math.floor(found.amount);

    return Response.json({ success: true, points });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});