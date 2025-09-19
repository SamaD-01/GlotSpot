// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
