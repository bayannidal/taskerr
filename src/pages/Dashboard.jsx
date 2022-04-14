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
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(display);
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
      setDisplay(true);
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
    setDisplay(false);
  };

  return (
    <div className="px-4 pt-14 lg:pt-32 pb-5 w-full">
      <div className="custom-shadow rounded-lg p-1">
        <section className="p-2 bg-secondary dark:bg-dSecondary dark:text-white rounded-lg  mb-5 custom-shadow">
          <h1 className="font-bold text-2xl">
            Welcome, {user && user.firstName + " " + user.lastName}!
          </h1>
          <p className="font-semibold">Tasks Dashboard</p>
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
<<<<<<< HEAD
          <Error error={isError} handleError={handleError} text={message} />
=======
          <Error
            error={isError}
            handleError={handleError}
            text={message}
            customStyle="mt-5"
          />
>>>>>>> production
          {!isLoading ? (
            <>
              {tasks.length > 0 && state === 0 ? (
                <>
                  {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                      {task && <TaskItem key={task.id} task={task} />}
                    </React.Fragment>
                  ))}
                </>
              ) : null}
              {tasks.length > 0 && state === 1 ? (
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
              {tasks.length > 0 && state === 2 ? (
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
              {tasks.length > 0 && state === 3 ? (
                <>
                  {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                      {task.expiresAt === true && (
                        <TaskItem key={task.id} task={task} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : null}
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
