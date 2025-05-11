import useAuth from "../../auth/useAuth";
import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa6";
import useRole from "../../hooks/useRole";

const Profile = () => {
  const { user, logOut } = useAuth();
  const { coins } = useRole();

  return (
    <div className="flex justify-center items-center gap-4">
      {user && (
        <div className="dropdown dropdown-hover dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar border mt-1"
          >
            <img
              src={user.photoURL}
              alt="User Icon"
              referrerPolicy="no-referrer"
              className="rounded-full"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-10 w-52 p-2 shadow space-y-2"
          >
            <li>
              <Link className="text-black text-base">{user.displayName}</Link>
            </li>
            <li>
              <Link className="text-black text-base">
                Available Coin: {coins}
                <FaCoins />
              </Link>
            </li>
          </ul>
        </div>
      )}
      {user ? (
        <button type="button" onClick={logOut} className="btn btn-sm uppercase">
          Log out
        </button>
      ) : (
        <div className="flex gap-4">
          <Link to="/signup" className="btn btn-sm uppercase py-2">
            Register
          </Link>
          <Link to="/login" className="btn btn-sm uppercase py-2">
            Log in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
