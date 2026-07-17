import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { FaHome, FaWallet, FaExchangeAlt, FaCog, FaSignOutAlt,FaBalanceScale } from "react-icons/fa";


export default function Sidebar() {
      const navigate = useNavigate();
     const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const menuClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition";

  const activeClass = "bg-gradient-to-r from-lime-500/20 to-transparent text-white border-l-4 border-lime-400";

  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col justify-between px-4 py-6">

      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Wallet</h1>

  {/* ✅ Balance Icon */}
        <div className="flex justify-center mb-8">
          <FaBalanceScale className="text-4xl text-lime-400" />
        </div>
        {/* Profile Icon
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-lime-400 to-green-600"></div>
        </div> */}

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
            to="/wallet"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaWallet /> My Wallet
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaExchangeAlt /> Transactions
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaCog /> Settings
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