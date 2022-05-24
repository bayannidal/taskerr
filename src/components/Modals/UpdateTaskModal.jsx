import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PencilAltIcon from "@heroicons/react/solid/PencilAltIcon";
import { useDispatch } from "react-redux";
import SwitchItem from "../SwitchItem";
import { InputText } from "../InputText";
import { updateTask } from "../../features/tasks/taskSlice";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import PaperClipIcon from "@heroicons/react/outline/PaperClipIcon";
import Button from "../ButtonComponents/Button";
import { Textarea } from "../Textarea";

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
      <div className="absolute  z-4 top-1 right-2">
        <button type="button" onClick={openModal} className="hover:text-comp">
          <PencilAltIcon className="h-[20px]" />
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
              <Dialog.Overlay className="fixed inset-0 bg-primary dark:bg-dPrimary  bg-opacity-60 dark:bg-opacity-60  backdrop-filter backdrop-blur-lg" />
            </Transition.Child>
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
              <div className="bg-primary dark:bg-dPrimary text-text dark:text-dText inline-block w-full max-w-[95%] lg:max-w-[800px] p-8 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
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
                        <Textarea
                          type="text"
                          name="description"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="How would you describe it..."
                        />
                      </div>
                      <div className="flex justify-between">
                        {" "}
                        <div className="">
                          <SwitchItem
                            type={completed}
                            onChange={setCompleted}
                            icon={<CheckIcon />}
                            primaryColor="bg-comp"
                            bgColor="bg-secondary"
                            dBgColor="dark:bg-dSecondary"
                            txtColor="text-text"
                          />
                        </div>
                        <div className="">
                          <SwitchItem
                            type={pinned}
                            onChange={setPinned}
                            icon={<PaperClipIcon />}
                            primaryColor="bg-third"
                            bgColor="bg-secondary"
                            dBgColor="dark:bg-dSecondary"
                            dTxtColor="text-text"
                            txtColor="text-text"
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" text="Update" />
                  </form>
                  <Button
                    type="submit"
                    className="w-full p-3 font-bold text-xl rounded-lg text-text dark:text-dText"
                    onClick={closeModal}
                    text="Cancel"
                    customClass="mt-2"
                    bgColor="bg-transparent dark:bg-dSecondary hover:bg-[rgba(0,0,0,0.01)] dark:text-dText"
                  />
                </section>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
