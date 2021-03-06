import React from "react";

const AuthContainer = ({ children, reversed }) => {
  return (
    <div
      className={`layout-auth flex flex-col ${
        !reversed ? "md:flex-row" : " md:flex-row-reverse"
      } justify-between  text-text dark:text-white`}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
