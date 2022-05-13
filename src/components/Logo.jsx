import React from "react";
// import BadgeIcon from "@heroicons/react/outline/BadgeCheckIcon";
import LogoSvg from "../img/Logo.svg";
const Logo = () => {
  return (
    <div className="h-full">
      <div className="focus:outline-none inline-flex w-full justify-center items-baseline rounded-md tracking-wider  text-sm sm:text-lg font-bold text-text dark:text-dText">
        <img id="logo" className=" ml-2  h-[40px]" alt="logo" src={LogoSvg} />
        Taskerr.{" "}
      </div>
    </div>
  );
};

export default Logo;
