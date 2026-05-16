import { IoExitOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom";

function Profile() {
     const navigate = useNavigate();
  return (
    <div><button onClick={() => navigate("/login")} className="bg-[#f1f7ff] cursor-pointer flex items-center gap-2 text-[#155dfc] border border-[#155dfc] w-27 rounded-md h-9 justify-center">
          <IoExitOutline />
          Logout
        </button></div>
  )
}

export default Profile