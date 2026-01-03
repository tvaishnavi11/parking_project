import React, { useState } from "react";
import PaymentReceipt from "./PaymentReceipt";

const PRICE_PER_HOUR = 40;
const UPI_ID = "7709031876@ptsbi";
const PAYEE_NAME = "SmartPark Pune";

const ParkingPuneWizard = ({ selectedSite, onClose, onBooked }) => {
  const [form, setForm] = useState({
    name: "",
    vehicle: "",
    phone: "",
    hours: 1,
    payment: "UPI",
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const totalAmount = form.hours * PRICE_PER_HOUR;
  const upiURL = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${totalAmount}&cu=INR`;

  /* ================= VALIDATION HELPERS ================= */

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    if (value.length <= 10) {
      setForm({ ...form, phone: value });
    }
  };

  const handleVehicleChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 12) {
      setForm({ ...form, vehicle: value });
    }
  };

  const handleConfirmBooking = async () => {
    if (!form.name || !form.vehicle || !form.phone || !form.hours) {
      alert("Please fill all details");
      return;
    }

    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (form.payment === "UPI") {
      const paid = window.confirm("Have you completed the UPI payment?");
      if (!paid) return;
    }

    // ✅ MATCH ADMIN DASHBOARD FORMAT
    const data = {
      name: form.name,
      vehicle: form.vehicle,
      phone: form.phone,
      hours: form.hours,
      paymentMethod: form.payment,
      location: selectedSite.name,
      status: "ACTIVE",
      time: new Date().toISOString(),
      amount: totalAmount,
    };

    // ✅ SAVE TO JSON SERVER
    await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setBookingData(data);
    setShowReceipt(true);
    onBooked?.();
  };

  if (showReceipt) {
    return <PaymentReceipt bookingData={bookingData} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Car Parking Booking</h2>
        <p className="text-sm text-gray-500 mb-4">{selectedSite.name}, Pune</p>

        {/* NAME */}
        <input
          className="w-full mb-3 p-3 border rounded-xl"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* VEHICLE NUMBER */}
        <input
          className="w-full mb-3 p-3 border rounded-xl uppercase"
          placeholder="Vehicle Number (MH12AB1234)"
          value={form.vehicle}
          onChange={handleVehicleChange}
        />

        {/* PHONE NUMBER */}
        <input
          className="w-full mb-3 p-3 border rounded-xl"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handlePhoneChange}
          maxLength={10}
        />

        {/* HOURS */}
        <input
          type="number"
          min="1"
          value={form.hours}
          className="w-full mb-3 p-3 border rounded-xl"
          onChange={(e) =>
            setForm({
              ...form,
              hours: Math.max(1, Number(e.target.value)),
            })
          }
        />

        {/* PAYMENT */}
        <select
          value={form.payment}
          className="w-full mb-3 p-3 border rounded-xl"
          onChange={(e) => setForm({ ...form, payment: e.target.value })}
        >
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
        </select>

        {/* UPI QR */}
        {form.payment === "UPI" && (
          <div className="text-center mb-4">
            <p className="font-bold mb-2">Scan & Pay</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                upiURL
              )}`}
              alt="UPI QR"
              className="mx-auto"
            />
            <p className="text-sm mt-1">
              UPI ID: <b>{UPI_ID}</b>
            </p>
          </div>
        )}

        <p className="font-bold mb-3">Total ₹{totalAmount}</p>

        <button
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
          onClick={handleConfirmBooking}
        >
          Pay & Book
        </button>
      </div>
    </div>
  );
};

export default ParkingPuneWizard;
