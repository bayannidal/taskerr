import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, reset } from "../features/auth/authSlice";
import UserIcon from "@heroicons/react/outline/UserIcon";
import Error from "../components/Error";
import "animate.css";
import { InputText } from "../components/InputText";
import ButtonLoading from "../components/ButtonComponents/ButtonLoading";
import Button from "../components/ButtonComponents/Button";
import AuthTop from "../components/AuthComponents/AuthTop";
import AuthBottom from "../components/AuthComponents//AuthBottom";
import AuthContainer from "../components/AuthComponents/AuthContainer";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/");
    }

    if (isError) {
      setTimeout(() => dispatch(reset()), 5000);
    }
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

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
  };
  return (
    <AuthContainer>
      <AuthTop>
        <div className=" flex flex-col w-full lg:h-full  justify-center mt-4 lg:mt-0 items-center bg-third rounded-lg lg:rounded-none py-5 text-text">
          <UserIcon className="h-10 lg:h-40" />
          <h1 className=" font-bold">Login</h1>
        </div>
      </AuthTop>
      <AuthBottom>
        <h1 className=" text-center mb-5 font-bold text-sm md:text-base">
          Login and take care of the tasks!
        </h1>
        {isLoading ? (
          <h2 className="text-center mb-2 text-xs md:text-base">
            Server may take some time until it wakes up due to free plan...
          </h2>
        ) : null}

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
              className="text-center text-sm mt-2 text-gray-600 dark:text-gray-200 underline"
            >
              New user? Create an account
            </Link>
          </div>
        </form>
      </AuthBottom>
    </AuthContainer>
  );
}

export default Login;
