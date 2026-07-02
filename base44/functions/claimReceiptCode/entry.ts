import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Require login before touching any receipt code data
    const user = await base44.auth.me().catch(() => null);
    if (!user) {
      return Response.json({ success: false, error: "not_authenticated" }, { status: 401 });
    }

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
    await base44.asServiceRole.entities.ReceiptCode.update(found.id, {
      status: "Claimed",
      claimed_by: user.id,
    });

    // Points = 1 point per $1
    const points = Math.floor(found.amount);
    let loyaltyPoints = (user.loyalty_points || 0) + points;
    let rewardCode = user.reward_code || null;

    const userUpdates = { loyalty_points: loyaltyPoints };
    if (loyaltyPoints >= 100 && !rewardCode) {
      rewardCode = "REWARD-" + now.getTime().toString(36).toUpperCase().slice(-8);
      userUpdates.reward_code = rewardCode;
      userUpdates.loyalty_points = loyaltyPoints >= 200 ? loyaltyPoints - 100 : loyaltyPoints;
      loyaltyPoints = userUpdates.loyalty_points;
    }

    await base44.asServiceRole.entities.User.update(user.id, userUpdates);

    return Response.json({ success: true, points, loyalty_points: loyaltyPoints, reward_code: rewardCode });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
