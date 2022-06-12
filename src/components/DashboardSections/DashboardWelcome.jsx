import React from "react";
import { useSelector } from "react-redux";
import Title from "../Title";

const DashboardWelcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="p-2 custom-shadow bg-secondary dark:bg-dSecondary text-text dark:text-dText rounded-lg mb-2">
      <Title
        text={`Welcome, ${user && user.firstName + " " + user.lastName}!`}
        customClass=""
      />
    </section>
  );
};

export default DashboardWelcome;
