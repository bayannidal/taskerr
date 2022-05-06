import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import { Switch } from "@headlessui/react";
import { InputText } from "./InputText";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";
import Button from "./ButtonComponents/Button";
import { Textarea } from "./Textarea";
function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const [validation, setValidation] = useState(false);
  const dispatch = useDispatch();
  const expiresReplaced = expiresAt
    .toString()
    .replace("T", " ")
    .replace("Z", " ");
  const onSubmit = (e) => {
    e.preventDefault();
    if (title.length > 0 && description.length > 0) {
      dispatch(
        createTask({ title, description, completed, pinned, expiresReplaced })
      );
      setValidation(false);
    } else {
      setValidation(true);
    }
    setTimeout(() => setValidation(false), 2000);
    setTitle("");
    setDescription("");
    setCompleted(false);
    setPinned(false);
    setExpiresAt("");
  };

  return (
    <section className="p-2 bg-secondary custom-shadow dark:bg-dSecondary text-text dark:text-dText rounded-lg">
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="mb-3">
          <label
            htmlFor="text"
            className="font-bold ml-2 text-text dark:text-dText"
          >
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
              bgColor="bg-primary dark:bg-dPrimary"
              validation={validation}
            />
          </div>
          <div className="flex">
            <Textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="How would you describe it..."
              bgColor="bg-primary dark:bg-dPrimary"
              validation={validation}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col  gap-2 items-start pt-5 pl-2">
              <label htmlFor="completed" className="font-bold">
                Completed
              </label>
              <Switch
                checked={completed}
                onChange={setCompleted}
                className={`${
                  completed ? "bg-green-500" : "bg-primary dark:bg-dPrimary"
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    completed
                      ? "translate-x-6 bg-primary"
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
            </div>
            <div className="flex gap-2 flex-col items-end pt-5 pr-2">
              <label htmlFor="completed" className="font-bold">
                Pinned
              </label>
              <Switch
                checked={pinned}
                onChange={setPinned}
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
                  } inline-block w-4 h-4 transform  rounded-full custom-shadow`}
                >
                  {/* <FingerPrintIcon /> */}
                  <PaperClipIcon
                    className={`h-4 ${
                      pinned ? "text-purple-500" : "text-dText"
                    }  z-50`}
                  />
                </span>
              </Switch>
            </div>
          </div>
        </div>
        <Button type="submit" text="Add Task" />
      </form>
    </section>
  );
}

export default TaskForm;
