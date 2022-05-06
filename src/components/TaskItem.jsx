import { Switch } from "@headlessui/react";
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
    <div className="relative  custom-shadow rounded-lg bg-secondary dark:bg-dSecondary  text-text dark:text-dText  group">
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
          <Switch
            checked={completed}
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
            className={`${
              completed ? "bg-green-500" : "bg-primary dark:bg-dPrimary"
            } relative inline-flex items-center h-6 rounded-full w-11 custom-shadow`}
          >
            <span className="sr-only">Task completed</span>
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
            className={`${
              pinned ? "bg-purple-500" : "bg-primary dark:bg-dPrimary"
            } relative inline-flex items-center h-6 rounded-full w-11 custom-shadow`}
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
      <div className="absolute bottom-4 left-4 text-xs">
        {new Date(task.lastEditedAt).toLocaleString()}
      </div>
      <ModalDelete task={task} handleDispatch={handleDispatch} />
      <UpdateTaskModal task={task} />
    </div>
  );
}

export default TaskItem;
