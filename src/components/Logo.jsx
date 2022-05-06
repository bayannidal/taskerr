import React from "react";
// import BadgeIcon from "@heroicons/react/outline/BadgeCheckIcon";
import LogoSvg from "../img/Logo.svg";
const Logo = () => {
  return (
    <div className="h-full">
      {/* <div className="focus:outline-none inline-flex w-full justify-center items-center rounded-md tracking-wider  bg-violet-500 px-2 sm:px-4 py-2 text-sm sm:text-lg font-bold text-third  custom-shadow  ">
        Taskerr.{" "}
        <BadgeIcon className="ml-2 -mr-1 h-4 sm:h-6 sm:w-6 text-third" />
      </div> */}
      <img id="logo" className="h-[50px]" alt="logo" src={LogoSvg} />
    </div>
  );
};

export default Logo;
