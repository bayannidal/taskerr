import React from "react";
import BinnedTaskItem from "./BinnedTaskItem";
import Title from "./Title";
import Button from "./ButtonComponents/Button";
import { useState } from "react";
const BinnedTasks = ({ binnedTasks }) => {
  const [open, setOpen] = useState(false);
  console.log(open);
  if (binnedTasks.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-2  font-bold   bg-secondary dark:bg-dSecondary rounded-lg  pb-4  ">
        <Title text="Binned tasks" />
        <h1 className=" text-center w-full md:w-fit px-4 py-2 bg-comp text-white rounded-lg custom-shadow">
          Empty
          <br />
        </h1>
      </div>
    );
  }
  return (
    <div>
      <Button
        text="Show binned"
        onClick={() => console.log(setOpen(!open))}
        bgColor="bg-comp"
        customClass="text-dText"
      />
    <div className="relative">
      <div
        className={` ${open ? "block bg-secondary dark:bg-dSecondary" : "hidden"} flex flex-col p-2 my-2 text-text dark:text-dText rounded-lg`}
      >
        <Title text="Binned tasks" />

        <div className="rounded-lg flex flex-col gap-2">
          {binnedTasks &&
            binnedTasks.map((binnedTask) => (
              <BinnedTaskItem key={binnedTask.id} binnedTask={binnedTask} />
            ))}
        </div>
      </div>
    </div>
    </div>

  );
};

export default BinnedTasks;
