import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import UserIcon from "@heroicons/react/outline/UserIcon";
import Spinner from "../components/Spinner";
function Register() {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }, [dispatch]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
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
    <div className=" flex flex-col justify-between h-[90%]">
      <section className="bg-third flex flex-col items-center text-black mb-2 rounded-b-lg py-2">
        <div className="h-10 w-10">
          <UserIcon />
        </div>
        <h1 className=" font-bold">Register</h1>
      </section>
      <section className="flex flex-col p-4">
        <form onSubmit={onSubmit} className="flex flex-col h-full">
          <div>
            <div className="flex">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Username..."
                onChange={onChange}
                className="flex-grow  rounded-lg p-4 mb-2 bg-secondary"
              />
            </div>
            <div className="flex">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="First name..."
                onChange={onChange}
                className="flex-grow  rounded-lg p-4 mb-2 bg-secondary"
              />
            </div>
            <div className="flex">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Last name..."
                onChange={onChange}
                className="flex-grow  rounded-lg p-4 mb-2 bg-secondary"
              />
            </div>
            <div className="flex">
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={emailAddress}
                placeholder="Email..."
                onChange={onChange}
                className="flex-grow  rounded-lg p-4 mb-2 bg-secondary"
              />
            </div>
            <div className="flex">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Password..."
                onChange={onChange}
                className=" rounded-lg p-4 mb-2 bg-secondary flex-grow"
              />
            </div>
            <div className="flex">
              <input
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
          <div>
            <button
              type="submit"
              className="bg-third text-black w-full p-5 font-bold text-xl rounded-lg mt-2"
            >
              Create Account
            </button>
            <div className="text-center mt-2 text-gray-600">
              Already have an account?
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
