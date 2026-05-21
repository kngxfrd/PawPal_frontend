import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FiDownload } from "react-icons/fi";
import type { Booking } from "../services/BookingSevice";

interface BookingsChartProps {
  bookings: Booking[];
}

const getMonthName = (dateStr?: string) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0].length === 4 ? parseInt(parts[0]) : parseInt(parts[2]);
      const month = parseInt(parts[1]) - 1;
      const day = parts[0].length === 4 ? parseInt(parts[2]) : parseInt(parts[0]);
      const parsed = new Date(year, month, day);
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleString("default", { month: "short" });
      }
    }
    return null;
  }
  return d.toLocaleString("default", { month: "short" });
};

const getLastSixMonths = () => {
  const months = [];
  const d = new Date();
  for (let i = 5; i >= 0; i--) {
    const temp = new Date(d.getFullYear(), d.getMonth() - i, 1);
    months.push(temp.toLocaleString("default", { month: "short" }));
  }
  return months;
};

function BookingsChart({ bookings = [] }: BookingsChartProps) {
  const lastSix = getLastSixMonths();
  const chartData = lastSix.map((m) => ({ month: m, bookings: 0 }));

  bookings.forEach((b) => {
    const mName = getMonthName(b.slot_date);
    if (mName) {
      const found = chartData.find((a) => a.month === mName);
      if (found) {
        found.bookings += 1;
      }
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 w-full flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-bold text-[15px] text-slate-800">Monthly Bookings</h2>
          <p className="text-xs text-slate-400 font-medium">Overview of booking counts by month</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-50 border border-slate-100 p-0.5 rounded-lg">
            <button type="button" className="px-3 py-1 text-xs font-semibold text-[#155dfc] bg-white rounded-md shadow-3xs">
              Monthly
            </button>
            <button type="button" className="px-3 py-1 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
              Weekly
            </button>
          </div>
          <button 
            type="button" 
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-100 rounded-lg shadow-3xs transition-all"
          >
            <FiDownload size={13} className="text-slate-400" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="w-full mt-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#155dfc" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#155dfc" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }} 
              axisLine={false}
              tickLine={false}
              dx={-5}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff", 
                border: "1px solid #e2e8f0", 
                borderRadius: "12px", 
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)" 
              }}
              labelStyle={{ fontWeight: 600, color: "#0f172a" }}
              itemStyle={{ color: "#155dfc" }}
            />

            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#155dfc"
              strokeWidth={2.5}
              fill="url(#colorBookings)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BookingsChart;