import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../features/tasks/taskSlice";
import { logout, reset as resetAuth } from "../features/auth/authSlice";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Spinner from "../components/Spinner";
import jwt_decoded from "jwt-decode";
import Error from "../components/Error";
function Dashboard() {
  const [state, setState] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  const sortList = ["All", "Pinned", "Completed", "Expiry"];

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      // setTimeout(() => dispatch(reset()), 5000);
    }
    if (!user) {
      navigate("/login");
    }

    if (user && !isError) {
      dispatch(getTasks());
      const decodedJwt = jwt_decoded(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(resetAuth());
        dispatch(logout());
      }
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  const handleError = () => {
    dispatch(reset());
  };

  return (
    <div className="px-2 lg:px-10  pt-14 lg:pt-32 pb-5 w-full flex flex-col items-center">
      <div className="max-w-[100%] min-w-[100%] md:max-w-[90%] md:min-w-[90%]  lg:max-w-[80%] lg:min-w-[80%]">
        <div className="custom-shadow rounded-lg p-1">
          <section className="p-2 bg-secondary dark:bg-dSecondary dark:text-white rounded-lg  mb-5 custom-shadow">
            <h1 className="font-bold text-2xl">
              Welcome, {user && user.firstName + " " + user.lastName}!
            </h1>
            <p className="ml-2 mt-2 font-medium">Tasks Dashboard</p>
          </section>
          <TaskForm />
        </div>
        <section className="mt-5 custom-shadow rounded-lg p-1">
          <div className="flex gap-2 bg-secondary dark:bg-dSecondary  rounded-lg p-1 mb-2">
            {sortList.map((item, index) => (
              <button
                type="button"
                className={` flex-grow font-semibold text-l lg:text-xl dark:text-white  p-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-dPrimary nav-links w-[33%] ${
                  index === state
                    ? "bg-primary dark:bg-dPrimary hover:bg-[rgba(255,255,255)] dark:hover:bg-[rgba(0,0,0,0.2)] border-2"
                    : ""
                }`}
                key={index}
                onClick={() => setState(index)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="rounded-lg h-full text-[0.75rem] lg:text-base">
            <Error error={isError} handleError={handleError} text={message} />
            {!isLoading ? (
              <>
                {tasks.length > 0 ? (
                  <>
                    {state === 0 ? (
                      <>
                        {tasks.map((task) => (
                          <React.Fragment key={task.id}>
                            {task && <TaskItem key={task.id} task={task} />}
                          </React.Fragment>
                        ))}
                      </>
                    ) : null}
                    {state === 1 ? (
                      <>
                        {tasks.map((task) => (
                          <React.Fragment key={task.id}>
                            {task.pinned === true && (
                              <TaskItem key={task.id} task={task} />
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    ) : null}
                    {state === 2 ? (
                      <>
                        {tasks.map((task) => (
                          <React.Fragment key={task.id}>
                            {task.completed === true && (
                              <TaskItem key={task.id} task={task} />
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    ) : null}
                    {state === 3 ? (
                      <>
                        {[...tasks]
                          .sort(
                            (a, b) =>
                              new Date(a.expiresAt) - new Date(b.expiresAt)
                          )
                          .map((task) => (
                            <React.Fragment key={task.id}>
                              {task && <TaskItem key={task.id} task={task} />}
                            </React.Fragment>
                          ))}
                      </>
                    ) : null}
                  </>
                ) : (
                  <h1 className="text-center font-bold text-xl text-text dark:text-dText">
                    You have no tasks
                  </h1>
                )}
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
