import React from "react";

const Layout = ({ children, customClass }) => {
  return (
    <div className={`py-24 md:px-16 lg:py-28 px-4 lg:px-20  ${customClass}`}>
      {children}
    </div>
  );
};

export default Layout;
