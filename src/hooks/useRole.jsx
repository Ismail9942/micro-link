import { useMemo } from "react";
import useAuth from "../auth/useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const userEmail = useMemo(() => user?.email, [user]);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", userEmail],
    queryFn: async () => {
      try {
        if (!userEmail) return null;
        const { data } = await axiosSecure.get(`/users/${userEmail}`);
        return data;
      } catch (err) {
        console.error("Axios error:", err.response?.data || err.message);
        return null;
      }
    },
    enabled: !loading && !!userEmail,
    onError: (err) => {
      console.error("User role fetch error:", err);
    },
  });

  return {
    userData,
    role: userData?.role || null,
    coins: userData?.coins || 0,
    isLoading,
    refetch,
  };
};

export default useRole;
