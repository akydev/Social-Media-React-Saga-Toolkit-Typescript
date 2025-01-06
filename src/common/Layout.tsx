import { Outlet } from "react-router-dom";
import Navbars from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbars />
      <Outlet />
    </>
  );
}
