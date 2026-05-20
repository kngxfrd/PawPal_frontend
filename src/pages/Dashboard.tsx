import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuDollarSign, LuCalendarDays } from "react-icons/lu";
import BookingsChart from "../components/Bookingcharts";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";

interface Booking {
  id: string;
  groomer: string;
  pet: string;
  date: string;
  time: string;
  status: string;
}

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  const dynamicBookingsCount = bookings.length;
  const dynamicGroomersCount = new Set(bookings.filter(b => b.groomer).map(b => b.groomer)).size;
  const dynamicAmount = bookings.length * 50;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getPetColor = (petName: string) => {
    const colors = [
      "bg-red-50 text-red-600 border-red-100/80",
      "bg-blue-50 text-blue-600 border-blue-100/80",
      "bg-emerald-50 text-emerald-600 border-emerald-100/80",
      "bg-amber-50 text-amber-600 border-amber-100/80",
      "bg-purple-50 text-purple-600 border-purple-100/80",
      "bg-rose-50 text-rose-600 border-rose-100/80",
    ];
    let sum = 0;
    for (let i = 0; i < (petName || "").length; i++) {
      sum += petName.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const getStatusBadge = (status: string) => {
    const lower = (status || "").toLowerCase();
    if (lower === "completed" || lower === "confirmed") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100/60";
    }
    if (lower === "pending" || lower === "awaiting") {
      return "bg-amber-50 text-amber-700 border-amber-100/60 animate-pulse";
    }
    return "bg-blue-50/80 text-blue-700 border-blue-100/60";
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen w-full bg-[#f8fafc]">
      <div className="flex flex-col px-4 md:px-8 py-8 gap-8 max-w-7xl mx-auto w-full font-sans">

        <div className="bg-[#155dfc] text-white rounded-2xl p-6 md:p-8 border border-blue-600/10 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 C30,40 70,60 100,0 L100,100 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {getGreeting()}, {user?.fullName || user?.first_name || user?.email?.split('@')[0] || "User"}!
              </h1>
              <p className="text-xs md:text-sm text-blue-100 font-medium opacity-90">
                You have {dynamicBookingsCount} {dynamicBookingsCount === 1 ? "booking" : "bookings"} and {dynamicGroomersCount} {dynamicGroomersCount === 1 ? "groomer" : "groomers"} active in your workspace.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-3.5 py-2 self-start md:self-auto shadow-sm backdrop-blur-xs">
              <LuCalendarDays size={14} className="text-blue-100" />
              <span className="text-[11px] font-semibold text-white tracking-wide">{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="group bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-200/80 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Bookings</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{dynamicBookingsCount}</h3>
              </div>
              <div className="flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100/40 w-12 h-12 rounded-xl shadow-3xs group-hover:scale-105 transition-transform duration-200">
                <IoMdCheckmarkCircleOutline size={22} />
              </div>
            </div>
          </div>

          <div className="group bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-200/80 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">₵{dynamicAmount}</h3>
              </div>
              <div className="flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100/40 w-12 h-12 rounded-xl shadow-3xs group-hover:scale-105 transition-transform duration-200">
                <LuDollarSign size={22} />
              </div>
            </div>
          </div>

          <div className="group bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-200/80 transition-all duration-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Groomers</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{dynamicGroomersCount}</h3>
              </div>
              <div className="flex items-center justify-center bg-purple-50 text-purple-600 border border-purple-100/40 w-12 h-12 rounded-xl shadow-3xs group-hover:scale-105 transition-transform duration-200">
                <FiUsers size={20} />
              </div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white border border-slate-100 shadow-2xs rounded-2xl">
            <BookingsChart />
          </div>

          <div className="bg-white border border-slate-100 shadow-2xs rounded-2xl p-6 flex flex-col gap-5">
            <div>
              <h2 className="font-bold text-[15px] text-slate-800">Upcoming Bookings</h2>
              <p className="text-xs text-slate-400 font-medium">Scheduled grooming sessions</p>
            </div>

            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                  <LuCalendarDays size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600">No upcoming bookings</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Your sessions will appear here</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-slate-100 max-h-[360px] overflow-y-auto pr-1">
                {bookings.map((booking) => {
                  const petColorClass = getPetColor(booking.pet);
                  const statusBadgeClass = getStatusBadge(booking.status);

                  return (
                    <div 
                      key={booking.id}
                      className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 hover:bg-slate-50/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold border text-sm shadow-3xs ${petColorClass}`}>
                          {(booking.pet || "P").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-slate-800 leading-tight">
                            {booking.groomer}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                            <span className="text-slate-500">{booking.pet}</span>
                            <span>•</span>
                            <span>{booking.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${statusBadgeClass}`}>
                          {booking.status}
                        </span>
                        <button 
                          type="button" 
                          className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                        >
                          <BsThreeDotsVertical size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
