import { useState } from "react";
import Navbar from "../components/Navbar";
import Discover from "./Discover";
import Groomers from "./Groomers";
import Dashboard from "./Dashboard";
import Sidebar from "../components/Sidebar";
import MyPets from "./MyPets";
import Bookings from "./Bookings";

function Userpage() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - responsive and collapsible */}
      <Sidebar active={active} setActive={setActive} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main layout content area */}
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300 md:ml-60">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto">
          {active === "discover" && <Discover />}
          {active === "groomers" && <Groomers />}
          {active === "dashboard" && (
            <Dashboard />
          )}
          {active === "mypets" && <MyPets />}
          {active === "bookings" && <Bookings/>}
        </main>
      </div>
    </div>
  );
}

export default Userpage;
