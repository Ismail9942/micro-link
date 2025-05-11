import { FaTasks, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsFillHouseAddFill } from "react-icons/bs";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label="Home" address="my-dashboad" />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaTasks} label="Manage Tasks" address="manage-tasks" />
    </>
  );
};

export default AdminMenu;
