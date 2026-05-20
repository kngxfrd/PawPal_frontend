import { LuLayoutDashboard } from "react-icons/lu";
import { IoLocationOutline, IoCloseOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { LuPawPrint } from "react-icons/lu";
import { PiPawPrint } from "react-icons/pi";
import { LuCalendar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

function Sidebar({ active, setActive, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    navigate("/login");
  }

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-35 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setSidebarOpen(false)} 
      />

      {/* Sidebar Panel */}
      <div className={`fixed flex flex-col h-screen bg-white border-r border-gray-100 shadow-xs w-60 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <LuPawPrint size={28} color="#155dfc" className="shrink-0 animate-pulse" />
            <h1 className="font-bold text-[18px] text-gray-800 tracking-tight">PawPal GH</h1>
          </div>
          {/* Close button on mobile */}
          <button 
            type="button" 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 md:hidden"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 p-3 flex-1 overflow-y-auto">
          <div
            className={`flex items-center w-full rounded-xl h-10 px-4 gap-3 cursor-pointer text-sm font-medium transition-all duration-200 ${
              active === "dashboard" 
                ? "bg-[#dbeafe] text-[#155dfc] shadow-xs" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onClick={() => {
              setActive("dashboard");
              setSidebarOpen(false);
            }}
          >
            <LuLayoutDashboard size={16}/>
            <span>Dashboard</span>
          </div>
          <div
            className={`flex items-center w-full rounded-xl h-10 px-4 gap-3 cursor-pointer text-sm font-medium transition-all duration-200 ${
              active === "mypets" 
                ? "bg-[#dbeafe] text-[#155dfc] shadow-xs" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onClick={() => {
              setActive("mypets");
              setSidebarOpen(false);
            }}
          >
            <PiPawPrint size={16}/>
            <span>My Pets</span>
          </div>
          <div
            className={`flex items-center w-full rounded-xl h-10 px-4 gap-3 cursor-pointer text-sm font-medium transition-all duration-200 ${
              active === "groomers" 
                ? "bg-[#dbeafe] text-[#155dfc] shadow-xs" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onClick={() => {
              setActive("groomers");
              setSidebarOpen(false);
            }}
          >
            <FaListUl size={15}/>
            <span>All Groomers</span>
          </div>
          <div
            className={`flex items-center w-full rounded-xl h-10 px-4 gap-3 cursor-pointer text-sm font-medium transition-all duration-200 ${
              active === "bookings" 
                ? "bg-[#dbeafe] text-[#155dfc] shadow-xs" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onClick={() => {
              setActive("bookings");
              setSidebarOpen(false);
            }}
          >
            <LuCalendar size={16}/>
            <span>Bookings</span>
          </div>
          <div
            className={`flex items-center w-full rounded-xl h-10 px-4 gap-3 cursor-pointer text-sm font-medium transition-all duration-200 ${
              active === "discover" 
                ? "bg-[#dbeafe] text-[#155dfc] shadow-xs" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onClick={() => {
              setActive("discover");
              setSidebarOpen(false);
            }}
          >
            <IoLocationOutline size={17}/>
            <span>Discover</span>
          </div>
        </div>

        <div className="p-3 border-t border-gray-100 flex flex-col gap-1">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center px-4 h-10.5 rounded-xl text-sm font-bold text-rose-700 bg-rose-50/50 hover:bg-rose-50 hover:text-rose-800 border border-rose-100/50 hover:border-rose-200 active:scale-98 transition-all duration-200 w-full shadow-3xs"
          >
            <span>Logout</span>
          </button>
        </div>

      </div>
    </>
  );
}

export default Sidebar;