import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import UserIcon from "@heroicons/react/outline/UserIcon";
import { InputText } from "../components/InputText";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
import Error from "../components/Error";
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
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/");
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

  return (
    <div className="layout flex flex-col justify-between  text-text dark:text-white max-w-full">
      <section className="flex flex-col items-center  mb-2 justify-between">
        <div className="flex flex-col w-full justify-center  items-center bg-third rounded-lg min-h-[10vh] py-2 text-text">
          <UserIcon className="h-10" />
          <h1 className=" font-bold">Register</h1>
        </div>
      </section>
      <section className="flex flex-col max-w-full">
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
        <form onSubmit={onSubmit} className="flex flex-col max-w-full h-full">
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
      </section>
    </div>
  );
}

export default Register;
