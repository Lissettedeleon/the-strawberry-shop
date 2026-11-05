import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { checkRateLimit } from '../../shared/rateLimit.ts';

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 10 * 60 * 1000;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    // Require login before touching any receipt code data
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) {
      return Response.json({ success: false, error: "not_authenticated" }, { status: 401 });
    }

    // Throttle attempts per account so receipt codes can't be brute-forced.
    const allowed = await checkRateLimit(base44, `claim:${user.id}`, MAX_ATTEMPTS, WINDOW_MS);
    if (!allowed) {
      return Response.json({ success: false, error: "too_many_attempts" }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const code = typeof body.code === "string" ? body.code.trim() : "";

    if (!code || code.length > 40 || !/^[A-Za-z0-9-]+$/.test(code)) {
      return Response.json({ success: false }, { status: 400 });
    }

    // Find active, unexpired code
    const codes = await base44.asServiceRole.entities.ReceiptCode.filter({ code, status: "Active" }, "-created_date", 1);

    if (!codes || codes.length === 0) {
      return Response.json({ success: false });
    }

    const found = codes[0];
    const now = new Date();
    const expiresAt = found.expires_at ? new Date(found.expires_at) : null;

    if (expiresAt && now > expiresAt) {
      await base44.asServiceRole.entities.ReceiptCode.updateMany(
        { id: found.id, status: "Active" },
        { $set: { status: "Expired" } }
      );
      return Response.json({ success: false });
    }

    // Claim atomically: the update only matches while the code is still Active,
    // and this request writes its own random token. Reading the token back proves
    // this request won the race, so simultaneous duplicates can't each earn points.
    const claimToken = crypto.randomUUID();
    await base44.asServiceRole.entities.ReceiptCode.updateMany(
      { id: found.id, status: "Active" },
      { $set: { status: "Claimed", claimed_by: user.id, claim_token: claimToken } }
    );

    const claimed = await base44.asServiceRole.entities.ReceiptCode.get(found.id).catch(() => null);
    if (!claimed || claimed.claim_token !== claimToken) {
      return Response.json({ success: false, error: "already_claimed" });
    }

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
}