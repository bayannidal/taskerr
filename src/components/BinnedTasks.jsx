import React from "react";
import BinnedTaskItem from "./BinnedTaskItem";
const BinnedTasks = ({ binnedTasks }) => {
  if (binnedTasks.length === 0) {
    return (
      <div className="w-full h-full flex items-center gap-2 justify-center font-bold   ">
        <h1 className="text-center w-full md:w-fit px-4 py-2 bg-comp text-white rounded-lg custom-shadow">
          Empty
          <br />
        </h1>
      </div>
    );
  }
  return (
    <>
      {binnedTasks &&
        binnedTasks.map((binnedTask) => (
          <div className="rounded-lg flex flex-wrap  gap-2" key={binnedTask.id}>
            {binnedTask && (
              <BinnedTaskItem key={binnedTask.id} binnedTask={binnedTask} />
            )}
          </div>
        ))}
    </>
  );
};

export default BinnedTasks;
