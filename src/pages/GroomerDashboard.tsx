import AppointmentSchedule from "../components/AppointmentSchedule";
import GroomerSettings from "../components/GroomerSettings";

interface NavbarProps {
  active: string;
  setActive: (id: string) => void;
}
function GroomerDashboard({ active, setActive }: NavbarProps) {
  return (
    <div>
      <div className="px-15 mt-6 flex ">
        <div
          className={`flex items-center w-50 rounded-md h-10 justify-center gap-2 cursor-pointer ${active === "Appointment Schedule" ? "bg-[#9810fa] text-white" : "text-black"}`}
          onClick={() => setActive("Appointment Schedule")}
        >
          Appointment Schedule
        </div>
        <div
          className={`flex items-center w-35 rounded-md h-10 justify-center gap-2 cursor-pointer ${active === "Settings" ? "bg-[#9810fa] text-white" : "text-black"}`}
          onClick={() => setActive("Settings")}
        >
          Settings
        </div>
      </div>
      <main>
          {active === "Appointment Schedule" && <AppointmentSchedule />}
          {active === "Settings" && <GroomerSettings />}
        </main>
    </div>
  );
}

export default GroomerDashboard;
