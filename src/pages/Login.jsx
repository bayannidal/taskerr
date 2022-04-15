import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, reset } from "../features/auth/authSlice";
import UserIcon from "@heroicons/react/outline/UserIcon";
import Error from "../components/Error";
import "animate.css";
import { InputText } from "../components/InputText";
import ButtonLoading from "../components/ButtonLoading";
import Button from "../components/Button";
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
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/");
    }

    if (isError) {
      setDisplay(true);
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
    <div className="flex flex-col justify-between pt-12 lg:pt-20 text-text dark:text-white">
      <section className="flex flex-col items-center  mb-2 justify-between p-4 ">
        <div className=" flex flex-col w-full items-center bg-third rounded-lg py-2 text-text">
          <UserIcon className="h-10" />
          <h1 className=" font-bold">Login</h1>
        </div>
        <h1 className=" font-bold">Login and take care of the tasks!</h1>
      </section>
      <section className="flex flex-col justify-between p-4 relative">
        <Error
          error={isError}
          handleError={handleError}
          text="Bad Credentials "
        />
        <form action="POST" onSubmit={onSubmit} className="flex flex-col">
          <div className="">
            <div className="flex">
              <InputText
                type="text"
                id="username"
                name="username"
                value={username ? username : ""}
                placeholder="Username..."
                onChange={onChange}
                required={true}
              />
            </div>
            <div className="flex">
              <InputText
                type="password"
                id="password"
                name="password"
                value={password ? password : ""}
                placeholder="Password..."
                onChange={onChange}
                required={true}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            {!isLoading ? <Button text="Login" /> : <ButtonLoading />}
            <Link
              to="/register"
              className="text-center mt-2 text-gray-600 dark:text-gray-200 underline"
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
