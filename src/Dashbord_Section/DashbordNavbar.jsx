import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-2xl font-black">
          Smart<span className="text-green-500">Park</span>
        </h1>

        {/* LINKS */}
        <div className="flex items-center gap-8 font-semibold text-gray-700">
          <Link to="/dashboard" className="hover:text-green-600">
            Dashboard
          </Link>
          <Link to="/maplocation" className="hover:text-green-600">
            Book Slot
          </Link>
          <Link to="/admin" className="hover:text-green-600">
            My Bookings
          </Link>
          <Link to="/getTuch" className="hover:text-green-600">
            Contat Us
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
