import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import TaskItem from "./TaskItem";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ tasks, isLoading, isError, handleError }) {
  const [state, setState] = useState(0);
  const sortList = ["All", "Pinned", "Completed", "Expiry"];
  console.log(state);
  return (
    <div className="w-full px-2 py-10 sm:px-0">
      <Tab.Group onChange={(idx) => setState(idx)}>
        <Tab.List className="flex p-1 space-x-1 bg-secondary dark:bg-dSecondary  rounded-lg mb-2 ">
          {sortList.map((category, idx) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 leading-5  text-text dark:text-dText font-semibold text-lg lg:text-xl p-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-dPrimary ",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
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
            className={classNames("rounded-lg p-3", "focus:outline-none")}
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
            className={classNames("rounded-lg p-3", "focus:outline-none")}
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
              <></>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames("rounded-lg p-3", "focus:outline-none")}
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
            className={classNames("rounded-lg p-3", "focus:outline-none")}
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
