import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import ProtectedRoute from "./pages/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";

import DashboardNavbar from "./Dashbord_Section/DashbordNavbar";
import ParkSmartLanding from "./components/Dashbord";
import ModernContactForm from "./components/getTuch";
import Solutions from "./components/aprn";
import SmartTouchParking from "./components/ParkingMap";
import ParkingPuneWizard from "./pages/ValetPage";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./pages/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== PUBLIC LAYOUT ========= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Route>

        {/* ========== DASHBOARD (PROTECTED) ========= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardNavbar />
              <ParkSmartLanding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maplocation"
          element={
            <ProtectedRoute>
              <DashboardNavbar />
              <SmartTouchParking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardNavbar />
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/getTuch"
          element={
            <ProtectedRoute>
              <DashboardNavbar />
              <ModernContactForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solutions"
          element={
            <ProtectedRoute>
              <DashboardNavbar />
              <Solutions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/valet"
          element={
            <ProtectedRoute>
              <ParkingPuneWizard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer visible on all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
