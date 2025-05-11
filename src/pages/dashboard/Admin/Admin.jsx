import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminWithdrawRequests from "../Admin/AdminWithdrawRequests";

const Admin = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-status");
      return res.data;
    },
  });

  if (error) {
    return (
      <p className="text-red-500 font-bold text-2xl text-center mt-10">
        Error loading stats!
      </p>
    );
  }

  return (
    <div className="min-h-[50vh]">
      <div>
        <div className="stats stats-vertical md:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-title text-xl font-semibold">
              Total Workers
            </div>
            <div className="stat-value text-blue-500">
              {isLoading ? 0 : `${stats.totalWorkers}`}
            </div>
            <div className="stat-desc">Active on the platform</div>
          </div>

          <div className="stat">
            <div className="stat-title text-xl font-semibold">Total Buyers</div>
            <div className="stat-value text-green-500">
              {isLoading ? 0 : `${stats.totalBuyers}`}
            </div>
            <div className="stat-desc">Contributing tasks</div>
          </div>

          <div className="stat">
            <div className="stat-title text-xl font-semibold">
              Total Available Coins
            </div>
            <div className="stat-value text-yellow-500">
              {isLoading ? 0 : `${stats.totalAvailableCoins}`}
            </div>
            <div className="stat-desc">Distributed across users</div>
          </div>

          <div className="stat">
            <div className="stat-title text-xl font-semibold">
              Total Payments
            </div>
            <div className="stat-value text-purple-500">
              ${isLoading ? 0 : `${stats.totalPayments}`}
            </div>
            <div className="stat-desc">Total withdraw by worker</div>
          </div>
        </div>
      </div>

      <div>
        <AdminWithdrawRequests refetch={refetch}></AdminWithdrawRequests>
      </div>
    </div>
  );
};

export default Admin;
