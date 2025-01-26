import {
  ClipboardList,
  ClipboardListIcon,
  History,
  House,
  LineChart,
  ListChecks,
  PlusCircle,
  UserCircle,
  UserCircle2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("/dashboard/registeredCamps");
    } else {
      navigate("/dashboard/analytics");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white flex-shrink-0 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-start bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
          <button
            className="text-white hover:text-blue-400"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="text-xl font-bold">
              {isSidebarOpen ? "⇦" : "⇨"}
            </span>
          </button>
          {isSidebarOpen && (
            <h2 className="text-2xl font-extrabold text-center text-blue-400 w-full">
              Dashboard
            </h2>
          )}
        </div>
        <div className="mt-8">
          <ul className="px-2 space-y-2">
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/adminProfile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <UserCircle className="w-6 h-6" />
                    {isSidebarOpen && "Admin Profile"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addCamp"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <PlusCircle className="w-6 h-6" />
                    {isSidebarOpen && "Add A Camp"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageCamp"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <ListChecks className="w-6 h-6" />
                    {isSidebarOpen && "Manage Camps"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/registeredCamps"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <ClipboardListIcon className="w-6 h-6" />
                    {isSidebarOpen && "Registered Camps"}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard/userHome"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <UserCircle2 className="w-6 h-6" />
                    {isSidebarOpen && "Participant Profile"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <LineChart className="w-6 h-6" />
                    {isSidebarOpen && "Analytics"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/cart"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <ClipboardList className="w-6 h-6" />
                    {isSidebarOpen && "Registered Camps"}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-800 hover:text-blue-300"
                      }`
                    }
                  >
                    <History className="w-6 h-6" />
                    {isSidebarOpen && "Payment History"}
                  </NavLink>
                </li>
              </>
            )}
            {/* Shared Links */}
            <div className="border-t border-gray-700 my-4"></div>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "hover:bg-gray-800 hover:text-blue-300"
                  }`
                }
              >
                <House className="w-6 h-6" />
                {isSidebarOpen && "Home"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
