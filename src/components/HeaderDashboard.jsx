import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Dropdown from "./Dropdown";
import Logo from "./Logo";
function HeaderDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="mx-4 md:mx-16 my-4 lg:mx-20 min-h-14 lg:min-h-20 fixed top-0 left-0 right-0 z-40 text-text dark:text-dText   ">
      <div className=" bg-comp bg-opacity-[0.85] backdrop-filter backdrop-blur-sm   py-2 px-2 w-full flex justify-between items-center rounded-lg relative">
        {/* <img
          src={gradient}
          alt=""
          className="bg-cover object-cover h-full w-full absolute -z-10 rounded-lg"
        /> */}
        <Link
          to="/"
          className="font-bold h-full text-base sm:text-2xl lg:text-3xl  whitespace-nowrap"
        >
          <Logo customClass="" />
        </Link>
        <Dropdown onLogout={onLogout} />
      </div>
    </header>
  );
}

<<<<<<< HEAD:src/components/HeaderDashboard.jsx
export default HeaderDashboard;
=======
export default Header;

//bg-opacity-60 dark:bg-opacity-60 bg-primary dark:bg-dPrimary border-b border-gray-100
//bg-gradient-to-r from-green-400 via-comp to-third
>>>>>>> redux-update:src/components/Header.jsx