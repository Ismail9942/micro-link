import React from "react";
import useRole from "../hooks/useRole";
import Spinner from "../pages/shareit/Spinner";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";

const BuyerRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading || isLoading) return <Spinner />;
  if (user && role === "Buyer") return children;

  return (
    <Navigate
      to={`${user ? "/dashboard" : "/"}`}
      state={{ from: location }}
      replace
    />
  );
};

export default BuyerRoute;
