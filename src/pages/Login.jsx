import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  const handleError = () => {
    dispatch(reset());
    setDisplay(false);
  };

  return (
    <div className="  flex flex-col justify-between h-full pt-12 lg:pt-20">
      <section className="flex flex-col items-center  mb-2 h-full justify-between">
        <div className=" flex flex-col w-full items-center bg-third">
          <UserIcon className=" h-24" />
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
            {!isLoading ? (
              <button
                type="submit"
                className="bg-third hover:bg-opacity-90  w-full p-3 font-bold text-xl rounded-lg"
              >
                Login
              </button>
            ) : (
              <button className="bg-third hover:bg-opacity-90  w-full p-3 font-bold text-xl rounded-lg">
                <svg
                  role="status"
                  className="inline w-[1.3rem] h-[1.3rem] text-white animate-spin fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill=""
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            )}

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
