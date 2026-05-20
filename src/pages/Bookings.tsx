import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import DataTable from "../components/DataTable";
import { MdOutlineCancel } from "react-icons/md";

interface Booking {
  id: string;
  groomer: string;
  pet: string;
  date: string;
  time: string;
  status: string;
}
function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    setBookings(storedBookings);
  }, []);

  const columns = [
  {
    header: "ID",
    accessor: "id",
    render: (value: string) => (
      <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
        #{value}
      </span>
    ),
  },

  {
    header: "GROOMER",
    accessor: "groomer",
    render: (value: string) => (
      <span className="font-semibold text-sm text-gray-800">
        {value}
      </span>
    ),
  },

  {
    header: "PET",
    accessor: "pet",
    render: (value: string) => (
      <span className="text-sm text-gray-600">
        {value}
      </span>
    ),
  },

  {
    header: "DATE",
    accessor: "date",
  },

  {
    header: "TIME",
    accessor: "time",
  },

  {
    header: "ACTIONS",
    accessor: "actions",

    render: (_: any, booking: Booking) => (
      <div className="flex items-center pl-4 gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-[#155dfc] transition-colors"
        >
          <BsThreeDotsVertical />
        </button>

        {open && (
          <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-md z-50 w-46 overflow-hidden mt-60 mr-5">
            <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors">
              <IoCardOutline size={14} />
              Pay
            </button>

            <button
              onClick={() => {
                handleDelete(booking.id)
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <MdOutlineCancel size={14} />
              Cancel booking
            </button>
          </div>
        )}
      </div>
    ),
    
  },
];
const handleDelete = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };
  return (
    <div className="min-h-full w-full bg-[#f8fafc]">
      <div className="flex flex-col px-4 md:px-8 py-8 gap-6 max-w-7xl mx-auto w-full font-sans">
        
        {/* Page Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              Bookings
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium">
              View and manage all your scheduled bookings
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-[#155dfc] hover:bg-blue-600 active:scale-98 transition-all duration-200 cursor-pointer flex items-center gap-2 text-white px-4.5 rounded-xl h-9.5 text-xs font-bold shadow-3xs hover:shadow-2xs"
          >
            Post Slot
          </button>
        </div>

        {/* Data Table Wrapper */}
        <div className="bg-white border border-slate-100 shadow-2xs rounded-2xl p-2 sm:p-4">
          <DataTable columns={columns} data={bookings} emptyMessage="No bookings added yet" />
        </div>
      </div>
    </div>
  );
}

export default Bookings;
