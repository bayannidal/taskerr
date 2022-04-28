import React from "react";

const AuthContainer = ({ children, reversed }) => {
  return (
    <div
      className={`layout-auth flex flex-col ${
        !reversed ? "lg:flex-row" : " lg:flex-row-reverse"
      } justify-between  text-text dark:text-white`}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
