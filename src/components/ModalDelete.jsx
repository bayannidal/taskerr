import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import XCircleIcon from "@heroicons/react/solid/XCircleIcon";

export default function MyModal({ task, handleDispatch }) {
  let [isOpen, setIsOpen] = useState(false);
  //   const dispatch = useDispatch();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //   const handleDispatch = () => {
  //     return dispatch(deleteTask(task.id));
  //   };

  return (
    <>
      <div className="absolute  z-5 top-1 right-2">
        <button
          type="button"
          onClick={openModal}
          className="hover:text-red-500"
        >
          <XCircleIcon className="h-[25px]" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-primary dark:bg-dPrimary custom-shadow rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-red-500"
                >
                  Warning task will be deleted
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your task will be permanently deleted.
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-text bg-red-200 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={handleDispatch}
                  >
                    Got it, thanks!
                  </button>
                  <button onClick={closeModal} className="text-dText">
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
