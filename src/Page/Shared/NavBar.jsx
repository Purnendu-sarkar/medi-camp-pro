import { Stethoscope, Sun, Moon, X, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = isDarkTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (isDarkTheme) {
      document.body.classList.add("bg-black", "text-white");
    } else {
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [isDarkTheme]);

  const handleLogOut = () => {
    logOut()
      .then(() => setIsMenuOpen(false))
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-bold px-3 py-2 ${
              isActive ? "text-blue-600" : "text-gray-700 dark:text-white"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-camps"
          className={({ isActive }) =>
            `font-bold px-3 py-2 ${
              isActive ? "text-blue-600" : "text-gray-700 dark:text-white"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Available Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/how-it-works"
          className={({ isActive }) =>
            `font-bold px-3 py-2 ${
              isActive ? "text-blue-600" : "text-gray-700 dark:text-white"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          How It Works
        </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink
            to="/join-us"
            className={({ isActive }) =>
              `bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
                isActive ? "ring-2 ring-blue-400" : ""
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Join Us
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-black bg-opacity-50 dark:bg-gray-900 dark:text-white text-white w-full fixed top-0 left-0 z-50">
      <div className="w-full md:w-11/12 mx-auto flex justify-between items-center px-4 lg:px-8">
        <Link to="/" className="flex items-center">
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
            MediCamp
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
          >
            {isDarkTheme ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )}
          </button>
          {user && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar flex items-center"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User Profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 dark:bg-gray-800 rounded-box w-52"
              >
                {/* <li>
                  <p className="font-bold text-gray-700">{user?.displayName}</p>
                </li> */}
                <li>
                  <Link
                    to="/dashboard"
                    className="font-bold text-gray-700 dark:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="font-medium text-red-600 hover:text-red-800"
                  >
                    LogOut
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
          >
            {isDarkTheme ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-80 backdrop-blur-md flex flex-col justify-center items-center z-50 transition-opacity duration-300">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            <X className="h-6 w-6 text-black dark:text-white" />
          </button>
          <ul className="space-y-6 text-center">
            {navOptions}
            {user && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="font-bold text-gray-700 dark:text-white text-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="font-medium text-red-600 text-xl hover:text-red-800"
                  >
                    LogOut
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
