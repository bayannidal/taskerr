import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { authenticate, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import UserIcon from "@heroicons/react/outline/UserIcon";
import XIcon from "@heroicons/react/solid/XCircleIcon";
import "animate.css";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { username, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }

    if (isError) {
      setDisplay(true);
    }

    if (isSuccess) {
      dispatch(reset());
    }
  }, [
    user,
    isError,
    isSuccess,
    isLoading,
    message,
    navigate,
    dispatch,
    display,
  ]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(authenticate(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleError = () => {
    dispatch(reset());
    setDisplay(false);
  };

  return (
    <div className="  flex flex-col justify-between h-[90%] ">
      <section className="flex flex-col items-center text-black mb-2 h-full justify-between">
        <div className="  bg-third flex flex-col w-full items-center rounded-b-lg ">
          <UserIcon className="h-10" />
          <h1 className=" font-bold">Login</h1>
        </div>
        <h1 className=" font-bold">Login and take care of the tasks!</h1>
      </section>
      <section className="flex flex-col justify-between p-4 relative">
        {isError ? (
          <div className="bg-red-400 p-4 rounded-lg flex justify-between items-center text-white hover:bg-opacity-80 mb-5 animate__animated animate__shakeX">
            Bad Credentials <XIcon className="h-6" onClick={handleError} />
          </div>
        ) : (
          <></>
        )}
        <form
          action="POST"
          onSubmit={onSubmit}
          className="flex flex-col h-full"
        >
          <div className="">
            <div className="flex">
              <input
                type="text"
                id="username"
                name="username"
                value={username ? username : ""}
                placeholder="Username..."
                onChange={onChange}
                required
                className="flex-grow  rounded-lg p-4 mb-2 bg-secondary"
              />
            </div>
            <div className="flex">
              <input
                type="password"
                id="password"
                name="password"
                value={password ? password : ""}
                placeholder="Password..."
                onChange={onChange}
                required
                className=" rounded-lg p-4 mb-2 bg-secondary flex-grow"
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <button
              type="submit"
              className="bg-third hover:bg-opacity-90 text-black w-full p-3 font-bold text-xl rounded-lg"
            >
              Login
            </button>
            <Link
              to="/register"
              className="text-center mt-2 text-gray-600 underline"
            >
              New user? Create an account
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
