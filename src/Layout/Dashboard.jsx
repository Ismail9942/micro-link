import Sidebar from "../component/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import DashNavber from "../pages/dashboard/DashNavber/DashNavber";
import Footer from "../pages/shareit/Footer";
import { Toaster } from "react-hot-toast";
import useRouteTitle from "../hooks/useTitle";

const Dashboard = () => {
  useRouteTitle();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative min-h-screen md:flex bg-white">
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1  md:ml-64">
          <div className="p-5">
            {/* Outlet for dynamic contents */}
            <DashNavber />
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
