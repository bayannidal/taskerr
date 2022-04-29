import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
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
    <header className="flex justify-between items-center px-4 md:px-16  lg:px-20 pb-10; h-14 lg:h-20 fixed top-0 left-0 right-0 z-40 text-text dark:text-dText  backdrop-filter backdrop-blur-lg bg-opacity-60 dark:bg-opacity-60 bg-primary dark:bg-dPrimary">
      <div className="flex items-center ">
        <Link
          to="/"
          className="font-bold  text-base sm:text-2xl lg:text-3xl  whitespace-nowrap"
        >
          Taskerr.
        </Link>
      </div>
      <Dropdown onLogout={onLogout} />
    </header>
  );
}

export default Header;
