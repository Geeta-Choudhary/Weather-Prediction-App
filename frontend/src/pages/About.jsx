
import { motion } from "framer-motion"
import heroImage from "../assets/images/about-hero.jpg"

const About = ({ darkMode }) => {
  const teamMembers = [
    {
      name: "Geeta Choudhary",
      role: "Frontend Developer",
      icon: "👩‍💻",
      bio: "Geeta is a visionary leader with a passion for AI and weather forecasting.",
    },
    {
      name: "Shireen Tekade",
      role: "AI Engineer",
      //image: "/assets/images/about-hero.jpg",
      icon: "👩‍🔬",
      bio: "Shireen brings 15 years of experience in meteorology and climate science.",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#1e1b4b] to-[#312e81] text-white"
          : "bg-gradient-to-b from-blue-100 to-blue-300 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
       {/* Hero Section */}
<div className="relative rounded-xl overflow-hidden mb-12 h-96">
  {heroImage && (
    <img
      src={heroImage || "/placeholder.svg"}
      alt="Weather background"
      className="w-full h-full object-cover object-top" // Added object-top
    />
  )}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
    <div className="px-12 max-w-2xl">
      <h1 className="text-5xl font-bold text-white mb-4">About WeatherSphere</h1>
      <p className="text-xl text-white mb-6">Learn about our technology and team</p>
    </div>
  </div>
</div>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            At WeatherSphere, our mission is to empower individuals and businesses with accurate, real-time weather insights
            using cutting-edge AI technology. We aim to make weather forecasting smarter, more accessible, and
            impactful.
          </p>
        </motion.section>

{/* Technology Highlights */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className={`relative py-16 rounded-xl ${
    darkMode ? "bg-[#1e1b4b]" : "bg-blue-100"
  }`}
>
  <h2
    className={`text-4xl font-bold text-center mb-12 ${
      darkMode ? "text-white" : "text-gray-900"
    }`}
  >
    Our Technology
  </h2>

  {/* Cards Container */}
  <div className="relative max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-6 rounded-lg shadow-lg transition-transform duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-blue-800 to-blue-600"
            : "bg-gradient-to-r from-blue-200 to-blue-400"
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-blue-600 text-3xl">🤖</span>
          </div>
        </div>
        <h3
          className={`text-2xl font-semibold mb-2 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          AI-Powered Forecasting
        </h3>
        <p
          className={`text-center ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Leveraging machine learning models to deliver hyper-accurate weather
          predictions.
        </p>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-6 rounded-lg shadow-lg transition-transform duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-green-800 to-green-600"
            : "bg-gradient-to-r from-green-200 to-green-400"
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-green-600 text-3xl">⚡</span>
          </div>
        </div>
        <h3
          className={`text-2xl font-semibold mb-2 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Real-Time Alerts
        </h3>
        <p
          className={`text-center ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Stay informed with instant notifications for severe weather
          conditions.
        </p>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-6 rounded-lg shadow-lg transition-transform duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-purple-800 to-purple-600"
            : "bg-gradient-to-r from-purple-200 to-purple-400"
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-purple-600 text-3xl">🌍</span>
          </div>
        </div>
        <h3
          className={`text-2xl font-semibold mb-2 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Global Coverage
        </h3>
        <p
          className={`text-center ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Access weather data for any location worldwide, anytime.
        </p>
      </motion.div>
    </div>
  </div>
</motion.section>

       
      {/* Working of the Website Section */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  className="py-12 text-center bg-blue-600 text-white rounded-xl overflow-hidden"
>
  <h2 className="text-4xl font-bold mb-8">How WeatherSphere Works ?</h2>
  <div className="relative overflow-x-auto flex gap-6 px-6 py-8">
    {/* Card 1 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="min-w-[300px] bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-6 text-left"
    >
      <h3 className="text-2xl font-semibold mb-4">Step 1: Data Collection</h3>
      <p className="text-sm text-gray-200">
        WeatherAI gathers real-time weather data from global satellites, sensors, and meteorological stations.
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="min-w-[300px] bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-6 text-left"
    >
      <h3 className="text-2xl font-semibold mb-4">Step 2: AI Processing</h3>
      <p className="text-sm text-gray-200">
        Advanced machine learning models analyze the data to predict weather patterns with high accuracy.
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="min-w-[300px] bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-6 text-left"
    >
      <h3 className="text-2xl font-semibold mb-4">Step 3: Real-Time Alerts</h3>
      <p className="text-sm text-gray-200">
        Users receive instant notifications for severe weather conditions, helping them stay prepared.
      </p>
    </motion.div>

    {/* Card 4 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="min-w-[300px] bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-6 text-left"
    >
      <h3 className="text-2xl font-semibold mb-4">Step 4: User-Friendly Interface</h3>
      <p className="text-sm text-gray-200">
        Access weather forecasts, alerts, and insights through an intuitive and responsive interface.
      </p>
    </motion.div>
  </div>
</motion.section>

 {/* Team Section */}
 <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="py-12"
        >
          <h2 className="text-4xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 ${
                  darkMode ? "bg-indigo-800/50" : "bg-white"
                }`}
              >
                
                {/* Emoji Icon */}
                <div className="text-6xl">{member.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                  <p className={darkMode ? "text-gray-300" : "text-gray-700"}>{member.bio}</p>
                </div>

              </div>
            ))}
          </div>
        </motion.section>



      </div>
    </div>
  )
}

export default About;