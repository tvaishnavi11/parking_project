import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";

/** * DATA CONFIGURATION */
const SLIDES = [
  {
    id: 1,
    title: "Spot Detection",
    img: "smaryy.jpg",
    description:
      "Our advanced hardware and software work together to deliver a seamless, efficient parking experience.",
  },
  {
    id: 2,
    title: "Occupancy Monitoring",
    img: "homi.webp",
    description:
      "Real-time occupancy detection ensures maximum utilization of every parking spot.",
  },
  {
    id: 3,
    title: "Centralized Management",
    img: "manage spark.webp",
    description:
      "Monitor multiple locations from a single, intuitive dashboard with deep analytics.",
  },
  {
    id: 4,
    title: "Data-Driven Insights",
    img: "management.webp",
    description:
      "Leverage data-driven insights to optimize operations and enhance user experience.",
  },
];

const PARTNERS = ["Bosch", "Casagrand", "Godrej", "Suncity", "Terra"];

const FEATURES = [
  {
    id: 1,
    title: "ANPR Access Control",
    description: "Automated license plate recognition for friction-less entry.",
    mediaSrc: "Anpr.jpg",
  },
  {
    id: 2,
    title: "Slot Booking",
    description: "Cloud-based reservation system for guaranteed parking.",
    mediaSrc: "booking Slot.jpg",
  },
  {
    id: 3,
    title: "RFID Access",
    description: "High-speed identification for monthly permit holders.",
    mediaSrc: "rfid.jpg",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Akshay Singh",
    text: "ParkSmart has elevated our corporate operations to new heights. Their tech streamlined our enhanced operational efficiency.",
  },
  {
    id: 2,
    name: "Lakshay Singh",
    text: "ParkSmart has revolutionized parking management in our society. Their smart solutions have streamlined entry and exit.",
  },
  {
    id: 3,
    name: "Harshit Mishra",
    text: "The integration of automatic barriers has made parking smoother and more secure. It's a modern, reliable system.",
  },
  {
    id: 4,
    name: "Abhishek Singh",
    text: "Innovative solutions have reduced wait times for customers and maximized space usage at the mall.",
  },
];

/** * ANIMATION VARIANTS */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const StatCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/,/g, ""));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div variants={fadeInUp} ref={ref} className="text-center group">
      <div className="text-3xl md:text-5xl font-black mb-1 group-hover:scale-110 transition-transform duration-500">
        {count.toLocaleString()}+
      </div>
      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
        {label}
      </div>
    </motion.div>
  );
};

