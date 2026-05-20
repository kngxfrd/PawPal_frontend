
import { useNavigate } from "react-router-dom";
import { LiaUser } from "react-icons/lia";


function Navbar() {
 const navigate = useNavigate();
  return (
    <div className="bg-white flex flex-row justify-end px-15 items-center w-full h-17 border-b border-gray-200 shadow-md">
      <div onClick={() => navigate("/profile")} className="cursor-pointer bg-[#f1f7ff] text-[#155dfc] border border-[#155dfc] w-10 h-10 flex justify-center items-center rounded-full" >
        <LiaUser size={24}/>
       
      </div>
    </div>
  );
}

export default Navbar;
