import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../features/tasks/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Spinner from "../components/Spinner";
import Layout from "../styles/Layout";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getTasks());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

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
          {tasks.length > 0 ? (
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
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
