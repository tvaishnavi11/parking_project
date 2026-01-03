import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ModernContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE – INFO POINTS */}
        <div className="hidden md:block space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Smart Parking Support
          </h2>

          <p className="text-gray-600 text-lg">
            We help citizens manage parking efficiently and solve issues faster.
          </p>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✔</span>
              Report parking slot issues instantly
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✔</span>
              Suggest new parking zones in Pune
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✔</span>
              Get quick assistance from support team
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✔</span>
              Improve city traffic & parking efficiency
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
          {submitted ? (
            /* SUCCESS VIEW */
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Message Sent Successfully
              </h1>
              <p className="text-gray-500 mt-3">
                Redirecting you back to home...
              </p>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Contact Us
                </h1>
                <p className="text-gray-500 mt-2">
                  Share your feedback or parking issues
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />

                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <select className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>General Inquiry</option>
                  <option>Parking Slot Issue</option>
                  <option>Payment Help</option>
                  <option>Business Partnership</option>
                </select>

                <textarea
                  required
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold tracking-wide hover:bg-indigo-700 transition"
                >
                  Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernContactForm;
