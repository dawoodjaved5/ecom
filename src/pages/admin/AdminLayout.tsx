import React from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Navigate, Outlet } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const AdminLayout = () => {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <Outlet />;
};

export default AdminLayout; 