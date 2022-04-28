import React from "react";

const AuthBottom = ({ children }) => {
  return (
    <section className="flex flex-col justify-between lg:justify-center relative lg:flex-[1] lg:p-5">
      {children}
    </section>
  );
};

export default AuthBottom;
