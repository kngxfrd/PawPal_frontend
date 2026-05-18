import { LuPawPrint } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LiaUser } from "react-icons/lia";



interface NavbarProps {
    active:string,
    setActive: (id:string) => void
}
function Navbar({active, setActive}:NavbarProps) {
 const navigate = useNavigate();
  return (
    <div className="bg-white fixed flex flex-row justify-between px-15 items-center w-full h-17 shadow-sm">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setActive("dashboard")}
      >
        <LuPawPrint
          size={35}
          color={active === "home" ? "#155dfc" : "#155dfc"}
        />
        <h1 className="font-bold text-[18px]">PawPal Ghana</h1>
      </div>
      <div
        className={`flex items-center w-30 rounded-md h-9 justify-center gap-2 cursor-pointer ${active === "dashboard" ? "bg-[#dbeafe] text-[#155dfc]" : "text-gray-600"}`}
        onClick={() => setActive("dashboard")}
      >
        <LuLayoutDashboard />
        Dashboard
      </div>
      <div
        className={`flex items-center w-35 rounded-md h-9 justify-center gap-2 cursor-pointer ${active === "groomers" ? "bg-[#dbeafe] text-[#155dfc]" : "text-gray-600"}`}
        onClick={() => setActive("groomers")}
      >
        <FaListUl />
        All Groomers
      </div>
      <div
        className={`flex items-center w-27 rounded-md h-9 justify-center gap-2  cursor-pointer ${active === "discover" ? "bg-[#dbeafe] text-[#155dfc]" : "text-gray-600"}`}
        onClick={() => setActive("discover")}
      >
        <IoLocationOutline />
        <h3>Discover</h3>
      </div>
      <div onClick={() => navigate("/profile")} className="cursor-pointer bg-[#f1f7ff] text-[#155dfc] border border-[#155dfc] w-12 h-12 flex justify-center items-center rounded-full" >
        <LiaUser size={24}/>
       
      </div>
    </div>
  );
}

export default Navbar;
