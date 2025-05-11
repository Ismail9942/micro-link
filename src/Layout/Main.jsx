import NavBar from "../pages/shareit/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/shareit/Footer";
import { Toaster } from "react-hot-toast";
import useRouteTitle from "../hooks/useTitle";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("signup") || location.pathname.includes("login");
  useRouteTitle();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* <Toaster /> */}
      <div className="flex flex-col min-h-screen">
        <header className="mb-16">{noHeaderFooter || <NavBar />}</header>
        <main className="flex-grow">
          <Outlet />
        </main>
        {noHeaderFooter || <Footer />}
      </div>
    </>
  );
};

export default Main;