const FeatureSection = ({ title, description, mediaSrc, isReversed }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    isReversed ? [-30, 30] : [30, -30]
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className={`flex flex-col md:flex-row items-center py-24 px-6 md:px-20 gap-16 ${
        isReversed ? "md:flex-row-reverse bg-gray-50" : "bg-white"
      }`}
    >
      <motion.div
        variants={fadeInUp}
        className="w-full md:w-1/2 overflow-hidden rounded-[3rem] shadow-2xl relative group"
      >
        <motion.img
          style={{ y: yParallax }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
          src={mediaSrc}
          alt={title}
          className="w-full h-[450px] object-cover"
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full md:w-1/2 space-y-6">
        <Link to="/solutions">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            {description}
          </p>
          <motion.button
            whileHover={{ x: 10 }}
            className="text-green-600 text-lg font-black flex items-center gap-3"
          >
            Explore Solution <span className="text-2xl transition-all">→</span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default function ParkSmartLanding() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-green-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 2. Transforming Section (Slider) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center static">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black leading-tight"
            >
              Transforming parking with{" "}
              <span className="text-green-500 italic">ParkSmart</span>
            </motion.h2>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-gray-500 text-2xl leading-relaxed font-medium"
              >
                {SLIDES[activeSlide].description}
              </motion.p>
            </AnimatePresence>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-8"
            >
              <Link to="/getTuch">
                <motion.button
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10"
                >
                  Get In Touch
                </motion.button>
              </Link>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                <img
                  src="6YPEQBycn2VW2mjefrFvhRCysI0.avif"
                  alt="QR"
                  className="w-12 h-12 bg-white p-1 rounded-lg"
                />
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Download <br />
                  <span className="text-green-600">Mobile App</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="rounded-[4rem] overflow-hidden shadow-2xl aspect-[16/11] relative border-[12px] border-white"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={SLIDES[activeSlide].img}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white font-black text-4xl italic">
                {SLIDES[activeSlide].title}
              </div>
            </motion.div>
            <div className="flex gap-4 mt-10 justify-center">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(i)}
                  className={`w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 transition-all duration-500 ${
                    activeSlide === i
                      ? "border-green-500 scale-110 rotate-3"
                      : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <img src={s.img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Partner Marquee */}
      <div className="py-24 bg-zinc-400 overflow-hidden border-y border-gray-50">
        <p className="text-center font-black text-gray-300 mb-12 uppercase tracking-[0.3em] text-xs">
          Trusted Global Partners
        </p>
        <motion.div
          className="flex gap-32 whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
            <span
              key={i}
              className="text-5xl font-black text-gray-100 hover:text-green-500 transition-colors cursor-default"
            >
              {p}
            </span>
          ))}
        </motion.div>
      </div>

      {/*  Hero Section - Repositioned for flow */}
      <header className="max-w-7xl mx-auto px-3 mt-10 mb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="rounded-[3.5rem] pt-28 pb-20 px-8 text-center text-white relative shadow-3xl overflow-hidden bg-[#0a0a0a]"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)`,
              backgroundSize: "44px 44px",
            }}
          />
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-5xl font-black mb-8 leading-tight relative z-10"
          >
            Increase Efficiency, <br />{" "}
            <span className="text-green-400">Maximize Profit</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-2xl mb-12 relative z-10"
          >
            AI-powered hardware and cloud software redefining modern parking
            management.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-24 pt-16 border-t border-white/10 relative z-10"
          >
            <StatCounter value="145,002" label="Cars Managed" />
            <StatCounter value="111,001" label="Daily Transactions" />
            <StatCounter value="3,000" label="Locations" />
            <StatCounter value="300,000" label="Global Users" />
          </motion.div>
        </motion.div>
      </header>

      {/* 4. Feature Rows */}
      {FEATURES.map((f, i) => (
        <FeatureSection key={f.id} {...f} isReversed={i % 2 !== 0} />
      ))}

      {/* 5. Testimonial Scroller */}
      <section className="py-32 bg-gray-900 text-white overflow-hidden">
        <h2 className="text-center text-5xl font-black mb-20 italic">
          What Clients Say
        </h2>
        <motion.div
          className="flex gap-8 px-4"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="min-w-[400px] bg-white/5 backdrop-blur-lg p-10 rounded-[3rem] border border-white/10 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center font-black text-gray-900">
                  {r.name.charAt(0)}
                </div>
                <h4 className="font-black text-xl">{r.name}</h4>
              </div>
              <p className="text-gray-400 text-lg italic leading-relaxed">
                "{r.text}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. Chat Widget */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <AnimatePresence>
          {isChatVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-2xl mb-6 flex items-center gap-5 border border-gray-100 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsChatVisible(false)}
                className="absolute -top-3 -right-3 bg-gray-900 text-white rounded-full w-8 h-8 font-bold flex items-center justify-center"
              >
                ✕
              </button>

              {/* Icon */}
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                💬
              </div>

              {/* Text */}
              <div>
                <p className="font-bold">Team is Online</p>
                <p className="text-gray-500 text-sm">Response time: ~2 mins</p>

                {/* WhatsApp Link */}
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 text-sm font-medium mt-2 inline-block"
                >
                  Start Chat →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Button */}
        <motion.div
          onClick={() => setIsChatVisible(!isChatVisible)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#25D366] p-6 rounded-full text-white shadow-2xl cursor-pointer"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
