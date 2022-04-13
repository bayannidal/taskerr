import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import XCircleIcon from "@heroicons/react/solid/XCircleIcon";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";

function TaskItem({ task }) {
  const [completed, setCompleted] = useState(task.completed);
  const [pinned, setPinned] = useState(task.pinned);
  const dispatch = useDispatch();
  const handleDispatch = () => {
    return dispatch(deleteTask(task.id));
  };
  return (
    <div className="relative custom-shadow rounded-lg bg-secondary mb-1 last:mb-0 group">
      <div className="min-w-full  relative group  flex flex-col sm:flex-row  sm:justify-between">
        <div className="px-2 py-4  text-sm font-medium text-gray-900flex flex-col  border-b sm:border-b-0  flex-1">
          <div className=" text-gray-900  py-4 text-left font-bold">Date</div>
          {new Date(task.createdAt).toLocaleString("en-US")}
        </div>
        <div className="text-sm text-gray-900 font-light px-2 py-4 flex flex-col  justify-between border-b sm:border-b-0  flex-1">
          <div className=" text-gray-900  py-4 text-left font-bold">Title</div>
          {task.title}
        </div>
        <div className="text-sm text-gray-900 font-light px-2 py-4 flex flex-col justify-between border-b sm:border-b-0 flex-1">
          <div className=" text-gray-900  py-4 text-left font-bold">
            Description
          </div>
          {task.description}
        </div>
        <div className="text-sm text-gray-900 font-light px-2 py-4 flex flex-row justify-between flex-1">
          <div className="flex flex-col">
            <div className=" text-gray-900  py-4 text-left font-bold">
              Completed
            </div>
            <Switch
              checked={completed}
              onChange={setCompleted}
              className={`${
                completed ? "bg-green-500" : "bg-gray-200"
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
            <div className="text-gray-900  py-4 text-left font-bold">
              Pinned
            </div>
            <Switch
              checked={pinned}
              onChange={setPinned}
              className={`${
                pinned ? "bg-purple-500" : "bg-gray-200"
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
        className="absolute  z-20 top-1 right-2 hover:text-red-500 "
        onClick={() => dispatch(deleteTask(task.id))}
      >
        <XCircleIcon className="h-[20px]" />
      </button>
    </div>
  );
}

export default TaskItem;
