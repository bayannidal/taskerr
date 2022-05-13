import React from "react";

const MainTitle = ({ text }) => {
  return (
    <h1 className="p-1 text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold custom-gradient-text leading-normal lg:leading-[5rem]  text-transparent bg-clip-text ">
      {text}
    </h1>
  );
};

export default MainTitle;
