// Client/src/components/footer/Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const Img = "/ecare1.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#2D336B] text-[#FFF2F2] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-4">
            <h3
              className="text-xl font-bold text-[#A9B5DF] mb-2"
              data-testid="logo-image"
            >
              <img src={Img} alt="Logo" width="140" height="140" />
            </h3>
            <p className="text-sm text-[#FFF2F2]">
              Your trusted partner in healthcare services and appointment
              management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-[#7886C7] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#7886C7] transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="hover:text-[#7886C7] transition-colors duration-200"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/frequent-questions"
                  className="hover:text-[#7886C7] transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Contact Us
            </h4>
            <ul className="text-sm space-y-2 text-[#FFF2F2]">
              <li>Email: info@ecare.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Health Street, Care City</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7886C7] transition-colors duration-200"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7886C7] transition-colors duration-200"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7886C7] transition-colors duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7886C7] transition-colors duration-200"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#A9B5DF] text-center">
          <p className="text-sm text-[#FFF2F2]">
            © {new Date().getFullYear()} eCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
