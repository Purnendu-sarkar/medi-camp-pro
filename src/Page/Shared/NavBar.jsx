import { Stethoscope, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
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
  }, [isDarkTheme]);

  const handleLogOut = () => {
    logOut()
      .then(() => setIsMenuOpen(false))
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link
          to="/"
          className="font-bold text-gray-700 dark:text-white hover:text-blue-600 px-3 py-2"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/available-camps"
          className="font-bold text-gray-700 dark:text-white hover:text-blue-600 px-3 py-2"
          onClick={() => setIsMenuOpen(false)}
        >
          Available Camps
        </Link>
      </li>
      {!user && (
        <li>
          <Link
            to="/join-us"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Us
          </Link>
        </li>
      )}
    </>
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar bg-black bg-opacity-30 dark:bg-gray-900 dark:text-white text-white w-full fixed top-0 left-0 z-50">
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
          <div className="dropdown">
            <label
              tabIndex={0}
              onClick={toggleMenu}
              className="btn btn-ghost md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52"
              >
                {navOptions}
                {user && (
                  <>
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
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
