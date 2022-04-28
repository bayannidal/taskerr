import React from "react";

const AuthTop = ({ children }) => {
  return (
    <section className="flex flex-col items-center  justify-between w-full lg:flex-[2]">
      {children}
    </section>
  );
};

export default AuthTop;
