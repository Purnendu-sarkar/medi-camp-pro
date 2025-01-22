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
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-4">
            <h2 className="text-2xl font-extrabold text-center">Dashboard</h2>
          </div>
          <div className="mt-8">
            <ul className="px-4 space-y-2">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/adminProfile"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <UserCircle className="w-5 h-5" />
                      Admin Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addCamp"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <PlusCircle className="w-5 h-5" />
                      Add A Camp
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageCamp"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <ListChecks className="w-5 h-5" />
                      Manage Camps
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/registeredCamps"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <ClipboardListIcon className="w-5 h-5" />
                      Registered Camps
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/userHome"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <UserCircle2 className="w-5 h-5" />
                      Participant Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/analytics"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <LineChart className="w-5 h-5" />
                      Analytics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/cart"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <ClipboardList className="w-5 h-5" />
                      Registered Camps
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/paymentHistory"
                      className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                    >
                      <History className="w-5 h-5" />
                      Payment History
                    </NavLink>
                  </li>
                </>
              )}
              {/* shared nav links */}
              <div className="divider divider-error"></div>
              <li>
                <NavLink
                  to="/"
                  className={`flex gap-1 items-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-gray-800`}
                >
                  <House className="w-5 h-5" />
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <div className="p-8">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
