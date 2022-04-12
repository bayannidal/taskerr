import LoginIcon from "@heroicons/react/outline/LoginIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import LogoutIcon from "@heroicons/react/outline/LogoutIcon";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-2 h-10 lg:h-20 fixed top-0 left-0 right-0 z-50">
      <div>
        <Link to="/" className="font-bold text-xl whitespace-nowrap">
          Taskerr. 📝
        </Link>
      </div>
      <ul className="flex">
        {user ? (
          <li>
            <button
              className="flex items-center mr-2 lg:mr-5 font-bold"
              onClick={onLogout}
            >
              <LogoutIcon className="text-third h-6 w-6 mr-1" />
              Logout
            </button>
          </li>
        ) : (
          <>
            {" "}
            <li>
              <Link
                to="login"
                className="flex items-center mr-2 lg:mr-5 font-bold"
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
