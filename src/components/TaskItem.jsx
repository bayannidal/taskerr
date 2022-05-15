import SwitchItem from "./SwitchItem";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";
import UpdateTaskModal from "./UpdateTaskModal";
import ModalDelete from "./ModalDelete";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";

function TaskItem({ task }) {
  const [completed, setCompleted] = useState(task.completed);
  const [pinned, setPinned] = useState(task.pinned);
  const dispatch = useDispatch();
  const handleDispatch = () => {
    return dispatch(deleteTask(task.id));
  };
  return (
    <div className="relative flex-1 min-w-full md:min-w-[calc(50%-0.5rem)] 2xl:min-w-[calc(33%-0.5rem)] max-w-full custom-shadow rounded-lg bg-secondary dark:bg-dSecondary  text-text dark:text-dText  group">
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
            onChange={() => {
              setCompleted(!completed);
              dispatch(
                updateTask({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  completed: !task.completed,
                  pinned: task.pinned,
                })
              );
            }}
            icon={<CheckIcon />}
            primaryColor="bg-comp"
            bgColor="bg-primary"
            dBgColor="dark:bg-dPrimary"
            txtColor="text-text"
          />
          <SwitchItem
            type={pinned}
            onChange={() => {
              setPinned(!pinned);
              dispatch(
                updateTask({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  completed: task.completed,
                  pinned: !task.pinned,
                })
              );
            }}
            icon={<PaperClipIcon />}
            primaryColor="bg-third"
            bgColor="bg-primary"
            dBgColor="dark:bg-dPrimary"
            dTxtColor="text-dtext"
            txtColor="text-text"
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-xs">
        {new Date(task.lastEditedAt).toLocaleString()}
      </div>
      <ModalDelete task={task} handleDispatch={handleDispatch} />
      <UpdateTaskModal task={task} />
    </div>
  );
}

export default TaskItem;
