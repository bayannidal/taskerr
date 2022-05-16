import React, { useState } from "react";
import Layout from "../styles/Layout";
import Label from "../components/Label";
import { InputText } from "../components/InputText";
import Title from "../components/Title";
import Button from "../components/ButtonComponents/Button";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetPassword } from "../features/auth/authSlice";

const ResetPassword = () => {
  const [error, setError] = useState({
    active: false,
    message: "",
  });
  const { isSuccess, isLoading, isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmedNewPass, setConfirmedNewPass] = useState("");
  const [inputType, setInputType] = useState("password");
  const onSubmit = (e) => {
    e.preventDefault();

    if (newPass !== confirmedNewPass) {
      setError({ active: true, message: "Passwords do not match!" });
    } else {
      setError({ active: false, message: "" });
      dispatch(resetPassword({ oldPass, newPass }));
    }
  };

  if (isSuccess) {
    dispatch(logout());
  }
  return (
    <Layout>
      <Layout customClass="flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <form onSubmit={onSubmit} className="md:max-w-[50%]">
            <Title text="Change Password" />
            <Label
              htmlFor="oldPassword"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="Old password"
            />
            <InputText
              type={inputType}
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <Label
              htmlFor="newPassword"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="New Password"
            />
            <InputText
              type={inputType}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <Label
              htmlFor="confirmNewPassword"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="Confirm New Password"
            />
            <InputText
              type={inputType}
              value={confirmedNewPass}
              onChange={(e) => setConfirmedNewPass(e.target.value)}
            />
            <Button text="Update" type="submit" customClass="my-2" />
            <Error
              error={error.active}
              text={error.message}
              handleError={() => setError({ active: false, message: "" })}
            />
          </form>
        </div>
      </Layout>
    </Layout>
  );
};

export default ResetPassword;
