import LoginIcon from "@heroicons/react/outline/LoginIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
// import DashboardIcon from "@heroicons/react/outline/ViewGridIcon";
import Dropdown from "./Dropdown";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-8 h-14 lg:h-20 fixed top-0 left-0 right-0 z-40 text-text dark:text-dText  backdrop-filter backdrop-blur-lg bg-opacity-60 dark:bg-opacity-60 bg-primary dark:bg-dPrimary">
      <div className="flex items-center ">
        <Link
          to="/"
          className="font-bold  text-base sm:text-2xl lg:text-3xl  whitespace-nowrap"
        >
          Taskerr.
        </Link>
      </div>
      {user ? <Dropdown onLogout={onLogout} /> : null}
      {/* <ul className="flex items-center text-xs sm:text-base lg:text-2xl">
        {user ? (
          <li
            onClick={onLogout}
            className="flex items-center mr-2 lg:mr-5 font-bold cursor-pointer"
          >
            <LogoutIcon className="text-third h-4 md:h-8 mr-1" />
            Logout
          </li>
        ) : (
          <>
            {" "}
            <li>
              <Link
                to="login"
                className="flex items-center mr-2 lg:mr-5 font-bold "
              >
                <LoginIcon className="text-third h-4 md:h-8 mr-1" />
                Login
              </Link>
            </li>
            <li>
              <Link
                to="register"
                className="flex items-center mr-2 lg:mr-5 font-bold"
              >
                <UserIcon className="text-third h-4 md:h-8 mr-1" />
                Register
              </Link>
            </li>
          </>
        )}
      </ul> */}
    </header>
  );
}

export default Header;
