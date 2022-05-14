import React from "react";

const Title = ({ text, customClass }) => {
  return (
    <h1
      className={`py-2 mb-2 font-extrabold text-2xl text-text dark:text-dText ${customClass}`}
    >
      {text}
    </h1>
  );
};

export default Title;
