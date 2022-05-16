import React, { useState } from "react";
import Layout from "../styles/Layout";
import Label from "../components/Label";
import { InputText } from "../components/InputText";
import Title from "../components/Title";
import Button from "../components/ButtonComponents/Button";
import Error from "../components/Error";

const ResetPassword = () => {
  const [error, setError] = useState({
    active: false,
    message: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const onSubmit = (e) => {
    e.prevetDefault();

    if (newPassword !== confirmedNewPassword) {
      setError({ active: true, message: "Passwords do not match!" });
    } else {
      setError({ active: false, message: "" });
    }
  };

  return (
    <Layout>
      <Layout customClass="flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Error
            error={error.active}
            text={error.message}
            handleError={() => setError({ active: false, message: "" })}
          />
          <form onSubmit={onSubmit} className="md:max-w-[50%]">
            <Title text="Change Password" />
            <Label
              htmlFor="oldPassword"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="Old password"
            />
            <InputText
              type={inputType}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Label
              htmlFor="newPassword"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="New Password"
            />
            <InputText
              type={inputType}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Label
              htmlFor="confirmNewPassword"
              className="text-text dark:text-dText font-bold ml-1 mb-2 inline-block"
              text="Confirm New Password"
            />
            <InputText
              type={inputType}
              value={confirmedNewPassword}
              onChange={(e) => setConfirmedNewPassword(e.target.value)}
            />
            <Button text="Update" type="submit" customClass="mt-2" />
          </form>
        </div>
      </Layout>
    </Layout>
  );
};

export default ResetPassword;
