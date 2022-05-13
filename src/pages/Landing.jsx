import React from "react";
import HeaderPublic from "../components/HeaderPublic";
import MainTitle from "../components/MainTitle";
const Landing = () => {
  return (
    <div className="pt-24 lg:pt-28 min-w-full flex flex-col max-w-full min-h-full">
      <HeaderPublic />
      <section className="rounded-t-full p-5 bg-third">
        <MainTitle text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi earum consectetur atque corporis sed quisquam." />
      </section>
      <div className="waves"></div>
      <section className=""></section>
    </div>
  );
};

export default Landing;
