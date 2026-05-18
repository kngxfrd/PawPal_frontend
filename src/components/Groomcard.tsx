import { IoLocationOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";

interface GroomcardProps {
  name: string;
  address: string;
  services: string[];
  phone: string;
  email: string;
  openSlots: number;
  occupiedSlots: number;
}

function Groomcard({ name, address, services, phone, email, openSlots, occupiedSlots }: GroomcardProps)  {
  return (
    <div className="w-full h-80 border border-gray-200 rounded-xl shadow-sm py-3 pl-10 shadow-md">
      <div className="flex gap-5">
        <h1 className="text-[28px] font-bold">{name}</h1>
        <p className="text-[15px] flex items-center gap-2 pt-1 text-gray-500">
          <IoLocationOutline /> {address}
        </p>
      </div>
      <div className="pt-3 flex gap-2 flex-wrap">
        {services.map((service) => (
          <span
            key={service}
            className="px-4 h-8 rounded-3xl bg-[#dbeafe] text-[#2051e7] flex items-center justify-center"
          >
            {service}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-1 pt-2">
        <h1 className="flex items-center gap-3 pt-2">
          <FiPhone />
          {phone}
        </h1>
        <h1 className="flex items-center gap-3">
          <IoMailOpenOutline />
          {email}
        </h1>
      </div>
      <div className="flex gap-10 pt-3">
        <div className="w-[25%] gap-30 h-15 bg-[#f0fdf4] text-[#008236] flex justify-left pl-3 items-center rounded-md">
          <h1 className="flex items-center gap-3"><FiCalendar />  Open Slots</h1>
          <h1 className="text-[24px] font-bold">{openSlots} </h1>
        </div>
        <div className="w-[25%] gap-25 h-15 bg-[#fef2f2] text-[#c10007] flex justify-left pl-3 items-center rounded-md">
          <h1 className="flex items-center gap-3"><FaRegClock />  Occupied Slots</h1>
          <h1 className="text-[24px] font-bold">{occupiedSlots} </h1>
        </div>
      </div>
      <div className="flex items-center justify-left mt-5">
        <button className="bg-[#155dfc] text-white rounded-md w-[55%] h-10">
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default Groomcard;
