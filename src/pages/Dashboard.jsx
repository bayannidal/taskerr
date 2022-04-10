import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();

  const { user, isError } = useSelector((state) => state.auth);

  console.log(isError);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <section>
        <h1>Welcome!</h1>
      </section>
    </>
  );
}

export default Dashboard;
