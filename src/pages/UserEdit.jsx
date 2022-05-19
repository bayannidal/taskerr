import Label from "../components/Label";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputText } from "../components/InputText";
import Title from "../components/Title";
import Layout from "../styles/Layout";
import { useDispatch } from "react-redux";
import { updateUser, reset } from "../features/auth/authSlice";
import Button from "../components/ButtonComponents/Button";
// import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const UserEdit = () => {
  const { user, isSuccess, isError, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [username] = useState(user.username);
  const [emailAddress] = useState(user.emailAddress);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  console.log(isSuccess);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ username, emailAddress, firstName, lastName }));
  };
  useEffect(() => {
    let loadingTast;
    if (isLoading) {
      loadingTast = toast.loading("Loading...");
    }
    if (isSuccess) {
      toast.remove(loadingTast);
      toast.success("Successfuly updated settings!");
      dispatch(reset());
    }
    if (isError) {
      toast.remove(loadingTast);
      toast.error("Settings could not be updated! ");
      dispatch(reset());
    }
    return () => {
      dispatch(reset());
    };
  }, [isLoading, isError, isSuccess, dispatch]);

  return (
    <Layout customClass="flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form onSubmit={onSubmit} className="md:max-w-[50%]">
          <Title text="User Edit" />
          <div className="flex flex-col ">
            <Label
              htmlFor="username"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="Username"
            />
            <InputText
              type="text"
              value={username}
              disabled={true}
              autoComplete="username"
            />
            <Link
              to="username"
              className=" self-end text-sky-500 cursor-pointer underline"
            >
              Change
            </Link>
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="email"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="Email"
            />
            <InputText
              type="text"
              value={emailAddress}
              disabled={true}
              autoComplete="email"
            />
            <Link
              to="email"
              className=" self-end text-sky-500 cursor-pointer underline"
            >
              Change
            </Link>
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="password"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="Password"
            />
            <InputText
              type="password"
              value="Nice try!:)x"
              disabled={true}
              autoComplete="current-password"
            />
            <Link
              to="/password/change"
              className=" self-end text-sky-500 cursor-pointer underline"
            >
              Change
            </Link>
          </div>
          <Label
            htmlFor="firstName"
            className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
            text="First Name"
          />
          <InputText
            autoComplete="given-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Label
            htmlFor="lastName"
            className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
            text="Last Name"
          />
          <InputText
            autoComplete="family-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button text="Update" type="submit" customClass="mt-2" />
        </form>
      </div>
    </Layout>
  );
};

export default UserEdit;
