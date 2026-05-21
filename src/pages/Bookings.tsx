import { initiateMomoPayment } from "../services/PaymentService";
import type { PaymentResponse } from "../services/PaymentService";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import DataTable from "../components/DataTable";
import {
  getMyBookings,
  getGroomerBookings,
  cancelBooking,
} from "../services/BookingSevice";
import type { Booking } from "../services/BookingSevice";
import PaymentResultModal from "../components/Paymentresultmodal";

function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tip, setTip] = useState<number | null>(null);

  // Payment state
  const [payingId, setPayingId] = useState<number | null>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(
    null,
  );
  const [retryBooking, setRetryBooking] = useState<Booking | null>(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const isGroomer = currentUser.role === "groomer";

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = isGroomer
          ? await getGroomerBookings()
          : await getMyBookings();
        setBookings(data ?? []);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [isGroomer]);

  const handleCancel = async (id: number) => {
    try {
      await cancelBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setTip(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async (booking: Booking) => {
    setTip(null);
    setPayingId(booking.id);
    setRetryBooking(booking);
    try {
      const result = await initiateMomoPayment(booking.id);
      // On success the backend confirms the booking — update it in state
      if (result.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === booking.id ? { ...b, status: "confirmed" } : b,
          ),
        );
      }
      setPaymentResult(result);
    } catch (err: any) {
      // Backend failure: surface message + transaction if present
      setPaymentResult({
        success: false,
        message: err.message || "Payment failed. Please try again.",
        transaction: err.transaction,
      });
    } finally {
      setPayingId(null);
    }
  };

  const handleCloseModal = () => {
    setPaymentResult(null);
  };

  const handleRetry = () => {
    if (retryBooking) handlePayment(retryBooking);
  };

  const statusBadge = (value: string) => (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${
        value === "confirmed"
          ? "bg-gray-100 text-gray-400 border-gray-200"
          : value === "cancelled"
            ? "bg-rose-50 text-rose-700 border-rose-100"
            : "bg-amber-50 text-amber-700 border-amber-100"
      }`}
    >
      {value === "confirmed" ? "paid" : (value ?? "pending")}
    </span>
  );

  const PayButton = ({ booking }: { booking: Booking }) => {
    const isPaying = payingId === booking.id;
    // Only show on pending bookings
    if (booking.status !== "pending") return null;
    return (
      <button
        onClick={() => handlePayment(booking)}
        disabled={isPaying}
        className="px-3 h-7 text-[11px] font-bold text-white bg-[#155dfc] hover:bg-blue-600 active:scale-95 rounded-lg shadow-3xs transition-all duration-150 flex items-center justify-center tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 min-w-[52px]"
      >
        {isPaying ? (
          <span className="flex items-center gap-1.5">
            <svg
              className="animate-spin h-3 w-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Processing</span>
          </span>
        ) : (
          "Pay"
        )}
      </button>
    );
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
      accessor: "groomer",
      render: (_: any, booking: any) => (
        <span className="font-semibold text-sm text-gray-800">
          {booking.groomer?.shop_name ||
            booking.groomer?.groomer_name ||
            booking.groomer?.name ||
            "—"}
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
      accessor: "slot",
      render: (_: any, booking: any) => (
        <span className="text-sm text-gray-600">
          {booking.slot?.date || "—"}
        </span>
      ),
    },
    {
      header: "TIME",
      accessor: "slot",
      render: (_: any, booking: any) => (
        <span className="text-sm text-gray-600">
          {booking.slot?.start_time || "—"}
        </span>
      ),
    },
    {
      header: "STATUS",
      accessor: "status",
      render: statusBadge,
    },
    {
      header: "ACTIONS",
      accessor: "actions",
      render: (_: any, booking: Booking) => (
        <div className="flex items-center gap-3 pl-2">
          <PayButton booking={booking} />
          <div className="relative flex items-center">
            <button
              onClick={() => setTip(tip === booking.id ? null : booking.id)}
              className="text-gray-400 hover:text-[#155dfc] transition-colors cursor-pointer"
            >
              <BsThreeDotsVertical />
            </button>
            {tip === booking.id && (
              <div className="absolute left-6 top-0 bg-white border border-gray-100 rounded-xl shadow-md z-50 w-44 overflow-hidden">
                {booking.status === "pending" && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#155dfc] transition-colors cursor-pointer"
                  >
                    Pay
                  </button>
                )}
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <MdOutlineCancel size={14} />
                  Cancel booking
                </button>
              </div>
            )}
          </div>
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
      header: "GROOMER",
      accessor: "groomer",
      render: (_: any, booking: any) => (
        <span className="font-semibold text-sm text-gray-800">
          {booking.groomer?.shop_name ||
            booking.groomer?.groomer_name ||
            booking.groomer?.name ||
            "—"}
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
      accessor: "slot",
      render: (_: any, booking: any) => (
        <span className="text-sm text-gray-600">
          {booking.slot?.date || "—"}
        </span>
      ),
    },
    {
      header: "TIME",
      accessor: "slot",
      render: (_: any, booking: any) => (
        <span className="text-sm text-gray-600">
          {booking.slot?.start_time || "—"}
        </span>
      ),
    },
    {
      header: "NOTES",
      accessor: "notes",
      render: (value: string) => (
        <span className="text-sm text-slate-400 italic">{value || "—"}</span>
      ),
    },
    {
      header: "STATUS",
      accessor: "status",
      render: statusBadge,
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
                ? "Appointments booked by pet owners on your slots"
                : "Your scheduled grooming appointments"}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 shadow-2xs rounded-2xl p-2 sm:p-4">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-10">
              Loading bookings...
            </p>
          ) : error ? (
            <p className="text-sm text-rose-400 text-center py-10">{error}</p>
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

      <PaymentResultModal
        result={paymentResult}
        onClose={handleCloseModal}
        onRetry={handleRetry}
      />
    </div>
  );
}

export default Bookings;
