import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import UserIcon from "@heroicons/react/outline/UserIcon";
import { InputText } from "../components/InputText";
import Button from "../components/ButtonComponents/Button";
import ButtonLoading from "../components/ButtonComponents/ButtonLoading";
import Error from "../components/Error";
import AuthTop from "../components/AuthComponents/AuthTop";
import AuthBottom from "../components/AuthComponents/AuthBottom";
import AuthContainer from "../components/AuthComponents/AuthContainer";
import CheckCircle from "@heroicons/react/outline/BadgeCheckIcon";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    active: false,
    message: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    password2: "",
  });

  const { username, emailAddress, password, password2, firstName, lastName } =
    formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      dispatch(reset());
    }
<<<<<<< HEAD
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/dashboard");
=======
    if (isSuccess) {
      // dispatch(reset());
>>>>>>> redux-update
    }
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch, password, password2]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError({ active: true, message: "Passwords do not match!" });
    } else {
      setError({ active: false, message: "" });

      if (username.length < 4) {
      }
      const userData = {
        username,
        firstName,
        lastName,
        emailAddress,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isSuccess) {
    return (
      <div className="text-text dark:text-dText bg-gradient-to-r from-comp to-third  flex items-center justify-center text-3xl font-bold">
        <div className="p-4 flex flex-col gap-6 rounded-lg bg-primary dark:bg-dSecondary">
          <CheckCircle className="h-16 text-comp" />
          <h1>Check your email, verify it and add some tasks!</h1>
          <Link to="/login">
            <Button text="Go to login" c />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AuthContainer reversed={false}>
      <AuthTop>
        <div className="flex flex-col w-full md:h-full  justify-center mt-4 md:mt-0 items-center bg-third rounded-lg md:rounded-none py-5 text-text">
          <UserIcon className="h-10 md:h-40" />
          <h1 className=" font-bold">Register</h1>
        </div>
      </AuthTop>
      <AuthBottom>
        <h1 className=" text-center mb-5 font-bold  text-sm md:text-base">
          Register and add some tasks!
        </h1>
        {isLoading ? (
          <h2 className="text-center mb-2 text-xs md:text-base">
            Server may take some time until it wakes up due to free plan...
          </h2>
        ) : null}

        <Error
          error={error.active}
          text={error.message}
          handleError={() => setError({ active: false, message: "" })}
        />
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="max-w-full">
            <div className="flex">
              <InputText
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Username..."
                onChange={onChange}
                required={true}
              />
            </div>
            <div className="flex gap-2">
              <InputText
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="First name..."
                onChange={onChange}
                required={true}
                customClass="w-[50%]"
              />
              <InputText
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Last name..."
                onChange={onChange}
                required={true}
                customClass="w-[50%]"
              />
            </div>
            <div className="flex">
              <InputText
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={emailAddress}
                placeholder="Email..."
                onChange={onChange}
                required={true}
              />
            </div>
            <div className="flex gap-2">
              <InputText
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Password..."
                onChange={onChange}
                required={true}
                customClass="w-[50%]"
              />
              <InputText
                type="password"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm Password..."
                onChange={onChange}
                required={true}
                customClass="w-[50%]"
              />
            </div>
          </div>
          <div className=" flex flex-col mt-5">
            {!isLoading ? (
              <Button text="Create Account" type="submit" />
            ) : (
              <ButtonLoading />
            )}
            <Link
              to="/login"
              className="text-center mt-2 text-sm text-gray-600 dark:text-gray-200 underline"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </AuthBottom>
    </AuthContainer>
  );
}

export default Register;
