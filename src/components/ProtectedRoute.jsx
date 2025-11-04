import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role"); // stored after login

  if (!userRole) {
    // Not logged in → go to login page
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // Wrong role → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
