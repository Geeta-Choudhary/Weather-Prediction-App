import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";

import HeroLight from "../assets/lottie/hero-weather.json";
import HeroDark from "../assets/lottie/moon-night.json";

import CurrentLocationMap from "../components/CurrentLocationMap";

const Home = ({ darkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#1e1b4b] to-[#312e81] text-white"
          : "bg-gradient-to-b from-blue-100 to-blue-300 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-20">
        <div className="flex-1 text-center md:text-left space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your AI-Powered Weather Companion
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Plan better with smart forecasts, real-time alerts, and stunning
            visuals — all powered by AI.
          </p>
          <button
            onClick={() => navigate("/forecast")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition duration-300"
          >
            View Forecast
          </button>
<br/><br/><br/>
          <p
  className={`mt-6 text-2xl font-semibold text-center animate-blink ${
    darkMode ? "text-yellow-400" : "text-indigo-600"
  } font-poppins`}
>
  Where Machine Learning Meets Meteorology — One Sphere. Infinite Predictions.
</p>
     

        </div>
        <div className="flex-1 max-w-md">
          <Lottie animationData={darkMode ? HeroDark : HeroLight} loop />
        </div>
      </section>

      {/* Why Choose Us - Separate Container */}
      <section
        className={`py-16 px-4 md:px-12 transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-[#1e1b4b] to-[#312e81]"
            : "bg-gradient-to-br from-blue-100 to-blue-300"
        }`}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Why Choose Our App?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Accurate Forecasts",
              desc: "Backed by AI and machine learning for pinpoint weather predictions.",
              icon: "🌤️",
            },
            {
              title: "Real-Time Alerts",
              desc: "Get notified instantly about storms, temperature shifts, and more.",
              icon: "🚨",
            },
            {
              title: "Modern UI/UX",
              desc: "Intuitive interface, responsive design, and a delightful experience.",
              icon: "💡",
            },
            {
              title: "Global Reach",
              desc: "Access weather data for cities across the globe, instantly.",
              icon: "🌍",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 shadow-lg backdrop-blur-md border border-white/20 transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${
                darkMode
                  ? "bg-gradient-to-tr from-white/5 to-white/10"
                  : "bg-white/70"
              }`}
            >
              <div
                className="text-5xl mb-4 transition duration-300 ease-in-out hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Location Map */}

  <CurrentLocationMap />

     
    </div>
  );
};

export default Home;
