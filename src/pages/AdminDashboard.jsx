import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import BrandedLoader from "@/components/BrandedLoader";
import { CheckCircle, Clock, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUSES = ["Pending", "Preparing", "Ready", "Completed"];

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [codes, setCodes] = useState([]);
  const [genAmount, setGenAmount] = useState("");
  const [genOpen, setGenOpen] = useState(false);
  const [genMsg, setGenMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const u = await base44.auth.me();
        if (u.role !== "admin") {
          navigate("/");
          return;
        }
        setUser(u);
        const [ods, cds] = await Promise.all([
          base44.entities.Order.list("-created_date", 50),
          base44.entities.ReceiptCode.list("-created_date", 50),
        ]);
        setOrders(ods);
        setCodes(cds);
      } catch {
        navigate("/");
      }
      setLoading(false);
    }
    load();
  }, []);

  const updateStatus = async (orderId, status) => {
    await base44.entities.Order.update(orderId, { status });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleGenerate = async () => {
    const amount = parseFloat(genAmount);
    if (!amount || amount <= 0) return;
    const code = generateCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await base44.entities.ReceiptCode.create({
      code,
      amount,
      expires_at: expiresAt.toISOString().split("T")[0],
    });
    const refreshed = await base44.entities.ReceiptCode.list("-created_date", 50);
    setCodes(refreshed);
    setGenMsg(`Code created: ${code} — $${amount.toFixed(2)}`);
    setGenAmount("");
    setTimeout(() => setGenMsg(""), 5000);
  };

  if (loading) return <BrandedLoader text="loading dashboard..." />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #5C0110 0%, #4A000D 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-3xl sm:text-4xl text-center drop-shadow-lg">
            Admin Dashboard
          </motion.h1>
        </div>
        <WaveDivider from="dark" to="blush" />
      </section>

      <section style={{ backgroundColor: "#E0A4B0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Receipt Codes */}
          <div className="bg-white rounded-[30px_10px_30px_10px] p-6 border-2 border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-body font-bold text-foreground">Receipt Codes</h2>
              <button onClick={() => setGenOpen(!genOpen)} className="bg-primary text-white font-body font-bold text-xs px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
                + Generate Code
              </button>
            </div>
            {genOpen && (
              <div className="mb-4 p-4 bg-secondary rounded-2xl">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={genAmount}
                    onChange={e => setGenAmount(e.target.value)}
                    placeholder="Dollar amount"
                    className="flex-1 bg-white border-2 border-border rounded-xl px-3 py-2 font-body text-sm"
                    step="0.01"
                    min="0"
                  />
                  <button onClick={handleGenerate} className="bg-primary text-white font-body font-bold text-sm px-5 py-2 rounded-full hover:bg-primary/90 transition-colors">
                    Generate
                  </button>
                </div>
                {genMsg && <p className="mt-2 font-body text-xs text-primary font-semibold">{genMsg}</p>}
              </div>
            )}
            <div className="space-y-2">
              {codes.slice(0, 10).map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                  <div>
                    <span className="font-mono text-xs font-bold text-foreground">{c.code}</span>
                    <span className="text-muted-foreground text-[10px] ml-3">${c.amount?.toFixed(2)}</span>
                  </div>
                  <span className={`text-[10px] font-body font-bold px-2 py-0.5 rounded-full ${
                    c.status === "Active" ? "bg-green-100 text-green-700" :
                    c.status === "Claimed" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>{c.status}</span>
                </div>
              ))}
              {codes.length === 0 && <p className="text-muted-foreground font-body text-sm text-center py-4">No codes yet</p>}
            </div>
          </div>

          {/* Orders */}
          <div>
            <h2 className="font-body font-bold text-foreground text-xl mb-4">Orders</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-[30px_10px_30px_10px] p-5 border-2 border-border shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-body font-bold text-sm">{order.customer_name || "Guest"}</h3>
                      <p className="text-[10px] text-muted-foreground">{order.order_number} · {new Date(order.created_date).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-body font-extrabold text-primary text-sm">${order.total?.toFixed(2)}</span>
                      <div className="relative mt-1">
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value)}
                          className="text-[10px] font-body font-bold bg-secondary border-2 border-border rounded-full px-3 py-1.5 appearance-none cursor-pointer"
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {order.items?.map((item, idx) => {
                      const lineTotal = ((item.base_price || 0) + (item.extras_total || 0)) * (item.quantity || 1);
                      return (
                        <div key={idx} className="flex justify-between text-xs">
                          <div>
                            <span className="font-body font-semibold">{item.quantity}x {item.name}</span>
                            {item.chocolate_selections?.length > 0 && <span className="text-muted-foreground"> ({item.chocolate_selections.join(", ")})</span>}
                            {item.removed_ingredients?.length > 0 && <span className="text-red-500 ml-1">No: {item.removed_ingredients.join(", ")}</span>}
                            {item.extras?.length > 0 && <span className="text-primary ml-1">+ {item.extras.join(", ")}</span>}
                            {item.special_instructions && <span className="text-muted-foreground italic ml-1">"{item.special_instructions}"</span>}
                          </div>
                          <span className="font-body font-bold">${lineTotal.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-muted-foreground font-body text-center py-8">No orders yet</p>}
            </div>
          </div>

        </div>
      </section>

      <WaveDivider from="blush" to="white" />
      <Footer />
    </div>
  );
}
