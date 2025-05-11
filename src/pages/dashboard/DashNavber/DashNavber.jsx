import useAuth from "../../../auth/useAuth";
import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa6";
import useRole from "../../../hooks/useRole";

const DashNavber = () => {
  const { user } = useAuth();
  const { role, coins, isLoading } = useRole();
  if (isLoading) return <p>Loding..........</p>;
  const profile = (
    <>
      {user && (
        <div className="dropdown dropdown-hover flex gap-6 items-center dropdown-end my-4">
          <ul>
            <li>
              <Link className=" text-base space-x-2">
                <span>{user.displayName}</span>
                <span>( {role} )</span>
              </Link>
            </li>
            <li>
              <Link className="text-base flex gap-2 items-center">
                Available Coin :<FaCoins />{" "}
                <span className="font-semibold">{coins}</span>{" "}
              </Link>
            </li>
          </ul>
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar border mt-1 w-12 h-12"
          >
            <img
              src={user.photoURL}
              alt="User Icon"
              className="rounded-full "
            />
          </label>
        </div>
      )}
    </>
  );
  return (
    <div className="flex justify-end gap-4 bg-[#128068] text-white font-medium pr-6 shadow-sm">
      <div className="navbar-end">
        <div className="mr-4">{profile}</div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            <span className="badge badge-xs font-semibold bg-red-600 text-white indicator-item">
              3
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashNavber;
