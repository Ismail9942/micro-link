import React from "react";
import BuyerStatus from "./Buyer/BuyerStatus";
import useRole from "../../hooks/useRole";
import TasksToReview from "./Buyer/TasksToReview";
import WorkerStatus from "./Workers/WorkerStatus";
import ApprovedSubmissions from "./Workers/ApprovedSubmissions";
import Admin from "./Admin/Admin";

const MyDashboad = () => {
  const { role } = useRole();

  if (!role) return <p>Loading...</p>;

  return (
    <div>
      {role === "Admin" && <Admin />}
      {role === "Buyer" && (
        <>
          <BuyerStatus />
          <TasksToReview />
        </>
      )}
      {role === "Worker" && (
        <>
          <WorkerStatus />
          <ApprovedSubmissions />
        </>
      )}
    </div>
  );
};

export default MyDashboad;
