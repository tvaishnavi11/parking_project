import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-white via-slate-50 to-slate-100 border-t border-slate-200">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Brand */}
        <div className="space-y-3">
          <div className="text-2xl font-black tracking-tight uppercase text-slate-800">
            <span className="text-emerald-500 italic">P</span>arkSmart
          </div>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest">
            Redefining Urban Mobility
          </p>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
            Smart parking solutions designed to simplify urban travel with
            efficiency, intelligence, and sustainability.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-4 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          {["", "Terms", "LinkedIn", "Support"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative w-fit hover:text-emerald-500 transition-all duration-300
                         after:absolute after:-bottom-1 after:left-0 after:h-[1px]
                         after:w-0 after:bg-emerald-400 after:transition-all
                         hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Contact Us
          </h3>
          <p className="text-sm text-slate-500">📍 Pune, Maharashtra, India</p>
          <p className="text-sm text-slate-500">📞 +91 98765 43210</p>
          <p className="text-sm text-slate-500">📧 support@smartparking.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-400 bg-white/60 backdrop-blur">
        © 2025 Park Smart Solutions Pvt. Ltd.
      </div>

      {/* Soft Glow */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
    </footer>
  );
};

export default Footer;
