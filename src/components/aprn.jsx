import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Solutions = () => {
  const features = [
    {
      title: "ANPR Access Control",
      description:
        "Automated license plate recognition for friction-less entry and exit without manual tickets.",
      icon: "📷",
      path: "/admin", // route for this feature
    },
    {
      title: "Real-time Occupancy",
      description:
        "Live tracking of every parking slot across Pune city using smart IoT sensors.",
      icon: "🚗",
      path: "/maplocation",
    },
    {
      title: "Digital Payments",
      description:
        "Seamless UPI and wallet integration for automatic billing based on stay duration.",
      icon: "💸",
      path: "/valet",
    },
  ];

  return (
    <section className="py-20 bg-[#0f172a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">
            Our Technology
          </h2>
          <h1 className="text-5xl font-black tracking-tighter">
            Smart Parking Solutions
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 bg-slate-900/50 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                {feature.description}
              </p>
              <Link to={feature.path}>
                <button className="text-emerald-500 font-bold flex items-center gap-2 group">
                  Explore Solution
                  <span className="group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
