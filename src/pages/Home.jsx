import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaArrowUp } from "react-icons/fa";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

/* ================= FAQ DATA ================= */
const faqData = [
  {
    q: "What types of parking solutions do you offer?",
    a: "We offer smart parking solutions including real-time slot monitoring, automated entry-exit systems, valet parking, and digital payment-enabled parking management.",
  },
  {
    q: "How can your parking management system improve operational efficiency?",
    a: "Our system reduces manual work through automation, improves space utilization, minimizes congestion, and provides real-time insights for better decision-making.",
  },
  {
    q: "Are your systems customizable to fit different facility sizes and types?",
    a: "Yes, SmartPark solutions are scalable and customizable for IT parks, malls, hospitals, residential complexes, and smart cities.",
  },
  {
    q: "What payment options are supported by your POS devices?",
    a: "We support UPI, debit/credit cards, digital wallets, QR payments, and integrated online transactions.",
  },
  {
    q: "How do your systems integrate with existing infrastructure?",
    a: "Our solutions integrate seamlessly with existing gates, cameras, sensors, and access control systems without major infrastructure changes.",
  },
  {
    q: "What kind of support and maintenance services do you provide?",
    a: "We provide 24/7 technical support, remote monitoring, software updates, and on-site maintenance as required.",
  },
  {
    q: "How do your systems enhance security within the site premises?",
    a: "SmartPark enhances security using controlled access, vehicle tracking, surveillance integration, and secure data handling.",
  },
];

