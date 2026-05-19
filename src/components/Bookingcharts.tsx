import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", bookings: 4 },
  { month: "Feb", bookings: 7 },
  { month: "Mar", bookings: 5 },
  { month: "Apr", bookings: 9 },
  { month: "May", bookings: 6 },
];

function BookingsChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-110 mt-10">
      <h2 className="font-bold text-[16px] mb-4">Monthly Bookings</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#155dfc" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#155dfc" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#155dfc"
            strokeWidth={2}
            fill="url(#colorBookings)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BookingsChart;