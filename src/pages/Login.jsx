import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-r from-indigo-900 to-blue-700 text-white">
      {/* LEFT LOGIN CARD */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-gray-300 mb-6 text-center">Login to SmartPark</p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-blue-400"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold shadow-lg"
          >
            Login
          </motion.button>

          <div className="flex justify-between mt-4 text-sm text-gray-300">
            <Link to="/forgot" className="hover:text-white underline">
              Forgot Password?
            </Link>
          </div>

          <p className="mt-6 text-center text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-300 underline hover:text-yellow-400"
            >
              Create Account
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
          {/* IMPORTANT: video must be in public folder */}
          <source src="/animationcar.mp4" type="video/mp4" />
          <source src="/animationcar.webm" type="video/webm" />
        </video>

        <div className="relative z-10 text-center px-10">
          <h1 className="text-4xl font-extrabold mb-4">
            Smart<span className="text-blue-400">Park</span>
          </h1>
          <p className="text-gray-200 text-lg">
            Intelligent Parking <br /> Real-Time Slot Booking <br /> Pune City
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
