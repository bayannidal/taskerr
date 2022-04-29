import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../features/tasks/taskSlice";
import { logout, reset as resetAuth } from "../features/auth/authSlice";
import TaskForm from "../components/TaskForm";
import Spinner from "../components/Spinner";
import jwt_decoded from "jwt-decode";
import Error from "../components/Error";
import TaskFilter from "../components/TaskFilter";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => dispatch(reset()), 5000);
    }
    if (!user) {
      navigate("/login");
    }
    if (user) {
      navigate("/");
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

  const handleError = () => {
    dispatch(reset());
  };

  return (
    <div className="layout min-w-full flex flex-col max-w-full min-h-full">
      <div className="flex  flex-col md:flex-row md:gap-2">
        <div className=" flex flex-col max-h-fit md:max-w-[35%] md:min-w-[35%] rounded-lg p-1">
          <section className="p-2 bg-secondary dark:bg-dSecondary text-text dark:text-dText rounded-lg  mb-5">
            <h1 className=" p-2 font-extrabold text-lg">
              Welcome, {user && user.firstName + " " + user.lastName}!
            </h1>
          </section>

          <TaskForm
            tasks={tasks}
            isError={isError}
            isLoading={isLoading}
            handleError={handleError}
          />
        </div>
        <section className="mt-5  md:mt-0 md:max-w-[65%] md:min-w-[65%] rounded-lg p-1">
          <Error error={isError} handleError={handleError} text={message} />
          {!isLoading ? <TaskFilter tasks={tasks} /> : <Spinner />}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
