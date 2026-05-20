import { IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import { FiPhone, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import AppointModal from "./AppointModal";

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
  const [showModal, setShowModal] = useState(false);
  const pets = JSON.parse(localStorage.getItem("pets") || "[]");
  const petNames = pets.map((p: any) => p.Name);
  return (
    <div className="border border-slate-100 rounded-2xl shadow-2xs p-5 flex flex-col gap-4.5 hover:shadow-xs hover:border-slate-200/80 transition-all duration-200 bg-white">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-[17px] font-bold text-slate-800 tracking-tight leading-snug">{name}</h1>
          <p className="text-xs flex items-center gap-1 text-slate-400 mt-1 font-medium">
            <IoLocationOutline size={13} className="text-slate-400" /> {address}
          </p>
        </div>

        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border shrink-0 flex items-center gap-1 uppercase tracking-wide
  ${openSlots > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-100/60" : "bg-rose-50 text-rose-700 border-rose-100/60"}`}
        >
          <FiCalendar size={10} />
          {openSlots > 0 ? `${openSlots} open` : "Full"}
        </span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {services.map((service) => (
          <span
            key={service}
            className="px-2.5 h-6.5 rounded-lg bg-blue-50/60 text-[#155dfc] text-[11px] font-bold border border-blue-100/20 flex items-center tracking-wide"
          >
            {service}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-semibold border-t border-slate-50 pt-3">
        <span className="flex items-center gap-1.5">
          <FiPhone size={12} className="text-slate-400" /> {phone}
        </span>
        <span className="flex items-center gap-1.5">
          <IoMailOpenOutline size={13} className="text-slate-400" /> {email}
        </span>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-[#155dfc] hover:bg-blue-600 active:scale-98 text-white rounded-xl h-10 text-xs font-bold shadow-3xs hover:shadow-2xs transition-all duration-200 mt-auto"
      >
        Book Appointment
      </button>

      <AppointModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        groomerName={name}
        pets={petNames}
        availableSlots={[
          { date: "2025-05-20", time: "09:00 AM" },
          { date: "2025-05-20", time: "11:00 AM" },
        ]}
        onConfirm={(booking) => {
          console.log("Booking confirmed:", booking);
        }}
      />
    </div>
  );
}

export default Groomcard;
