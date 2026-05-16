import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Groomers from "./pages/Groomers";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  const [active, setActive] = useState("dashboard");
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={
      <div>
        <Navbar active={active} setActive={setActive} />
        <main>
          {active === "discover" && <Discover />}
          {active === "groomers" && <Groomers />}
          {active === "dashboard" && <Dashboard />}
        </main>
      </div>
       } />
    </Routes>
    </>
   
  );
}

export default App;
