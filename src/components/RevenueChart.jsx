import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TOTAL_SLOTS_PER_DAY = 50;
const PRICE_PER_HOUR = 40;

const RevenueSlotChart = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h3 className="font-bold text-lg">📊 Parking Analytics</h3>
        <p className="text-gray-500 mt-2">No data available</p>
      </div>
    );
  }

  // ✅ Aggregate per day
  const dailyStats = bookings.reduce((acc, b) => {
    if (!b.time) return acc;

    // ✅ FIX: ISO DATE FORMAT
    const date = new Date(b.time).toLocaleDateString("en-IN");

    if (!acc[date]) {
      acc[date] = {
        date,
        revenue: 0,
        booked: 0,
        available: TOTAL_SLOTS_PER_DAY,
      };
    }

    // ✅ FIX: CALCULATE AMOUNT FROM HOURS
    const amount = (b.hours || 1) * PRICE_PER_HOUR;

    acc[date].revenue += amount;
    acc[date].booked += 1;
    acc[date].available = TOTAL_SLOTS_PER_DAY - acc[date].booked;

    return acc;
  }, {});

  const chartData = Object.values(dailyStats);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg mt-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold">📈 Parking Revenue & Slot Usage</h3>
        <p className="text-gray-500 text-sm">
          Daily booking performance overview
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} barGap={6}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="revenue"
            name="Revenue (₹)"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="booked"
            name="Booked Slots"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="available"
            name="Available Slots"
            fill="#e5e7eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="bg-green-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-xl font-black text-green-700">
            ₹{chartData.reduce((a, b) => a + b.revenue, 0)}
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-xl font-black text-blue-700">
            {chartData.reduce((a, b) => a + b.booked, 0)}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Max Slots / Day</p>
          <p className="text-xl font-black text-gray-700">
            {TOTAL_SLOTS_PER_DAY}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueSlotChart;
