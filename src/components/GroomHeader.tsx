import { IoLocationOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LiaUser } from "react-icons/lia";

interface GroomHeaderProps {
  shopname: string;
  address: string;
  totalslots: number;
  occupancyrate: number;
  openSlots: number;
  occupiedSlots: number;
}

function GroomHeader({
  shopname,
  address,
  totalslots,
  occupancyrate,
  openSlots,
  occupiedSlots,
}: GroomHeaderProps) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full h-70 text-white bg-gradient-to-r from-[#9912f9] via-[#ba2abf] to-[#de0183] pt-6 px-15">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[36px] font-bold">{shopname}</h1>
            <p className="text-[15px] flex items-center gap-2">
              <IoLocationOutline size={20} /> {address}
            </p>
          </div>
          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer bg-white/13 hover:bg-white/30 backdrop-blur-sm text-white w-15 h-15 flex justify-center items-center rounded-full"
          >
            <LiaUser size={35} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="p-5 bg-white/13 hover:bg-white/30 backdrop-blur-sm text-white w-60 h-30 mt-6 rounded-lg">
            <h1 className="flex items-center gap-3">
              <FiCalendar size={23} /> Total Slots
            </h1>
            <h1 className="pt-3 text-[35px] font-bold">{totalslots} </h1>
          </div>
          <div className="p-5 bg-white/13 hover:bg-white/30 backdrop-blur-sm text-white w-60 h-30 mt-6 rounded-lg">
            <h1 className="flex items-center gap-3">
              <IoMdCheckmarkCircleOutline size={23} /> Open Slots
            </h1>
            <h1 className="pt-3 text-[35px] font-bold">{openSlots} </h1>
          </div>
          <div className="p-5 bg-white/13 hover:bg-white/30 backdrop-blur-sm text-white w-60 h-30 mt-6 rounded-lg">
            <h1 className="flex items-center gap-3">
              <MdOutlineCancel size={23} /> Occupied Slots
            </h1>
            <h1 className="pt-3 text-[35px] font-bold">{occupiedSlots} </h1>
          </div>
          <div className="p-5 bg-white/13 hover:bg-white/30 backdrop-blur-sm text-white w-60 h-30 mt-6 rounded-lg">
            <h1 className="flex items-center gap-3">
              <BsCurrencyDollar size={23} /> Occupancy Rate
            </h1>
            <h1 className="pt-3 text-[35px] font-bold">{occupancyrate} </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroomHeader;
