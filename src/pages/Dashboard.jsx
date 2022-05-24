import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, getBinnedTasks, reset } from "../features/tasks/taskSlice";
import { logout, reset as resetAuth } from "../features/auth/authSlice";
import TaskForm from "../components/TaskForm";
import Spinner from "../components/Spinner";
import jwt_decoded from "jwt-decode";
import Error from "../components/Error";
import TaskFilter from "../components/TaskFilter";
import Layout from "../styles/Layout";
import BinnedTasks from "../components/BinnedTasks";
import Button from "../components/ButtonComponents/Button";
import DashboardWelcome from "../components/DashboardSections/DashboardWelcome";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message, binnedTasks } = useSelector(
    (state) => state.tasks
  );
  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user) {
      navigate("/");
    }
    if (user && !isError) {
      dispatch(getTasks());
      dispatch(getBinnedTasks());
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

  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <Layout>
      <div className=" min-w-full flex flex-col max-w-full min-h-full">
        <DashboardWelcome />
        <div className="flex max-w-full flex-col  md:flex-row md:gap-2">
          <div className="flex flex-col gap-2 md:flex-[1] min-w-0  rounded-lg">
            <TaskForm
              tasks={tasks}
              isError={isError}
              isLoading={isLoading}
              handleError={handleError}
            />

            <Button text="A" onClick={() => setOpen(!open)} />
            <div className="relative">
              {!isLoading ? (
                <BinnedTasks binnedTasks={binnedTasks} open={open} />
              ) : (
                <Spinner />
              )}
            </div>
          </div>
          <section className="flex flex-col gap-2 md:flex-[2] min-w-0  md:mt-0 rounded-lg">
            <Error error={isError} handleError={handleError} text={message} />
            {!isLoading ? <TaskFilter tasks={tasks} /> : <Spinner />}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
