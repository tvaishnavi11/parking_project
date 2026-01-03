import { motion } from "framer-motion";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend-only demo logic
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbfb] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl w-full max-w-md p-8"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter your registered email address and we’ll send you a password
          reset link.
        </p>

        {/* Success Message */}
        {submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-md text-center">
            ✅ Password reset link has been sent to <b>{email}</b>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition"
            >
              Send Reset Link
            </button>
          </form>
        )}

        {/* Back to Login */}
        <div className="text-center mt-6">
          <a href="/login" className="text-green-600 hover:underline text-sm">
            ← Back to Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
