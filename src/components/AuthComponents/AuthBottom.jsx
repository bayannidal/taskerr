import React from "react";
import { DarkModeBtn } from "../ButtonComponents/DarkModeBtn";
const AuthBottom = ({ children }) => {
  return (
    <section className="flex flex-col justify-between md:justify-center relative md:flex-[1] md:p-5">
      {children}
      <DarkModeBtn />
    </section>
  );
};

export default AuthBottom;
