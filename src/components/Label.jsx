import React from "react";

const Label = ({ text, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-text dark:text-dText font-bold  mb-2 inline-block"
    >
      {" "}
      {text}
    </label>
  );
};

export default Label;
