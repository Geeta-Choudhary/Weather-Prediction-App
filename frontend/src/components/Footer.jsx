import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`py-6 px-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#1e1b4b] to-[#312e81] text-white"
          : "bg-gradient-to-b from-blue-100 to-blue-300 text-gray-900"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-bold">WeatherSphere 🌤️</h2>
          <p className="text-base opacity-80">
            Your trusted AI-powered weather companion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-6 text-center md:text-left">
          <Link
            to="/"
            className="text-base hover:underline transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/forecast"
            className="text-base hover:underline transition-colors duration-300"
          >
            Forecast
          </Link>
          <Link
            to="/alerts"
            className="text-base hover:underline transition-colors duration-300"
          >
            Alerts
          </Link>
          <Link
            to="/about"
            className="text-base hover:underline transition-colors duration-300"
          >
            About
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-700 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`mt-6 border-t pt-4 text-center text-base ${
          darkMode ? "border-white/20" : "border-gray-300"
        }`}
      >
        © 2025 WeatherSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;