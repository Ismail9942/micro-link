import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/microbucks_logo.png";
import useAuth from "../../auth/useAuth";
import Profile from "./Profile";

const NavBar = () => {
  const { user } = useAuth();
  const NavLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-white text-red-700" : ""
          }
        >
          Home
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? "bg-white text-red-700" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="fixed top-0 z-50 container mx-auto navbar bg-[#128068] font-medium text-white shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm gap-4 dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {NavLinks}
          </ul>
        </div>
        <div className="flex gap-2">
          <img
            className="w-12 h-12 ring rounded-full p-1"
            src={logo}
            alt="web-icon"
          />
          <Link className="btn btn-ghost text-xl" to="/">
            MicroLab
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 px-1">{NavLinks}</ul>
      </div>
      <div className="navbar-end gap-4">
        <button className="hover:text-amber-300">
          <a href="#"> Join as Developer</a>
        </button>
        <Profile />
      </div>
    </div>
  );
};

export default NavBar;
