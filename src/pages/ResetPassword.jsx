import React, { useEffect, useState } from "react";
import Layout from "../styles/Layout";
import Label from "../components/Label";
import { InputText } from "../components/InputText";
import Title from "../components/Title";
import Button from "../components/ButtonComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset, changePassword } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const { isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmedNewPass, setConfirmedNewPass] = useState("");
  const [inputType, setInputType] = useState("password");
  console.log(message.errorMessage);
  const onSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirmedNewPass) {
      toast.error("Passwords do not match!");
    } else {
      dispatch(changePassword({ oldPass, newPass }));
    }
  };

  useEffect(() => {
    let isErrorMessageEmpty = false;
    if (message.errorMessage == null) {
      isErrorMessageEmpty = true;
    }
    if (isSuccess && isErrorMessageEmpty) {
      toast.success("Password successfully changed, login!");
      dispatch(logout());
      dispatch(reset());
    }
    if (message.errorMessage === "BAD_CREDENTIALS") {
      toast.error("Bad credentials!");
      dispatch(reset());
    }
  }, [dispatch, isSuccess, message.errorMessage]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

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
              autoComplete="current-password"
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
              autoComplete="new-password"
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
              autoComplete="new-password"
              type={inputType}
              value={confirmedNewPass}
              onChange={(e) => setConfirmedNewPass(e.target.value)}
            />
            <Button text="Update" type="submit" customClass="my-2" />
          </form>
        </div>
      </Layout>
    </Layout>
  );
};

export default ResetPassword;
