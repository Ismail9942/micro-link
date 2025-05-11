import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BuyerStatus = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    totalPayments: 0,
  });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axiosSecure.get("/buyer-status");
      setStats(res.data);
    };

    fetchStats();
  }, [axiosSecure]);

  return (
    <div className="stats stats-vertical md:stats-horizontal shadow w-full">
      <div className="stat">
        <div className="stat-title text-xl font-semibold">Total Tasks</div>
        <div className="stat-value text-blue-500">{stats.totalTasks}</div>
        <div className="stat-desc">Tasks you’ve added</div>
      </div>

      <div className="stat">
        <div className="stat-title text-xl font-semibold">Pending Tasks</div>
        <div className="stat-value text-green-500">{stats.pendingTasks}</div>
        <div className="stat-desc">Waiting for workers</div>
      </div>

      <div className="stat">
        <div className="stat-title text-xl font-semibold">Total Payments</div>
        <div className="stat-value text-purple-500">${stats.totalPayments}</div>
        <div className="stat-desc">Paid for buy coin</div>
      </div>
    </div>
  );
};

export default BuyerStatus;
