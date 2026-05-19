import { useState } from "react";
import Navbar from "../components/Navbar";
import Discover from "./Discover";
import Groomers from "./Groomers";
import Dashboard from "./Dashboard";
import Sidebar from "../components/Sidebar";
import MyPets from "./MyPets";
import { useAuth } from "../context/AuthContext";

function Userpage() {
  const { user } = useAuth();
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={active} setActive={setActive} />

      <div className="flex flex-col flex-1 overflow-hidden ml-56">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {active === "discover" && <Discover />}
          {active === "groomers" && <Groomers />}
          {active === "dashboard" && (
            <Dashboard
              totalbookings={6}
              totalcustomers={7}
              totalamount={"$300"}
            />
          )}
          {active === "mypets" && <MyPets />}
        </main>
      </div>
    </div>
  );
}

export default Userpage;
