import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import BrandedLoader from "@/components/BrandedLoader";
import { Copy, Check, Edit2, X, LogOut, Gift, KeyRound, PartyPopper } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [receiptCode, setReceiptCode] = useState("");
  const [claimStatus, setClaimStatus] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const u = await base44.auth.me();
        // Award 100 bonus points for new accounts
        if (!u.loyalty_points || u.loyalty_points === 0) {
          await base44.auth.updateMe({ loyalty_points: 100 });
          u.loyalty_points = 100;
          setWelcomeMsg("Welcome to The Strawberry Shop! You've earned 100 points just for joining — you're already on your way to your first reward.");
        }
        setUser(u);
        setEditForm({ first_name: u.first_name || "", last_name: u.last_name || "", email: u.email || "", phone: u.phone || "" });
        try {
          const res = await base44.functions.invoke("getMyOrders", {});
          setOrders(res.data?.orders || []);
        } catch {}
      } catch {
        navigate("/login");
      }
      setLoading(false);
    }
    load();
  }, []);

  const points = user?.loyalty_points || 0;
  const progressPct = Math.min(100, (points / 100) * 100);
  const rewardCode = user?.reward_code;

  const copyReward = () => {
    if (rewardCode) {
      navigator.clipboard.writeText(rewardCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEditSave = async () => {
    try {
      await base44.auth.updateMe(editForm);
      const updated = await base44.auth.me();
      setUser(updated);
      setEditing(false);
    } catch {}
  };

  const handleClaimCode = async () => {
    setClaimStatus("");
    try {
      // Points are credited server-side in the claimReceiptCode function
      const response = await base44.functions.invoke("claimReceiptCode", { code: receiptCode.trim().toUpperCase() });
      if (response.data?.success) {
        const u = await base44.auth.me();
        setUser(u);
        setClaimStatus(`success:Points added! Your new balance is ${u.loyalty_points || 0} points.`);
        setReceiptCode("");
      } else if (response.data?.error === "not_authenticated") {
        setClaimStatus("error:Please log in to claim points.");
      } else {
        setClaimStatus("error:This code is invalid or has already been claimed.");
      }
    } catch {
      setClaimStatus("error:This code is invalid or has already been claimed.");
    }
  };

  const handleReorder = () => {
    navigate("/menu");
  };

  const handleLogout = () => {
    base44.auth.logout(window.location.origin + "/");
  };

  if (loading) return <BrandedLoader text="loading your account..." />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7C0116 0%, #5C0110 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-3xl sm:text-4xl text-center drop-shadow-lg">
            Welcome back{user?.first_name ? ` ${user.first_name}` : ""}
          </motion.h1>
        </div>
        <WaveDivider from="red" to="blush" />
      </section>

      <section style={{ backgroundColor: "#E0A4B0" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Welcome message for new accounts */}
          {welcomeMsg && (
            <div className="bg-white rounded-[30px_10px_30px_10px] p-5 border-2 border-primary/30 shadow-sm text-center">
              <PartyPopper size={32} className="mx-auto mb-2 text-primary" />
              <p className="font-body font-semibold text-sm text-foreground leading-relaxed">{welcomeMsg}</p>
            </div>
          )}

          {/* Loyalty Points */}
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Gift size={18} className="text-primary" />
              <h2 className="font-body font-bold text-foreground">Loyalty Points</h2>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="font-display text-primary text-3xl">{points}</span>
              <span className="font-body text-sm text-muted-foreground mb-1">points</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3 mb-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
            <p className="font-body text-xs text-muted-foreground">
              {points >= 100 ? "You've earned a reward!" : `${100 - points} points until your next $5 reward`}
            </p>
            {rewardCode && (
              <div className="mt-4 p-3 bg-primary/10 rounded-2xl border-2 border-primary/20 flex items-center justify-between">
                <div>
                  <p className="font-body font-bold text-xs text-primary">Your $5 Reward</p>
                  <p className="font-mono text-sm text-foreground">{rewardCode}</p>
                </div>
                <button onClick={copyReward} className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            )}
          </div>

          {/* Claim Points */}
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm">
            <h2 className="font-body font-bold text-foreground mb-3">Claim Points</h2>
            <p className="text-muted-foreground font-body text-xs mb-3">Enter a receipt code from an in-store purchase to earn points.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={receiptCode}
                onChange={e => setReceiptCode(e.target.value)}
                placeholder="Enter your receipt code"
                className="flex-1 bg-secondary border-2 border-border rounded-xl px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button onClick={handleClaimCode} className="bg-primary text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors shrink-0">
                Submit
              </button>
            </div>
            {claimStatus && (
              <p className={`mt-2 font-body text-xs ${claimStatus.startsWith("success") ? "text-green-600" : "text-red-500"}`}>
                {claimStatus.replace(/^(success|error):/, "")}
              </p>
            )}
          </div>

          {/* Account Details */}
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-body font-bold text-foreground">Account Details</h2>
              <button onClick={() => setEditing(!editing)} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                {editing ? <X size={16} /> : <Edit2 size={16} />}
              </button>
            </div>
            {editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-body text-xs font-semibold mb-1">First Name</label>
                    <input value={editForm.first_name} onChange={e => setEditForm({ ...editForm, first_name: e.target.value })} className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2 font-body text-sm" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold mb-1">Last Name</label>
                    <input value={editForm.last_name} onChange={e => setEditForm({ ...editForm, last_name: e.target.value })} className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2 font-body text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold mb-1">Phone</label>
                  <input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full bg-secondary border-2 border-border rounded-xl px-3 py-2 font-body text-sm" />
                </div>
                <button onClick={handleEditSave} className="w-full bg-primary text-white font-body font-bold py-2.5 rounded-full text-sm hover:bg-primary/90 transition-colors">Save Changes</button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-muted-foreground font-body text-sm">Name</span><span className="font-body font-semibold text-sm">{user?.first_name ? `${user.first_name} ${user.last_name || ""}` : user?.full_name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground font-body text-sm">Email</span><span className="font-body font-semibold text-sm">{user?.email || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground font-body text-sm">Phone</span><span className="font-body font-semibold text-sm">{user?.phone || "—"}</span></div>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm">
            <Link to="/forgot-password" className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound size={16} className="text-muted-foreground" />
                <span className="font-body font-bold text-foreground text-sm">Change Password</span>
              </div>
              <span className="text-muted-foreground text-xs">→</span>
            </Link>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm">
            <h2 className="font-body font-bold text-foreground mb-3">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-muted-foreground font-body text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="p-3 bg-secondary rounded-xl">
                    <div className="flex justify-between mb-1">
                      <span className="font-body font-bold text-xs text-foreground">{order.order_number}</span>
                      <span className="font-body font-bold text-xs text-primary">${order.total?.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-1">
                      {new Date(order.created_date).toLocaleDateString()}
                    </p>
                    <div className="text-[10px] text-foreground/70">
                      {order.items?.map((it, i) => (
                        <span key={i}>{it.quantity}x {it.name}{i < order.items.length - 1 ? ", " : ""}</span>
                      ))}
                    </div>
                    <button onClick={() => handleReorder(order)} className="mt-2 text-[10px] font-body font-bold text-primary hover:underline">
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out */}
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-white text-foreground/60 font-body font-semibold text-sm py-3.5 rounded-full border-2 border-border hover:text-red-500 hover:border-red-200 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}