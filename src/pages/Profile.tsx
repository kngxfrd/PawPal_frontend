import { IoExitOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  return (
    <div className="p-15 flex justify-between ">
      <div
        className="cursor-pointer text-[#155dfc]/70 border border-[#155dfc] w-60 h-60 flex justify-center items-center rounded-full"
      >
        <LiaUser size={120} />
      </div>
      <button
        onClick={() => navigate("/login")}
        className="bg-[#f1f7ff] cursor-pointer flex  items-center gap-2 text-[#155dfc] border border-[#155dfc] w-27 rounded-md h-9 justify-center"
      >
        <IoExitOutline />
        Logout
      </button>
    </div>
  );
}

export default Profile;
