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
import HeaderDashboard from "../components/HeaderDashboard";
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
      navigate("/");
    }
    if (user) {
      navigate("/dashboard");
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

  const Nav = () => {};
  return (
    <div className="layout min-w-full flex flex-col max-w-full min-h-full">
      {user ? <HeaderDashboard /> : null}
      <section className="p-2 custom-shadow bg-secondary dark:bg-dSecondary text-text dark:text-dText rounded-lg  mb-3">
        <h1 className=" p-2 font-extrabold text-lg">
          Welcome, {user && user.firstName + " " + user.lastName}!
        </h1>
      </section>
      <div className="flex max-w-full flex-col  md:flex-row md:gap-3">
        <div className="md:flex-[1] min-w-0 max-h-fit rounded-lg mb-3">
          <TaskForm
            tasks={tasks}
            isError={isError}
            isLoading={isLoading}
            handleError={handleError}
          />
        </div>
        <section className="md:flex-[2] min-w-0  md:mt-0 rounded-lg">
          <Error error={isError} handleError={handleError} text={message} />
          {!isLoading ? <TaskFilter tasks={tasks} /> : <Spinner />}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
