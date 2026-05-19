import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiTrash } from "react-icons/tfi";
import { IoCardOutline } from "react-icons/io5";

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
  return (
    <div className="flex flex-col px-10 py-6">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-[24px] font-bold">Bookings</h1>
          <p className="text-[12px] text-gray-400">View all your bookings</p>
        </div>
      </div>
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-300">
          <p className="mt-3 text-sm">No pets added yet</p>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                  ID
                </th>
                <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                  Groomer
                </th>
                <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                  Pet
                </th>
                <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                  Date
                </th>
                <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                  Time
                </th>
                <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                      #{booking.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-sm text-gray-800">
                      {booking.groomer}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      {booking.pet}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {booking.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {booking.time}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center pl-4 gap-3">
                      <button
                        onClick={() => setOpen(!open)}
                        className="text-gray-400 hover:text-[#155dfc] transition-colors"
                      >
                        <BsThreeDotsVertical />
                      </button>
                      {open && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-50 w-36 overflow-hidden">
                          <button
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <IoCardOutline size={14}/> Pay
                          </button>
                          <button
                            onClick={() => {
                              setOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <TfiTrash size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Bookings;
