import { Switch } from "@headlessui/react";
import { useState } from "react";
import XCircleIcon from "@heroicons/react/solid/XCircleIcon";

function TaskItem({ task }) {
  const [completed, setCompleted] = useState(task.completed);
  const [pinned, setPinned] = useState(task.pinned);
  return (
    <div class="relative custom-shadow rounded-lg bg-secondary mb-1 last:mb-0 group">
      <div class="min-w-full  relative group  flex flex-col sm:flex-row  sm:justify-between">
        <div class="px-2 py-4  text-sm font-medium text-gray-900flex flex-col  border-b sm:border-b-0  flex-1">
          <div class=" text-gray-900  py-4 text-left font-bold">Date</div>
          {new Date(task.createdAt).toLocaleString("en-US")}
        </div>
        <div class="text-sm text-gray-900 font-light px-2 py-4 flex flex-col  justify-between border-b sm:border-b-0  flex-1">
          <div class=" text-gray-900  py-4 text-left font-bold">Title</div>
          {task.title}
        </div>
        <div class="text-sm text-gray-900 font-light px-2 py-4 flex flex-col justify-between border-b sm:border-b-0 flex-1">
          <div class=" text-gray-900  py-4 text-left font-bold">
            Description
          </div>
          {task.description}
        </div>
        <div class="text-sm text-gray-900 font-light px-2 py-4 flex flex-row justify-between flex-1">
          <div className="flex flex-col">
            <div class=" text-gray-900  py-4 text-left font-bold">
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
            <div class="text-gray-900  py-4 text-left font-bold">Pinned</div>
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
      <button className="absolute  z-20 top-1 right-2 hover:text-red-500">
        <XCircleIcon className="h-[20px]" />
      </button>
    </div>
  );
}

export default TaskItem;
