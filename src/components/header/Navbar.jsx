// Client/src/components/header/Navbar.jsx
import React from "react";
import { FiMenu, FiX, FiUser, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the authentication token
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    // Navigate to login page
    navigate("/login");
  };

  const useOutsideClicker = (ref, handler) => {
    React.useEffect(() => {
      const handleClick = (e) => {
        if (!ref.current?.contains(e.target)) {
          handler();
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    });
  };

  const userMenuRef = React.createRef();
  useOutsideClicker(userMenuRef, () => setIsUserMenuOpen(false));

  return (
    <nav className="fixed w-full bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand and main menu */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-blue-400">eCare</span>
            </Link>
          </div>

          {/* Middle - Navigation links (hidden on mobile) */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              to="/appointments"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Appointments
            </Link>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-700">
              <FiSettings className="text-gray-300" size={20} />
            </button>
            <button
            data-testid="user-menu-button"
              className="p-2 rounded-full hover:bg-gray-700 relative"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              ref={userMenuRef}
            >
              <FiUser  className="text-gray-300" size={20} />
              {isUserMenuOpen && (
                <div className="absolute right-0 top-14 bg-gray-800 shadow-lg rounded-md py-2 px-4 w-48 z-50">
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/demographics"
                      className="text-gray-300 hover:text-blue-400"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/report"
                      className="text-gray-300 hover:text-blue-400"
                    >
                      Medicle Reports
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="text-gray-300" size={24} />
              ) : (
                <FiMenu className="text-gray-300" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 w-full bg-gray-800 shadow-lg">
            <div className="flex flex-col items-center space-y-4 p-4">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-blue-400"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-300 hover:text-blue-400"
              >
                Services
              </Link>
              <Link
                to="/appointments"
                className="text-gray-300 hover:text-blue-400"
              >
                Appointments
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
