import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaWallet, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  const menuClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition";

  const activeClass =
    "bg-gradient-to-r from-lime-500/20 to-transparent text-white border-l-4 border-lime-400";

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#111] text-white z-50">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold mb-6 font-engravers">Expensio</h1>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaHome /> Dashboard
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaWallet /> Analytics
          </NavLink>

          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
          >
            <FaSignOutAlt /> Logout
          </div>
        </nav>
      </div>
    </div>
  );
}
