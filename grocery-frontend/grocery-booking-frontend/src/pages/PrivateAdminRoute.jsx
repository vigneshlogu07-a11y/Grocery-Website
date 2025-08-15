import React, { useState } from "react";
import AdminLogin from "../pages/AdminLogin.jsx";

export default function PrivateAdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // If not logged in as admin, show the AdminLogin component
  if (!isAdmin) {
    return <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

  // Once admin logs in successfully, show the admin page
  return children;
}

