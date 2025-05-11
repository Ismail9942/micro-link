// src/hooks/useRouteTitle.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRouteTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "Micro Lab";

    if (path === "/") title = "Home | Micro Lab";
    else if (path === "/signup") title = "Register | Micro Lab";
    else if (path === "/login") title = "Ligin NOw! | Micro Lab";
    else if (path === "/my-dashboad") title = "My Dashboard | Micro Lab";
    else if (path === "/dashboard/manage-users")
      title = "Manage Users| Micro Lab";
    else if (path === "/dashboard/manage-tasks")
      title = "Manage Tasks | Micro Lab";
    else if (path === "/dashboard/add-task") title = "Added Tasks | Micro Lab";
    else if (path === "/dashboard/my-tasks") title = "My Tasks | Micro Lab";
    else if (path === "/dashboard/purchase-coin")
      title = "Purchase Coins | Micro Lab";
    else if (path === "/dashboard/payment/:price/:coins")
      title = "Payment | Micro Lab";
    else if (path === "/dashboard/payment-history")
      title = "Payment History| Micro Lab";
    else if (path === "/dashboard/tasks-list") title = "Tasks List| Micro Lab";
    else if (path === "/dashboard/tasks-details/:taskId")
      title = "Tasks Details| Micro Lab";
    else if (path === "/dashboard/my-submissions")
      title = "My Submission| Micro Lab";
    else if (path === "/dashboard/withdrawals")
      title = "withdrawals| Micro Lab";
    else title = "Micro Lab";

    document.title = title;
  }, [location]);
};

export default useRouteTitle;
