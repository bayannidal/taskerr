import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PencilAltIcon from "@heroicons/react/solid/PencilAltIcon";
import { useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import { InputText } from "./InputText";
import { updateTask } from "../features/tasks/taskSlice";

export default function MyModal({ task }) {
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [pinned, setPinned] = useState(task.pinned);
  const [expiresAt, setExpiresAt] = useState(task.expiresAt);
  const dispatch = useDispatch();
  const expiresReplaced = expiresAt
    .toString()
    .replace("T", " ")
    .replace("Z", " ");
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        id: task.id,
        title,
        description,
        completed,
        pinned,
        expiresReplaced,
      })
    );

    setTitle("");
    setDescription("");
    setCompleted(false);
    setPinned(false);
    setExpiresAt("");
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="absolute  z-4 top-1 left-2">
        <button type="button" onClick={openModal} className="hover:text-third">
          <PencilAltIcon className="h-[25px]" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-primary dark:bg-dPrimary  bg-opacity-10 dark:bg-opacity-10  backdrop-filter backdrop-blur-lg" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-primary dark:bg-dPrimary text-text dark:text-dText inline-block w-full max-w-[95%] lg:max-w-[80%] p-8 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
                <section className=" ">
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label htmlFor="text" className="font-bold ml-2">
                        Edit task..
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
                        <label
                          htmlFor="datetime"
                          className=" ml-2 font-semibold"
                        >
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
                              completed
                                ? "bg-green-500"
                                : "bg-gray-200 dark:bg-dSecondary"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
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
                              pinned
                                ? "bg-purple-500"
                                : "bg-gray-200 dark:bg-dSecondary"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
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
                      Update
                    </button>
                  </form>
                  <button
                    type="submit"
                    className="w-full p-3 font-bold text-xl rounded-lg text-text dark:text-dText"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </section>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
