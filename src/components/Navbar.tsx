
import { useNavigate } from "react-router-dom";
import { LiaUser } from "react-icons/lia";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

function Navbar({ setSidebarOpen }: NavbarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userInitials = user 
    ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    : "U";

  return (
    <div className="bg-white flex flex-row justify-between md:justify-end px-6 md:px-8 items-center w-full h-16 border-b border-gray-100 shadow-xs">
      {/* Mobile Hamburger menu toggle button */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 md:hidden transition-colors"
      >
        <FiMenu size={20} />
      </button>

      {/* User profile avatar section */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-800 leading-tight">
              {user.first_name} {user.last_name}
            </span>
            <span className="text-[10px] font-medium text-[#155dfc] uppercase tracking-wider">
              {user.role}
            </span>
          </div>
        )}
        <div 
          onClick={() => navigate("/profile")} 
          className="cursor-pointer bg-blue-50 text-[#155dfc] hover:bg-[#155dfc] hover:text-white border border-blue-100 w-10 h-10 flex justify-center items-center rounded-full font-bold text-sm shadow-xs transition-all duration-200" 
        >
          {user ? userInitials : <LiaUser size={20}/>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
