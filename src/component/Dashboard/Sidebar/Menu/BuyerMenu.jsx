import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import MenuItem from "./MenuItem";
import { FaCoins, FaPlus } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
const BuyerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Dashboad"
        address="my-dashboad"
      />
      <MenuItem icon={FaPlus} label="Add new Tasks" address="add-task" />
      <MenuItem icon={MdHomeWork} label="My Task's" address="my-tasks" />
      <MenuItem icon={FaCoins} label="Purchase Coin" address="purchase-coin" />
      <MenuItem
        icon={FaHistory}
        label="Payment History"
        address="payment-history"
      />
    </>
  );
};

export default BuyerMenu;
