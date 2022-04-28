import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/ButtonComponents/Button";

const MissingPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const onClick = () => {
    navigate("/login");
  };
  return (
    <div className="layout text-text dark:text-dText font-extrabold flex flex-col gap-5 items-center justify-center">
      Ups! The URL is wrong!
      <Button text={user ? "Dashboard" : "Login"} onClick={onClick} />
    </div>
  );
};

export default MissingPage;
