import Label from "../components/Label";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputText } from "../components/InputText";
import Title from "../components/Title";
import Layout from "../styles/Layout";
import { useDispatch } from "react-redux";
import { updateUser, reset } from "../features/auth/authSlice";
import Button from "../components/ButtonComponents/Button";
import Spinner from "../components/Spinner";
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

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ username, emailAddress, firstName, lastName }));
  };

  let updateToast;
  if (isLoading) {
    updateToast = toast.loading("Updating...");
  }

  if (isSuccess) {
    toast.remove(updateToast);
    toast.success("User settings updated!");
  }

  if (isError) {
    toast.error("User details could not be updated");
  }

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
            <InputText type="text" value={username} disabled={true} />
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
            <InputText type="text" value={emailAddress} disabled={true} />
            <Link
              to="email"
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
