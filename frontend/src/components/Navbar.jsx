import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  // Apply class to <html> tag when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-blue-600 dark:bg-blue-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          WeatherSphere
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-blue-200">Home</Link>
          <Link to="/forecast" className="text-white hover:text-blue-200">Forecast</Link>
          <Link to="/alerts" className="text-white hover:text-blue-200">Alerts</Link>
          <Link to="/about" className="text-white hover:text-blue-200">About</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-blue-700 dark:bg-blue-800 text-white"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
