import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import useVH from "react-viewport-height";
// import Landing from "./pages/Landing";
import { useSelector } from "react-redux";
import useDarkMode from "./hook/useDarkMode";
import MissingPage from "./pages/MissingPage";
function App() {
  useVH();
  const { user } = useSelector((state) => state.auth);
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <>
      <Router>
        <div className="App bg-primary dark:bg-dPrimary  ">
          {user ? <Header /> : null}
          {/* <Header /> */}
          <Routes>
            {/* <Route path="/" element={<Landing />} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
