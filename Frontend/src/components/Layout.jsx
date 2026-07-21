import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex bg-black min-h-screen text-white">
      <div className="fixed top-0 left-0 w-64 h-screen bg-[#111]">
        <Sidebar />
      </div>

      <div className="ml-64 w-full p-6">
        <Outlet />
      </div>
    </div>
  );
}
