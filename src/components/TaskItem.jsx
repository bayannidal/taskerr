import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";
import UpdateTaskModal from "./UpdateTaskModal";
import ModalDelete from "./ModalDelete";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";

function TaskItem({ task, ...classNames }) {
  const [completed, setCompleted] = useState(task.completed);
  const [pinned, setPinned] = useState(task.pinned);
  const dispatch = useDispatch();
  const handleDispatch = () => {
    return dispatch(deleteTask(task.id));
  };
  return (
    <div className="relative min-h-[10rem] custom-shadow rounded-lg bg-secondary dark:bg-dSecondary  text-text dark:text-dText mb-3 last:mb-0 group flex items-center justify-center">
      <div className="min-w-full  relative group  flex flex-col md:flex-row  md:justify-between mt-5">
        <div className="text-sm font-light px-2 py-4 flex flex-col justify-between border-b md:border-b-0 flex-1">
          <div className=" text-left font-bold">Date</div>
          {new Date(task.expiresAt).toLocaleString()}
        </div>
        <div className="text-sm  font-light px-2 py-4 flex flex-col  justify-between border-b md:border-b-0  flex-1">
          <div className=" text-left font-bold">Title</div>
          {task.title}
        </div>
        <div className="text-sm font-light px-2 py-4 flex flex-col justify-between border-b md:border-b-0 flex-1">
          <div className="text-left font-bold">Description</div>
          {task.description}
        </div>
        <div className="text-sm font-light px-2 py-4 flex flex-row md:flex-col justify-between border-b md:border-b-0 gap-2">
          <Switch
            checked={completed}
            onClick={setCompleted}
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
              completed ? "bg-green-500" : "bg-primary dark:bg-dPrimary"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                completed
                  ? "translate-x-6 bg-white"
                  : "translate-x-1 bg-green-500"
              } inline-block w-4 h-4 transform  rounded-full`}
            >
              <CheckIcon
                className={`h-4 ${
                  completed ? "text-green-500" : "text-dText"
                }  z-50`}
              />
            </span>
          </Switch>
          <Switch
            checked={pinned}
            onClick={setPinned}
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
              pinned ? "bg-purple-500" : "bg-primary dark:bg-dPrimary"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                pinned
                  ? "translate-x-6 bg-primary"
                  : "translate-x-1 bg-purple-500"
              } inline-block w-4 h-4 transform  rounded-full`}
            >
              <PaperClipIcon
                className={`h-4 ${
                  pinned ? "text-purple-500" : "text-dText"
                }  z-50`}
                src="https://cdn-icons.flaticon.com/png/512/2951/premium/2951412.png?token=exp=1650283850~hmac=51518933969d5c65aec424482d6facaf"
              />
            </span>
          </Switch>
        </div>
      </div>
      <ModalDelete task={task} handleDispatch={handleDispatch} />
      <UpdateTaskModal task={task} />
    </div>
  );
}

export default TaskItem;
