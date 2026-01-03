import React from "react";
import jsPDF from "jspdf";

const PaymentReceipt = ({ bookingData, onClose }) => {
  if (!bookingData) return null;

  const getMessage = () => {
    switch (bookingData.paymentMethod) {
      case "UPI":
        return "✅ Payment via UPI. Use QR or ID to pay.";
      case "Card":
        return "✅ Payment via Card.";
      case "Cash":
        return "💵 Pay Cash at the entrance.";
      default:
        return "";
    }
  };

  const sendWhatsApp = () => {
    const msg = `Parking Receipt\nName:${bookingData.name}\nVehicle:${bookingData.vehicle}\nLocation:${bookingData.location}\nAmount:₹${bookingData.amount}\nPayment:${bookingData.paymentMethod}`;
    window.open(
      `https://wa.me/91${bookingData.phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const sendSMS = () => {
    const msg = `Parking Receipt: ${bookingData.location} ₹${bookingData.amount}`;
    window.location.href = `sms:${bookingData.phone}?body=${encodeURIComponent(
      msg
    )}`;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Parking Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${bookingData.name}`, 20, 40);
    doc.text(`Vehicle: ${bookingData.vehicle}`, 20, 50);
    doc.text(`Location: ${bookingData.location}`, 20, 60);
    doc.text(`Hours: ${bookingData.hours}`, 20, 70);
    doc.text(`Amount: ₹${bookingData.amount}`, 20, 80);
    doc.text(`Payment: ${bookingData.paymentMethod}`, 20, 90);
    doc.text(`Contact: ${bookingData.phone}`, 20, 100);
    doc.text(`Time: ${bookingData.time}`, 20, 110);
    doc.save("Parking_Receipt.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[3000]">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Payment Receipt</h2>
        <p className="mb-2">Name: {bookingData.name}</p>
        <p className="mb-2">Vehicle: {bookingData.vehicle}</p>
        <p className="mb-2">Location: {bookingData.location}</p>
        <p className="mb-2">Hours: {bookingData.hours}</p>
        <p className="mb-2">Amount: ₹{bookingData.amount}</p>
        <p className="mb-2 font-bold">{getMessage()}</p>

        <div className="space-y-2">
          <button
            onClick={sendWhatsApp}
            className="w-full bg-green-600 text-white py-2 rounded-xl"
          >
            📲 WhatsApp
          </button>
          <button
            onClick={sendSMS}
            className="w-full bg-blue-600 text-white py-2 rounded-xl"
          >
            📩 SMS
          </button>
          <button
            onClick={downloadPDF}
            className="w-full bg-black text-white py-2 rounded-xl"
          >
            🧾 PDF
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-400 py-2 rounded-xl"
          >
            Done✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
