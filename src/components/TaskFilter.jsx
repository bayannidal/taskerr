import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import TaskItem from "./TaskItem";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ tasks }) {
  const [state, setState] = useState(0);

  if (state) {
  }
  const sortList = ["All", "Pinned", "Completed"];
  if (tasks.length === 0) {
    return (
      <div className="w-full h-full flex items-center gap-2 justify-center font-bold   ">
        <h1 className="text-center w-full md:w-fit px-4 py-2 bg-comp text-white rounded-lg custom-shadow">
          No tasks found..👾
          <br />
          Hurry up and add some tasks!
        </h1>
      </div>
    );
  }
  return (
    <div className="">
      <Tab.Group
        onChange={(idx) => {
          setState(idx);
        }}
      >
        <Tab.List className="flex p-1 space-x-2 bg-secondary dark:bg-dSecondary  rounded-lg mb-3 custom-shadow ">
          {sortList.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-[33%] py-2.5 leading-5   font-semibold text-[0.7rem] lg:text-xl p-2 rounded-lg ",

                  selected
                    ? " bg-comp bg-opacity-30 border-inset-btn custom-shadow text-text dark:text-dText"
                    : "text-text dark:text-dText hover:bg-comp hover:bg-opacity-20"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="">
          {sortList.map((item, idx) => (
            <Tab.Panel
              className={classNames(
                "rounded-lg flex flex-wrap  gap-2",
                "focus:outline-none"
              )}
              key={idx}
            >
              {idx !== 0 ? (
                <>
                  {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                      {task[item.toLowerCase()] === true && (
                        <TaskItem key={task.id} task={task} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                      {task && <TaskItem key={task.id} task={task} />}
                    </React.Fragment>
                  ))}
                </>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
