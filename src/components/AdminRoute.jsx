import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import BrandedLoader from "./BrandedLoader";

// Route guard: only authenticated admins may pass.
// Defense in depth — entity RLS also enforces admin-only writes server-side.
export default function AdminRoute() {
  const { isAuthenticated, isLoadingAuth, authChecked, user } = useAuth();

  if (isLoadingAuth || !authChecked) {
    return <BrandedLoader text="Verifying access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}