import { Switch } from "@headlessui/react";
import { useState } from "react";
import XCircleIcon from "@heroicons/react/solid/XCircleIcon";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";
import UpdateTaskModal from "./UpdateTaskModal";
function TaskItem({ task }) {
  const [completed, setCompleted] = useState(task.completed);
  const [pinned, setPinned] = useState(task.pinned);

  const dispatch = useDispatch();
  const handleDispatch = () => {
    return dispatch(deleteTask(task.id));
  };
  if (setPinned && setCompleted && "abc") {
  }
  return (
    <div className="relative min-h-[10rem] custom-shadow rounded-lg bg-secondary dark:bg-dSecondary  text-text dark:text-dText mb-3 last:mb-0 group flex items-center justify-center">
      <div className="min-w-full  relative group  flex flex-col md:flex-row  md:justify-between">
        <div className="px-2 py-4  text-sm font-medium text-gray-900flex flex-col  border-b md:border-b-0  flex-1">
          <div className="  py-4 text-left font-bold">Date</div>
          {new Date(task.expiresAt).toLocaleString("en-US")}
        </div>
        <div className="text-sm  font-light px-2 py-4 flex flex-col  justify-between border-b md:border-b-0  flex-1">
          <div className="  py-4 text-left font-bold">Title</div>
          {task.title}
        </div>
        <div className="text-sm font-light px-2 py-4 flex flex-col justify-between border-b md:border-b-0 flex-1">
          <div className=" py-4 text-left font-bold">Description</div>
          {task.description}
        </div>
        <div className="text-sm font-light px-2 py-4 flex flex-row justify-between flex-1">
          <div className="flex flex-col">
            <div className="   py-4 text-left font-bold">Completed</div>

            <Switch
              checked={completed}
              onChange={() => {
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
              className={`${
                completed ? "bg-green-500" : "bg-gray-200 dark:bg-dPrimary"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  completed ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
          <div className="flex flex-col">
            <div className="  py-4 text-left font-bold">Pinned</div>

            <Switch
              checked={pinned}
              onChange={() => {
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
              className={`${
                pinned ? "bg-purple-500" : "bg-gray-200 dark:bg-dPrimary"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  pinned ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
        </div>
      </div>
      <button
        className="absolute  z-20 top-1 right-2 hover:text-red-500"
        onClick={handleDispatch}
      >
        <XCircleIcon className="h-[20px]" />
      </button>
      <UpdateTaskModal task={task} />
    </div>
  );
}

export default TaskItem;
