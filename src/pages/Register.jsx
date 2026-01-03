import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = () => {
    if (!form.name || !form.email || !form.password) {
      alert("❗ Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      alert("⚠️ User already exists. Please login.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registration successful");
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-r from-indigo-900 to-blue-700 text-white">
      {/* LEFT REGISTER CARD */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            Create Account 🚗
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Register to start parking smarter
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-blue-400"
          />

          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-blue-400"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={register}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold shadow-lg"
          >
            Register
          </motion.button>

          <p className="mt-6 text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-300 underline hover:text-yellow-400"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT VIDEO SECTION */}
      <div className="hidden md:flex items-center justify-center relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          {/* MUST be in public folder */}

          <source src="animationcar.webm" type="video/webm" />
        </video>

        <div className="relative z-10 text-center px-10">
          <h1 className="text-4xl font-extrabold mb-4">
            Smart<span className="text-blue-400">Park</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Intelligent Parking <br /> Book Slots <br /> Pune City
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
