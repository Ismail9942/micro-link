import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
import Spinner from "../pages/shareit/Spinner";

const PriviteRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PriviteRouter;
