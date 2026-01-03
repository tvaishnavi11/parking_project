import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/Dashbord";
//import DashboardNavbar from "../components/DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
