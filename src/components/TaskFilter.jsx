import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import TaskItem from "./TaskItem";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ tasks, isLoading, isError, handleError }) {
  const [state, setState] = useState(0);
  const sortList = ["All", "Pinned", "Completed"];
  console.log(state);
  if (tasks.length === 0) {
    return <div className="text-center">No tasks found</div>;
  }
  return (
    <div className="w-full  sm:px-0">
      <Tab.Group onChange={(idx) => setState(idx)}>
        <Tab.List className="flex p-1 space-x-1 bg-secondary dark:bg-dSecondary  rounded-lg mb-2 ">
          {sortList.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-[33%] py-2.5 leading-5  text-text dark:text-dText font-semibold text-sm lg:text-xl p-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-dPrimary ",
                  "focus:outline-none",
                  selected
                    ? "bg-primary dark:bg-dPrimary hover:bg-[rgba(255,255,255)] dark:hover:bg-[rgba(0,0,0,0.2)] border-2"
                    : ""
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-lg p-1 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  gap-2",
              "focus:outline-none"
            )}
          >
            {tasks && state === 0 ? (
              <>
                {tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    {task && <TaskItem key={task.id} task={task} />}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <></>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-lg p-1 flex flex-col md:grid md:grid-cols-2  gap-2",
              "focus:outline-none"
            )}
          >
            {tasks && state === 1 ? (
              <>
                {tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    {task.pinned === true && (
                      <TaskItem key={task.id} task={task} />
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>a</>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-lg p-1 flex flex-col md:grid md:grid-cols-2  gap-2",
              "focus:outline-none"
            )}
          >
            {tasks && state === 2 ? (
              <>
                {tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    {task.completed === true && (
                      <TaskItem key={task.id} task={task} />
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <></>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-lg p-1 flex flex-col md:grid md:grid-cols-2  gap-2",
              "focus:outline-none"
            )}
          >
            {tasks && state === 3 ? (
              <>
                {[...tasks]
                  .sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt))
                  .map((task) => (
                    <React.Fragment key={task.id}>
                      {task && <TaskItem key={task.id} task={task} />}
                    </React.Fragment>
                  ))}
              </>
            ) : (
              <></>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
