import { IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import { FiPhone, FiCalendar } from "react-icons/fi";

interface GroomcardProps {
  name: string;
  address: string;
  services: string[];
  phone: string;
  email: string;
  openSlots: number;
}

function Groomcard({
  name,
  address,
  services,
  phone,
  email,
  openSlots,
}: GroomcardProps) {
  return (
    <div className="border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[20px] font-bold text-gray-800">{name}</h1>
          <p className="text-sm flex items-center gap-1 text-gray-400 mt-1">
            <IoLocationOutline size={14} /> {address}
          </p>
        </div>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 shrink-0
  ${openSlots > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"}`}
        >
          <FiCalendar size={11} />
          {openSlots > 0 ? `${openSlots} open` : "Full"}
        </span>
      </div>

      <hr className="border-0" />

      <div className="flex gap-2 flex-wrap">
        {services.map((service) => (
          <span
            key={service}
            className="px-3 h-7 rounded-full bg-blue-50 text-[#155dfc] text-xs font-medium flex items-center"
          >
            {service}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <FiPhone size={13} /> {phone}
        </span>
        <span className="flex items-center gap-1">
          <IoMailOpenOutline size={14} /> {email}
        </span>
      </div>

      <button className="w-full bg-[#155dfc] hover:bg-blue-700 text-white rounded-xl h-10 text-sm font-medium transition-colors mt-auto">
        Book Appointment
      </button>
    </div>
  );
}

export default Groomcard;
