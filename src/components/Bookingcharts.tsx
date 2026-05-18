import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart,  } from "recharts";

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
      <h1 className="font-bold text-[16px] mb-4">Monthly Bookings</h1>

      <ResponsiveContainer width="100%" height={200}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
    <XAxis />
    <YAxis />
    <Tooltip />
  </LineChart>
</ResponsiveContainer>
    </div>
  );
}

export default BookingsChart;