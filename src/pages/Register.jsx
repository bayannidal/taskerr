import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import UserIcon from "@heroicons/react/outline/UserIcon";
import Spinner from "../components/Spinner";
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
  // const [errorMessage, setErrorMessage] = useState("");
  // const [error, setError] = useState(false);
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
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="full-screen flex flex-col justify-between pt-24  text-text dark:text-white">
      <section className="flex flex-col items-center  mb-2 justify-between p-4">
        <div className="flex flex-col w-full items-center bg-third rounded-lg py-2 text-text">
          <UserIcon className="h-10" />
          <h1 className=" font-bold">Register</h1>
        </div>
        <h1 className=" font-bold">Register and add some tasks!</h1>
      </section>
      <section className="flex flex-col p-4">
        <Error
          error={error.active}
          text={error.message}
          handleError={() => setError({ active: false, message: "" })}
        />
        <form onSubmit={onSubmit} className="flex flex-col h-full">
          <div>
            <div className="flex">
              <InputText
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Username..."
                onChange={onChange}
              />
            </div>
            <div className="flex">
              <InputText
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="First name..."
                onChange={onChange}
              />
            </div>
            <div className="flex">
              <InputText
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Last name..."
                onChange={onChange}
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
              />
            </div>
            <div className="flex">
              <InputText
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Password..."
                onChange={onChange}
              />
            </div>
            <div className="flex">
              <InputText
                type="password"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm Password..."
                onChange={onChange}
                className=" rounded-lg p-4 mb-2 bg-secondary flex-grow"
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
              className="text-center mt-2 text-gray-600 dark:text-gray-200 underline"
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
