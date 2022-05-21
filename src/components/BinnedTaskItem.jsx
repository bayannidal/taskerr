import SwitchItem from "./SwitchItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";
import {
  deleteBinnedTask,
  restoreBinnedTask,
} from "../features/tasks/taskSlice";
import AlertModal from "./Modals/AlertModal";
import PlusCircleIcon from "@heroicons/react/outline/PlusCircleIcon";
import MinusCircleIcon from "@heroicons/react/outline/MinusCircleIcon";
const BinnedTaskItem = ({ binnedTask }) => {
  const [completed] = useState(binnedTask.completed);
  const [pinned] = useState(binnedTask.pinned);
  const dispatch = useDispatch();
  const handleRestoreDispatch = () => {
    return dispatch(restoreBinnedTask(binnedTask.id));
  };
  const handleDeleteDispatch = () => {
    return dispatch(deleteBinnedTask(binnedTask.id));
  };
  return (
    <div className="relative min-w-full custom-shadow rounded-lg bg-primary dark:bg-dPrimary  text-text dark:text-dText  group">
      <div className="min-w-full px-4  relative group flex flex-col my-8">
        <div className="text-sm mb-4 font-light flex flex-col">
          <div className=" text-left font-bold text-lg pb-4 overflow-x-auto overflow-y-hidden custom-scroll">
            {" "}
            {binnedTask.title}
          </div>
          <div className="text-left font-normal text-base pb-4 overflow-x-auto overflow-y-hidden  custom-scroll">
            {" "}
            {binnedTask.description}
          </div>
        </div>
        <div className="text-sm font-light mb-4 flex flex-row justify-between gap-2">
          <AlertModal
            icon={
              <SwitchItem
                type={completed}
                icon={<CheckIcon />}
                primaryColor="bg-comp"
                bgColor="bg-secondary"
                dBgColor="dark:bg-dSecondary"
                txtColor="text-text"
                disabled={true}
              />
            }
            bgColor="bg-comp"
            text="This task will be restored!"
            title="Restore Task"
            btnText="Ok!"
          />

          <SwitchItem
            type={completed}
            icon={<CheckIcon />}
            primaryColor="bg-comp"
            bgColor="bg-secondary"
            dBgColor="dark:bg-dSecondary"
            txtColor="text-text"
            disabled={true}
          />
          <SwitchItem
            type={pinned}
            icon={<PaperClipIcon />}
            primaryColor="bg-third"
            bgColor="bg-secondary"
            dBgColor="dark:bg-dSecondary"
            txtColor="text-text"
            dTxtColor="text-text"
            disabled={true}
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-xs">
        {new Date(binnedTask.lastEditedAt).toLocaleString()}
      </div>
      <PlusCircleIcon
        className="absolute  z-4 top-1 left-2 hover:text-comp h-[20px]"
        onClick={handleRestoreDispatch}
      />
      <MinusCircleIcon
        className="absolute  z-4 top-1 right-2 hover:text-red-500 h-[20px]"
        onClick={handleDeleteDispatch}
      />
    </div>
  );
};

export default BinnedTaskItem;
