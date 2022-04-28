import React from "react";

const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="bg-third hover:bg-opacity-90  w-full p-2 sm:p-3 font-bold text-lg rounded-lg text-black"
    >
      {text}
    </button>
  );
};

export default Button;
