import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import { Switch } from "@headlessui/react";
import { InputText } from "./InputText";
function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const dispatch = useDispatch();
  const expiresReplaced = expiresAt
    .toString()
    .replace("T", " ")
    .replace("Z", " ");
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTask({ title, description, completed, pinned, expiresReplaced })
    );
    setTitle("");
    setDescription("");
    setCompleted(false);
    setPinned(false);
    setExpiresAt("");
  };

  return (
    <section className=" bg-primary dark:bg-dPrimary text-text dark:text-dText rounded-lg">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="text" className="font-bold ml-2">
            Create a new Taskrr.
          </label>
          <div className="flex mt-5">
            <InputText
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do yo have to do..."
            />
          </div>
          <div className="flex">
            <InputText
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="How would you describe it..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="datetime" className=" ml-2 font-semibold">
              Add expiry date (optional)
            </label>
            <InputText
              type="datetime-local"
              name="description"
              id="description"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              step="1"
              customClass="relative min-w-[95%]"
            />
          </div>

          <div className="flex justify-between">
            {" "}
            <div className="flex gap-2 items-center pt-5 pl-2">
              <label htmlFor="completed" className="font-bold">
                Completed
              </label>
              <Switch
                checked={completed}
                onChange={setCompleted}
                className={`${
                  completed ? "bg-green-500" : "bg-gray-200 dark:bg-dSecondary"
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
            <div className="flex gap-2 items-center pt-5 pr-2">
              <label htmlFor="completed" className="font-bold">
                Pinned
              </label>
              <Switch
                checked={pinned}
                onChange={setPinned}
                className={`${
                  pinned ? "bg-purple-500" : "bg-gray-200 dark:bg-dSecondary"
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
          type="submit"
          className="bg-third hover:bg-opacity-90 w-full p-3 font-bold text-xl rounded-lg dark:text-black"
        >
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
