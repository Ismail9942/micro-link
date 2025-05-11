import React from "react";
import { FaFileAlt, FaHome, FaMoneyBillWave, FaTasks } from "react-icons/fa";
import MenuItem from "./MenuItem";

const WorkerMenu = () => {
  return (
    <>
      <MenuItem icon={FaHome} label="Home" address="my-dashboad" />
      <MenuItem icon={FaTasks} label="Tasks List" address="tasks-list" />
      <MenuItem
        icon={FaFileAlt}
        label="My Submissions"
        address="my-submissions"
      />
      <MenuItem
        icon={FaMoneyBillWave}
        label="Withdrawals"
        address="withdrawals"
      />
    </>
  );
};

export default WorkerMenu;
