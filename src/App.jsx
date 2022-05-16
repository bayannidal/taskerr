import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import useVH from "react-viewport-height";
// import Landing from "./pages/Landing";
import UserEdit from "./pages/UserEdit";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import MissingPage from "./pages/MissingPage";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/ResetPassword";
function App() {
  useVH();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="App bg-primary  dark:bg-dPrimary">
          {user ? <Header /> : null}
          <Routes>
            {/* <Route path="/" element={<Landing />} /> */}
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="user/edit" element={<UserEdit />} />
              <Route path="password/reset" element={<ResetPassword />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </>
  );
}

export default App;
