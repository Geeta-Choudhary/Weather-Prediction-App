import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import HeroLight from "../assets/lottie/hero-weather.json";
import HeroDark from "../assets/lottie/moon-night.json";

const Home = ({ darkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-12 py-16">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            AI-Powered Weather Forecast
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Stay ahead of the weather with smart predictions, beautiful visuals,
            and real-time alerts.
          </p>
          <button
            onClick={() => navigate("/forecast")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all duration-300"
          >
            View Forecast
          </button>
        </div>
        <div className="flex-1 max-w-md">
          <Lottie
            animationData={darkMode ? HeroDark : HeroLight}
            loop
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-12 px-4 md:px-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Our App?
        </h2>
        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          drag="x"
          dragConstraints={{ right: 0, left: -300 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {[
            { title: "Accurate Forecasts", desc: "Powered by ML algorithms." },
            {
              title: "Real-Time Alerts",
              desc: "Stay updated about storms & more.",
            },
            {
              title: "Modern UI/UX",
              desc: "Smooth, responsive and intuitive.",
            },
            {
              title: "Global Coverage",
              desc: "Weather info for cities worldwide.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="min-w-[250px] bg-gradient-to-r from-blue-200 to-blue-400 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-800 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      
    </div>
  );
};

export default Home;
