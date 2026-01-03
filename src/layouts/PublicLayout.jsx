import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export function PublicLayout() {
  const { pathname } = useLocation();

  // Show navbar ONLY on Home page
  const showNavbar = pathname === "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
}
export default PublicLayout;
