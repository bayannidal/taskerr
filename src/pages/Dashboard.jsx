import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../features/tasks/taskSlice";
import { logout, reset as resetAuth } from "../features/auth/authSlice";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Spinner from "../components/Spinner";
import jwt_decoded from "jwt-decode";
import XIcon from "@heroicons/react/solid/XIcon";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
      setDisplay(true);
    }
    if (!user) {
      navigate("/login");
    }

    if (user) {
      dispatch(getTasks());
      const decodedJwt = jwt_decoded(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logout());
      }
    }

    return () => {
      dispatch(resetAuth());
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  const handleError = () => {
    dispatch(reset());
    setDisplay(false);
  };

  return (
    <div className="px-4 pt-14 lg:pt-20 w-full">
      <div className="custom-shadow rounded-lg p-1">
        <section className="p-2 bg-secondary rounded-lg  mb-5 custom-shadow">
          <h1 className="font-bold text-2xl">
            Welcome, {user && user.firstName + " " + user.lastName}!
          </h1>
          <p className="font-semibold">Tasks Dashboard</p>
        </section>
        <TaskForm />
      </div>
      <section className="mt-5 custom-shadow rounded-lg p-1">
        <div className="rounded-lg h-full text-[0.75rem] lg:text-base">
          {isError ? <div>{message}</div> : <></>}
          {isError ? (
            <div className="bg-red-400 p-4 rounded-lg flex justify-between items-center text-white hover:bg-opacity-80 mb-5 animate__animated animate__shakeX">
              Bad Credentials <XIcon className="h-6" onClick={handleError} />
            </div>
          ) : (
            <></>
          )}

          {!isLoading ? (
            <>
              {tasks && tasks.length > 0 ? (
                <>
                  {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </>
              ) : (
                <h1 className="font-bold text-center mt-2">
                  You have not set any goals
                </h1>
              )}
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
