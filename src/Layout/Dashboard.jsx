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
      <div className="container mx-auto md:grid grid-cols-12">
        {/* <!-- Sidebar --> */}
        <aside className=" col-span-2">
          <Sidebar />
        </aside>
        {/* <!-- Navbar --> */}
        <div className="col-span-10 flex flex-col gap-4 min-h-screen">
          <header className="">
            <DashNavber />
          </header>

          {/* <!-- Main Content --> */}
          <main className=" w-full my-10 flex-grow">
            <Outlet />
          </main>

          {/* <!-- Footer --> */}
          <footer className="">
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
