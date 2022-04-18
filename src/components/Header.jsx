import LoginIcon from "@heroicons/react/outline/LoginIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import LogoutIcon from "@heroicons/react/outline/LogoutIcon";
import MoonOutline from "@heroicons/react/solid/MoonIcon";
import SunOutline from "@heroicons/react/solid/SunIcon";
import useDarkMode from "../hook/useDarkMode";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [colorTheme, setTheme] = useDarkMode();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-2 h-50 lg:h-20 fixed top-0 left-0 right-0 z-40 text-text dark:text-dText bg-primary dark:bg-dPrimary">
      <div className="flex items-center text-base sm:text-2xl lg:text-3xl">
        <Link to="/" className="font-bold  whitespace-nowrap">
          Taskerr. 📝
        </Link>
        <button
          className="flex items-center  lg:mr-5 font-bold"
          onClick={() => setTheme(colorTheme)}
        >
          {colorTheme === "light" ? (
            <SunOutline className="h-5 lg:h-10 ml-3 text-dPrimary dark:text-third " />
          ) : (
            <MoonOutline className="h-5 lg:h-10 ml-3 text-dPrimary dark:text-third" />
          )}
        </button>
      </div>
      <ul className="flex items-center text-xs sm:text-xl lg:text-2xl">
        {user ? (
          <li>
            <button
              className="flex items-center mr-2 lg:mr-5 font-bold"
              onClick={onLogout}
            >
              <LogoutIcon className="text-third h-8 mr-2" />
              Logout
            </button>
          </li>
        ) : (
          <>
            {" "}
            <li>
              <Link
                to="login"
                className="flex items-center mr-2 lg:mr-5 font-bold "
              >
                <LoginIcon className="text-third h-6 w-6 mr-1" />
                Login
              </Link>
            </li>
            <li>
              <Link
                to="register"
                className="flex items-center mr-2 lg:mr-5 font-bold"
              >
                <UserIcon className="text-third h-6 w-6 mr-1" />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
