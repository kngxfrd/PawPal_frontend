import { LuLayoutDashboard } from "react-icons/lu";
import { IoLocationOutline, IoExitOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { LuPawPrint } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
}

function Sidebar({ active, setActive }: SidebarProps) {

  return (
    <div className="fixed flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm w-60 ">
      
      <div className="flex items-center gap-2 pl-8 py-7">
        <LuPawPrint size={30} color="#155dfc" className="shrink-0" />
         <h1 className="font-bold text-[20px]">PawPal GH</h1>
      </div>


      <div className="flex flex-col gap-1 p-2 flex-1 pt-3">
        <div
        className={`flex items-center w-full rounded-md h-9 justify-left pl-4 gap-2 cursor-pointer ${active === "dashboard" ? "bg-[#dbeafe] text-[#155dfc] " : "text-gray-600"}`}
        onClick={() => setActive("dashboard")}
      >
        <LuLayoutDashboard size={14}/>
        Dashboard
      </div>
      <div
        className={`flex items-center w-full rounded-md h-9 justify-left pl-4  gap-2 cursor-pointer ${active === "mypets" ? "bg-[#dbeafe] text-[#155dfc] " : "text-gray-600"}`}
        onClick={() => setActive("mypets")}
      >
        <FaPlus size={14} />
        My Pets
      </div>
      <div
        className={`flex items-center w-full rounded-md h-9 justify-left pl-4  gap-2 cursor-pointer ${active === "groomers" ? "bg-[#dbeafe] text-[#155dfc] " : "text-gray-600 "}`}
        onClick={() => setActive("groomers")}
      >
        <FaListUl size={14}/>
        All Groomers
      </div>
      <div
        className={`flex items-center w-full rounded-md h-9 justify-left pl-4 gap-2  cursor-pointer ${active === "discover" ? "bg-[#dbeafe] text-[#155dfc] " : "text-gray-600 "}`}
        onClick={() => setActive("discover")}
      >
        <IoLocationOutline size={14}/>
        <h3 >Discover</h3>
      </div>
      </div>

      <div className="p-2 border-t border-gray-100 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 w-full">
          <IoExitOutline size={20} className="shrink-0" />
           <span>Logout</span>
        </button>
      </div>

    </div>
  );
}

export default Sidebar;