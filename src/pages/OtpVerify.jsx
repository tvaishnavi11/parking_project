import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("demoOtp", generatedOtp);
    alert(`Your OTP is: ${generatedOtp}`); // simulate SMS
  };

  const verifyOtp = () => {
    const savedOtp = localStorage.getItem("demoOtp");

    if (otp === savedOtp) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-bg">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card glass"
      >
        <h2 className="text-xl font-bold mb-4">OTP Verification</h2>

        <button onClick={sendOtp}>Send OTP</button>

        <input
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={verifyOtp}>Verify OTP</button>
      </motion.div>
    </div>
  );
}
