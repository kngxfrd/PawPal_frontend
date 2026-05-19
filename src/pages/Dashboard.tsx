import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuDollarSign } from "react-icons/lu";
import BookingsChart from "../components/Bookingcharts";
import { BsThreeDotsVertical } from "react-icons/bs";


interface GroomHeaderProps {
  totalbookings: number;
  totalamount: string;
  totalcustomers: number;
}

interface Booking {
  id: string;
  groomer: string;
  pet: string;
  date: string;
  time: string;
  status: string;
}

function Dashboard({
  totalbookings,
  totalamount,
  totalcustomers,
}: GroomHeaderProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    setBookings(storedBookings);
  }, []);
  return (
    <div className=" h-screen flex flex-col px-15 ">
      <div className="flex flex-col items-left justify-center mt-6 ">
        <h1 className=" text-left text-[24px] font-bold">My Dashboard</h1>
        <h1 className="text-[12px] text-gray-500">
          Manage your pets and bookings
        </h1>
      </div>
      <div className="flex justify-between">
        <div className="p-5 w-65 h-30 mt-6 rounded-lg shadow-md border-r-4 border-blue-500">
          <div className="flex gap-3">
            <div className=" flex items-center justify-center text-blue-500 bg-[#dbeafe] w-15 h-15 rounded-full">
              <IoMdCheckmarkCircleOutline size={28} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-sm text-gray-500">Total Bookings</h1>
              <h1 className=" text-[22px] font-medium text-gray-800">
                {totalbookings}{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className=" p-5 w-60 h-30 mt-6 rounded-lg shadow-md border-r-4 border-green-500">
          <div className="flex gap-3">
            <div className=" flex items-center justify-center text-green-500 bg-[#d1ffbd] w-15 h-15 rounded-full">
              <LuDollarSign size={23} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-sm text-gray-500">Total Amount</h1>
              <h1 className="text-[22px] font-medium text-gray-800">
                {totalamount}{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className="p-5 w-60 mt-6 rounded-lg shadow-md border-r-4 border-yellow-500">
          <div className="flex gap-3">
            <div className="flex items-center justify-center text-yellow-500 bg-[#ffffc5] w-15 h-15 rounded-full">
              <FiUsers size={23} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-sm text-gray-500">Total Customers</h1>
              <h1 className="text-[22px] font-medium text-gray-800 leading-tight">
                {totalcustomers}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <BookingsChart />
        </div>
        <div className="rounded-xl shadow-sm p-6 w-110 mt-10">
          <h1 className="font-bold text-[16px] mb-4">Upcoming Bookings</h1>

          {bookings.length === 0 ? (
            <p className="text-sm text-gray-400">No bookings yet</p>
          ) : (
            <div className="">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                      GROOMER
                    </th>
                    <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                      PET
                    </th>
                    <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                      DATE
                    </th>
                    <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-widest">
                      MORE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors"
                    >
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
                          <BsThreeDotsVertical />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// interface Booking {
//   id: number;
//   groomer: string;
//   address: string;
//   pet: string;
//   date: string;
//   time: string;
//   status: "confirmed" | "pending" | "completed";
// }
// const dummyBookings: Booking[] = [
//   {
//     id: 1,
//     groomer: "Timothy Groomshop",
//     address: "123 Carlton Street",
//     pet: "Rex",
//     date: "2025-05-20",
//     time: "10:00 AM",
//     status: "confirmed",
//   },
//   {
//     id: 2,
//     groomer: "Happy Paws Salon",
//     address: "45 Osu High Street",
//     pet: "Boadi",
//     date: "2025-05-22",
//     time: "2:00 PM",
//     status: "pending",
//   },
//   {
//     id: 3,
//     groomer: "Fluffy Friends Spa",
//     address: "78 Labone Crescent",
//     pet: "Max",
//     date: "2025-05-10",
//     time: "11:00 AM",
//     status: "completed",
//   },
// ];
