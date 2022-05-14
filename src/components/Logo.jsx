import React from "react";
// import BadgeIcon from "@heroicons/react/outline/BadgeCheckIcon";
import LogoSvg from "../img/Logo.svg";
const Logo = ({ customClass }) => {
  return (
    <img
      id="logo"
      className={`h-[50px] z-50 ${customClass}`}
      alt="logo"
      src={LogoSvg}
    />
  );
};

export default Logo;
