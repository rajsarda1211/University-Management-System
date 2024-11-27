import React from "react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Dashboard Title */}
        <div
          className="flex items-center text-xl font-bold cursor-pointer hover:text-blue-400 transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          <RxDashboard className="text-2xl mr-2" />
          <span>{router.state && router.state.type} Dashboard</span>
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Logout
          <FiLogOut className="ml-2 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
