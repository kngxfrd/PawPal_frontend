import { initiateMomoPayment } from "../services/PaymentService";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import DataTable from "../components/DataTable";
import { getMyBookings, cancelBooking } from "../services/BookingSevice";
import type { Booking } from "../services/BookingSevice";

function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [tip, setTip] = useState<number | null>(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const isGroomer = currentUser.role === "groomer";

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await getMyBookings();
        setBookings(data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id: number) => {
    try {
      await cancelBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setTip(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async (
  booking: Booking
) => {
  try {
    await initiateMomoPayment(
      booking.id
    );

    alert("Payment initiated successfully");
  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  const ownerColumns = [
    {
      header: "ID",
      accessor: "id",
      render: (value: number) => (
        <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
          #{value}
        </span>
      ),
    },
    {
      header: "GROOMER",
      accessor: "groomer_name",
      render: (value: string) => (
        <span className="font-semibold text-sm text-gray-800">
          {value ?? "—"}
        </span>
      ),
    },
    {
      header: "PET",
      accessor: "pet_name",
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value ?? "—"}</span>
      ),
    },
    {
      header: "DATE",
      accessor: "slot_date",
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value ?? "—"}</span>
      ),
    },
    {
      header: "TIME",
      accessor: "slot_start_time",
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value ?? "—"}</span>
      ),
    },
    {
      header: "STATUS",
      accessor: "status",
      render: (value: string) => (
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${
            value === "confirmed"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : value === "cancelled"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : "bg-amber-50 text-amber-700 border-amber-100"
          }`}
        >
          {value ?? "pending"}
        </span>
      ),
    },
    {
      header: "ACTIONS",
      accessor: "actions",
      render: (_: any, booking: Booking) => (
        <div className="relative flex items-center pl-4">
          <button
            onClick={() => setTip(tip === booking.id ? null : booking.id)}
            className="text-gray-400 hover:text-[#155dfc] transition-colors"
          >
            <BsThreeDotsVertical />
          </button>
          {tip === booking.id && (
            <div className="absolute left-8 top-0 bg-white border border-gray-100 rounded-xl shadow-md z-50 w-44 overflow-hidden">
              <button
                onClick={() => handlePayment(booking)}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#155dfc] transition-colors"
              >
                Pay
              </button>

              <button
                onClick={() => handleCancel(booking.id)}
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

  const groomerColumns = [
    {
      header: "ID",
      accessor: "id",
      render: (value: number) => (
        <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
          #{value}
        </span>
      ),
    },
    {
      header: "OWNER",
      accessor: "owner_name",
      render: (value: string) => (
        <span className="font-semibold text-sm text-gray-800">
          {value ?? "—"}
        </span>
      ),
    },
    {
      header: "PET",
      accessor: "pet_name",
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value ?? "—"}</span>
      ),
    },
    {
      header: "DATE",
      accessor: "slot_date",
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value ?? "—"}</span>
      ),
    },
    {
      header: "TIME",
      accessor: "slot_start_time",
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value ?? "—"}</span>
      ),
    },
    {
      header: "NOTES",
      accessor: "notes",
      render: (value: string) => (
        <span className="text-sm text-gray-400">{value || "—"}</span>
      ),
    },
    {
      header: "STATUS",
      accessor: "status",
      render: (value: string) => (
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${
            value === "confirmed"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : value === "cancelled"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : "bg-amber-50 text-amber-700 border-amber-100"
          }`}
        >
          {value ?? "pending"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-full w-full bg-[#f8fafc]">
      <div className="flex flex-col px-4 md:px-8 py-8 gap-6 max-w-7xl mx-auto w-full font-sans">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              Bookings
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium">
              {isGroomer
                ? "Appointments booked by pet owners"
                : "Your scheduled grooming appointments"}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 shadow-2xs rounded-2xl p-2 sm:p-4">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-10">
              Loading bookings...
            </p>
          ) : (
            <DataTable
              columns={isGroomer ? groomerColumns : ownerColumns}
              data={bookings}
              emptyMessage={
                isGroomer
                  ? "No bookings from pet owners yet"
                  : "You have no bookings yet"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
