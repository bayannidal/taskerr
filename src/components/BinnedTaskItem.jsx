import SwitchItem from "./SwitchItem";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";

function TaskItem({ task }) {
  const [completed] = useState(task.completed);
  const [pinned] = useState(task.pinned);

  return (
    <div className="relative min-w-full custom-shadow rounded-lg bg-primary dark:bg-dPrimary  text-text dark:text-dText  group">
      <div className="min-w-full px-4  relative group flex flex-col my-8">
        <div className="text-sm mb-4 font-light flex flex-col">
          <div className=" text-left font-bold text-lg pb-4 overflow-x-auto overflow-y-hidden custom-scroll">
            {" "}
            {task.title}
          </div>
          <div className="text-left font-normal text-base pb-4 overflow-x-auto overflow-y-hidden  custom-scroll">
            {" "}
            {task.description}
          </div>
        </div>
        <div className="text-sm font-light mb-4 flex flex-row   justify-between gap-2">
          <SwitchItem
            type={completed}
            icon={<CheckIcon />}
            primaryColor="bg-comp"
            bgColor="bg-secondary"
            dBgColor="dark:bg-dSecondary"
            txtColor="text-text"
          />
          <SwitchItem
            type={pinned}
            icon={<PaperClipIcon />}
            primaryColor="bg-third"
            bgColor="bg-secondary"
            dBgColor="dark:bg-dSecondary"
            txtColor="text-text"
            dTxtColor="text-text"
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-xs">
        {new Date(task.lastEditedAt).toLocaleString()}
      </div>
    </div>
  );
}

export default TaskItem;
