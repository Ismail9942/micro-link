import { useState } from "react";
// import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

import MenuItem from "./Menu/MenuItem";
import useAuth from "../../../auth/useAuth";
import BuyerMenu from "./Menu/BuyerMenu";
import WorkerMenu from "./Menu/WorkerMenu";
import AdminMenu from "./Menu/AdminMenu";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/favicon.png";
import useRole from "../../../hooks/useRole";
const Sidebar = () => {
  const { logOut, user } = useAuth();
  const { role, isLoading } = useRole();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading sidebar...</div>;

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed left-10 flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0  transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-20 h-20 rounded-full hidden md:flex px-4 py-2 shadow-lg  justify-center items-center bg-lime-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  className=""
                />
              </Link>
            </div>
            <div className=" divider"></div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/*  Menu Items */}
              {role === "Worker" && <WorkerMenu />}
              {role === "Buyer" && <BuyerMenu />}
              {role === "Admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          {/* 
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          /> */}
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            {/* <GrLogout className="w-5 h-5" /> */}

            <span className="mx-4 font-medium">Logout</span>
          </button>
          {!user && navigate("/login")}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
