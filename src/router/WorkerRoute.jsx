import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../auth/useAuth";
import { useLocation } from "react-router-dom";

const WorkerRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isLoading) return <Spinner />;
  if (user && role === "Worker") return children;
  return (
    <Navigate
      to={`${user ? "/dashboard" : "/"}`}
      state={{ from: location }}
      replace
    />
  );
};

export default WorkerRoute;
