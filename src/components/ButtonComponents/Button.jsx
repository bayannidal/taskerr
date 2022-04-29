import React from "react";

const Button = ({ text, onClick, bgColor }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${
        bgColor ? bgColor : "bg-third"
      } hover:bg-opacity-90  w-full p-2 sm:p-3 font-bold text-lg rounded-lg text-black custom-shadow`}
    >
      {text}
    </button>
  );
};

export default Button;
