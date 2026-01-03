import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RevenueSlotChart from "../components/RevenueChart";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editHours, setEditHours] = useState(1);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    const res = await fetch("http://localhost:3000/bookings");
    const data = await res.json();
    setBookings(data);
  };

  /* ===== INITIAL LOAD ===== */
  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= AUTO EXPIRE (FIXED) ================= */
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("http://localhost:3000/bookings");
      const data = await res.json();

      for (let b of data) {
        const bookingTime = new Date(b.time).getTime();
        const expiryTime = bookingTime + b.hours * 60 * 60 * 1000;

        if (Date.now() > expiryTime && b.status === "ACTIVE") {
          await fetch(`http://localhost:3000/bookings/${b.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "EXPIRED" }),
          });
        }
      }

      fetchBookings();
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []); // 🔥 RUN ONCE ONLY

  /* ================= DELETE ================= */
  const deleteBooking = async (id) => {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "DELETE",
    });
    fetchBookings();
  };

  /* ================= MANUAL EXPIRE ================= */
  const expireBooking = async (id) => {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "EXPIRED" }),
    });
    fetchBookings();
  };

  /* ================= EDIT HOURS ================= */
  const updateHours = async (id) => {
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hours: editHours }),
    });
    setEditingId(null);
    fetchBookings();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚗 Admin Parking Dashboard
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead>
            <motion.tr
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-200 text-sm"
            >
              <th className="p-3">Name</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Location</th>
              <th className="p-3">Hours</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </motion.tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center border-t hover:bg-gray-50"
              >
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.vehicle}</td>
                <td className="p-2">{b.location}</td>

                <td className="p-2">
                  {editingId === b.id ? (
                    <input
                      type="number"
                      min="1"
                      value={editHours}
                      onChange={(e) => setEditHours(e.target.value)}
                      className="w-16 border rounded p-1"
                    />
                  ) : (
                    b.hours
                  )}
                </td>

                <td className="p-2">{b.paymentMethod}</td>

                <td
                  className={`p-2 font-bold ${
                    b.status === "ACTIVE" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {b.status}
                </td>

                <td className="p-2 flex gap-2 justify-center">
                  {editingId === b.id ? (
                    <button
                      onClick={() => updateHours(b.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(b.id);
                        setEditHours(b.hours);
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => expireBooking(b.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Expire
                  </button>

                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RevenueSlotChart bookings={bookings} />
    </div>
  );
};

export default AdminDashboard;
