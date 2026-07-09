import React, { useState, useEffect } from "react";
import { computeStatus } from "@/lib/hours";

export default function OpenClosedBadge({ className = "" }) {
  const [status, setStatus] = useState(computeStatus());

  useEffect(() => {
    const timer = setInterval(() => setStatus(computeStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  return null;









}