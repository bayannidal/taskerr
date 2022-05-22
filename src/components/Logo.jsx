import React from "react";
// import BadgeIcon from "@heroicons/react/outline/BadgeCheckIcon";
import LogoSvg from "../img/Logo.svg";
const Logo = ({ customClass }) => {
  return (
<<<<<<< HEAD
    <div className="h-full">
      <div className="focus:outline-none inline-flex w-full justify-center items-baseline rounded-md tracking-wider  text-sm sm:text-lg font-bold text-text dark:text-dText">
        <img id="logo" className=" ml-2  h-[40px]" alt="logo" src={LogoSvg} />
        Taskerr.{" "}
      </div>
    </div>
=======
    <img
      id="logo"
      className={`h-[50px] z-50 ${customClass}`}
      alt="logo"
      src={LogoSvg}
    />
>>>>>>> redux-update
  );
};

export default Logo;
