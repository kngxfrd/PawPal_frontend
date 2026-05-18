import { FiUsers } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuDollarSign } from "react-icons/lu";
import BookingsChart from "../components/Bookingcharts";

interface GroomHeaderProps {
  totalbookings: number;
  totalamount: number;
  totalcustomers: number;
}
function Dashboard({
  totalbookings,
  totalamount,
  totalcustomers,
}: GroomHeaderProps) {
  return (
    <div className=" h-screen flex flex-col px-15">
      <div className="flex flex-col items-left justify-center mt-6 ">
        <h1 className=" text-left text-[24px] font-bold">My Dashboard</h1>
        <h1 className="text-[12px] text-gray-500">
          Manage your pets and bookings
        </h1>
      </div>
      <div className="flex justify-between">
        <div className="p-5 w-60 h-30 mt-6 rounded-lg shadow-md">
          <h1 className="flex items-center gap-3">
            <IoMdCheckmarkCircleOutline size={23} /> Total Bookings
          </h1>
          <h1 className="pt-3 text-[35px] font-bold">{totalbookings} </h1>
        </div>
        <div className="p-5 w-60 h-30 mt-6 rounded-lg shadow-md">
          <h1 className="flex items-center gap-3">
            <LuDollarSign size={23} /> Total Amount
          </h1>
          <h1 className="pt-3 text-[35px] font-bold">{totalamount} </h1>
        </div>
        <div className="p-5 w-60 h-30 mt-6 rounded-lg shadow-md">
          <h1 className="flex items-center gap-3">
            <FiUsers size={23} /> Total Customers
          </h1>
          <h1 className="pt-3 text-[35px] font-bold">{totalcustomers} </h1>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <BookingsChart />
        </div>
        <div className="rounded-xl shadow-sm p-6 w-110 mt-10">
          <h1 className="font-bold text-[16px] mb-4">Monthly Bookings</h1>
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