const Home = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  /* ================= SCROLL TO TOP ================= */
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showLoginAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-xl p-6 w-80 text-center"
          >
            <h3 className="text-xl font-bold mb-2">Login Required</h3>
            <p className="text-gray-600 mb-6">Please login to book a demo.</p>

            <div className="flex justify-center gap-3">
              <a href="/login">
                <button
                  onClick={() => {
                    setShowLoginAlert(false);
                    setTimeout(() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Login
                </button>
              </a>

              <button
                onClick={() => setShowLoginAlert(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ================= FLOATING BUTTONS ================= */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowLoginAlert(true)}
          className="bg-lime-400 p-4 rounded-full shadow-lg cursor-pointer"
        >
          <FaCalendarAlt />
        </motion.div>

        {showTop && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gray-800 text-white p-4 rounded-full shadow-lg"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </div>

      {/* ================= HERO ================= */}
      <motion.section
        id="hero"
        className="min-h-screen bg-[#2f3f46] text-white flex items-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeLeft}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Smart Parking <br /> for Modern Workplaces
            </h1>
            <p className="mt-6 text-gray-200">
              Reduce parking conflicts by <b>93%</b>
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <a href="#about">
                <button className="bg-lime-400 px-6 py-3 rounded-md text-black font-semibold">
                  Explore Features
                </button>
              </a>

              <button
                onClick={() => setShowLoginAlert(true)}
                className="border px-6 py-3 rounded-md"
              >
                Book Demo
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} className="flex justify-center">
            <img
              src="/Parkgadi.jpg"
              alt="Parking"
              className="w-72 h-72 object-cover rounded-full shadow-lg"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ================= VIDEO ================= */}
      <motion.section
        className="py-24 bg-white"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.iframe
            variants={fadeLeft}
            className="w-full h-72 rounded-xl shadow"
            src="https://www.youtube.com/embed/WNwm9j9Cb7M"
            allowFullScreen
          />
          <motion.div variants={fadeRight}>
            <h2 className="text-4xl font-bold">Built for Hybrid Offices</h2>
            <p className="mt-4 text-gray-600">
              Our advanced hardware and software work together to deliver a
              seamless, efficient parking experience, whether you're managing
              ground parking by the street or multi-level private lots.Automate
              parking allocation with smart rules.
            </p>
          </motion.div>
        </div>
      </motion.section>
      {/********************************************************************************************* */}
      {/* ================= ABOUT ================= */}
      <motion.section
        id="about"
        className="py-28 bg-gray-50"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div variants={fadeLeft}>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              About SmartPark
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              <b>SmartPark</b> is an intelligent parking management solution
              designed for modern workplaces, IT parks, and smart cities. It
              eliminates parking conflicts by providing real-time availability,
              automated allocation, and secure access control.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Built with <b>React</b>, <b>IoT-ready architecture</b>, and smart
              automation rules, SmartPark improves employee experience while
              giving administrators full visibility and control.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Real-time parking monitoring</li>
              <li>✔ Employee self-service booking</li>
              <li>✔ Admin analytics & control panel</li>
              <li>✔ Scalable for enterprises & campuses</li>
            </ul>
          </motion.div>

          {/* RIGHT IMAGE / CARD */}
          <motion.div
            variants={fadeRight}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Why SmartPark?
            </h3>

            <p className="text-gray-600 mb-4">
              Traditional parking systems waste time and space. SmartPark uses
              automation and data-driven decisions to make parking smarter,
              faster, and fair.
            </p>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="text-xl font-bold text-blue-600">93%</h4>
                <p className="text-sm text-gray-600">Conflict Reduction</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="text-xl font-bold text-blue-600">100%</h4>
                <p className="text-sm text-gray-600">Digital Booking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= WHY SMARTPARK ================= */}
      <motion.section
        id="why-smartpark"
        className="py-28 bg-white"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">Why SmartPark?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              SmartPark provides a complete, secure, and intelligent parking
              solution designed for modern cities and workplaces.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-10"
          >
            {/* Real-Time Availability */}
            <motion.div
              variants={fadeUp}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                🚦 Real-Time Availability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                View live parking slot availability using smart sensors, helping
                users quickly find free spaces without delays.
              </p>
            </motion.div>

            {/* Location Wise Availability */}
            <motion.div
              variants={fadeUp}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                📍 Location-Wise Availability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Users can check parking availability based on location,
                building, or floor for faster and more accurate parking
                decisions.
              </p>
            </motion.div>

            {/* Payment Transaction */}
            <motion.div
              variants={fadeUp}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                💳 Payment Transactions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Supports secure digital payments with instant transaction
                confirmation, making parking cashless and hassle-free.
              </p>
            </motion.div>

            {/* Security */}
            <motion.div
              variants={fadeUp}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                🔐 Advanced Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ensures secure parking using authentication, access control,
                monitoring, and data protection mechanisms.
              </p>
            </motion.div>

            {/* Smart Automation */}
            <motion.div
              variants={fadeUp}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                🤖 Smart Automation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automates slot allocation, entry-exit flow, and usage rules to
                reduce manual effort and improve efficiency.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= LOGIN ALERT MODAL ================= */}
      {/* ================= FAQ SECTION ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently Asked Questions:
              <span className="text-green-500">
                {" "}
                Common Questions and Answers
              </span>
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl px-6 py-5 transition hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800"
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                >
                  {index + 1}. {item.q}
                  <span className="text-2xl text-gray-500">
                    {activeFAQ === index ? "−" : "+"}
                  </span>
                </button>

                {activeFAQ === index && (
                  <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/******************************************8 */}
      <section className="py-20 bg-[#f7fbfb]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Contact our Sales Team
            </h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Transform your parking operations with SmartPark. Whether you’re
              looking to optimize your parking spaces, enhance customer
              experiences, or increase revenue, we provide tailored solutions
              that deliver measurable results.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Let us help you take your parking management to the next level.
              Contact our Sales Team today!
            </p>

            {/* Optional Image */}
            <div className="mt-10">
              <img
                src="/carAnimation.webp"
                alt="Smart Parking Device"
                className="max-w-sm"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Please share your details, and our team will reach out to you.
            </h3>

            <form className="space-y-5">
              {/* Nature of Enquiry */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nature of Enquiry <span className="text-red-500">*</span>
                </label>
                <select className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
                  <option>Select...</option>
                  <option>Parking Management</option>
                  <option>Valet Services</option>
                  <option>Smart Automation</option>
                  <option>General Enquiry</option>
                </select>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your First Name"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email ID"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>
              </div>

              {/* Site Name & City */}
              <div className="grid grid-cols-2 gap-4">
                {/* Site Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Site Name <span className="text-red-500">*</span>
                  </label>

                  <select
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  >
                    <option value="">Select Site</option>
                    <option>Kothrud</option>
                    <option>Hinjewadi</option>
                    <option>Viman Nagar</option>
                    <option>Shivajinagar</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    City <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value="Pune"
                    readOnly
                    className="w-full border rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full border rounded-md px-4 py-2"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-md transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
