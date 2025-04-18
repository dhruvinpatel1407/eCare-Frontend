// Client/src/components/header/Navbar.jsx
import React from "react";
import { FiMenu, FiX, FiUser, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
const Img = "/ecare1.png";

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
  const menuRef = React.useRef();
  useOutsideClicker(userMenuRef, () => setIsUserMenuOpen(false));
  useOutsideClicker(menuRef, () => setIsMenuOpen(false));

  return (
    <nav className="fixed w-full bg-[#2D336B] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand and main menu */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-1">
              <span
                className="text-2xl font-bold text-[#A9B5DF]"
                data-testid="logo-image"
              >
                <img src={Img} alt="Logo" width="140" height="140" />
              </span>
            </Link>
          </div>

          {/* Middle - Navigation links (hidden on mobile) */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-white hover:text-[#A9B5DF] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-[#A9B5DF] transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              to="/appointments"
              className="text-white hover:text-[#A9B5DF] transition-colors duration-200"
            >
              Appointments
            </Link>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-[#A9B5DF]/20">
              <FiSettings className="text-[#FFF2F2]" size={20} />
            </button>
            <button
              data-testid="user-menu-button"
              className="p-2 rounded-full hover:bg-[#A9B5DF]/20 relative"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              ref={userMenuRef}
            >
              <FiUser className="text-[#FFF2F2]" size={20} />
              {isUserMenuOpen && (
                <div className="absolute right-0 top-14 bg-[#2D336B] shadow-lg rounded-md py-2 px-4 w-48 z-50">
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/demographics"
                      className="text-white hover:text-[#A9B5DF]"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/report"
                      className="text-white hover:text-[#A9B5DF]"
                    >
                      Medical Reports
                    </Link>
                    <div
                      onClick={handleLogout}
                      role="button"
                      tabIndex={0}
                      className="text-red-400 hover:text-red-500 cursor-pointer"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleLogout();
                      }}
                    >
                      Logout
                    </div>
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
                <FiX className="text-[#FFF2F2]" size={24} />
              ) : (
                <FiMenu className="text-[#FFF2F2]" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-16 right-0 w-full bg-[#2D336B] shadow-lg"
          >
            <div className="flex flex-col items-center space-y-4 p-4">
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-[#A9B5DF]"
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-[#A9B5DF]"
              >
                Services
              </Link>
              <Link
                to="/appointments"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-[#A9B5DF]"
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
