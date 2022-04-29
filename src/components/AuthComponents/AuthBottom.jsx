import React from "react";
const AuthBottom = ({ children }) => {
  return (
    <section className="flex flex-col justify-between md:justify-center relative md:flex-[1] md:p-5">
      {children}
    </section>
  );
};

export default AuthBottom;
