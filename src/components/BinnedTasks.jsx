import React from "react";
import BinnedTaskItem from "./BinnedTaskItem";
import Title from "./Title";
const BinnedTasks = ({ binnedTasks }) => {
  if (binnedTasks.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-2  font-bold   bg-secondary dark:bg-dSecondary rounded-lg">
        <Title text="Binned tasks" />
        <h1 className="text-center w-full md:w-fit px-4 py-2 bg-comp text-white rounded-lg custom-shadow">
          Empty
          <br />
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 p-2 custom-shadow bg-secondary dark:bg-dSecondary text-text dark:text-dText rounded-lg  mb-2">
      <Title text="Binned tasks" />

      <div className="rounded-lg flex flex-wrap  gap-2">
        {binnedTasks &&
          binnedTasks.map((binnedTask) => (
            <>
              {binnedTask && (
                <BinnedTaskItem key={binnedTask.id} binnedTask={binnedTask} />
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default BinnedTasks;
