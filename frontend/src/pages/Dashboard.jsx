

import { useState, useEffect } from "react"
import axios from "axios"
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer, WiSunrise, WiSunset } from "react-icons/wi"
import ForecastChart from "../components/ForecastChart"

const Dashboard = ({ darkMode }) => {
  const [city, setCity] = useState("Pune")
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState(null)
  const [forecastType, setForecastType] = useState("hourly") // Toggle between hourly and 5-day
  const [forecastData, setForecastData] = useState([])

  const handleSearch = async () => {
    if (!search.trim()) return
    setCity(search.trim())
    setSearch("")
  }

  const fetchWeatherData = async () => {
    try {
      const res = await axios.post("http://localhost:5000/predict/city", { city })
      setWeather(res.data)
    } catch (err) {
      console.error("Weather Fetch Error:", err)
    }
  }

  const fetchForecastData = async () => {
    try {
      const url =
        forecastType === "hourly" ? "http://localhost:5000/forecast/hourly" : "http://localhost:5000/forecast/7days"

      const res = await axios.post(url, { city })
      const data = forecastType === "hourly" ? res.data.hourly_forecast : res.data["5_day_forecast"]
      setForecastData(data)
    } catch (err) {
      console.error("Forecast Fetch Error:", err)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [city])

  useEffect(() => {
    fetchForecastData()
  }, [city, forecastType])

  const formatTime = (time) => (time ? time : "--")

  const gradientClass = darkMode
    ? "bg-gradient-to-b from-[#1e1b4b] to-[#312e81]"
    : "bg-gradient-to-b from-blue-100 to-blue-300"

  const cardClass = darkMode ? "bg-gradient-to-tr from-white/5 to-white/10" : "bg-white/70"

  const textClass = darkMode ? "text-white" : "text-blue-800"

  return (
    <div className={`flex h-screen font-sans transition-colors duration-500 ${gradientClass}`}>
     
 {/* Sidebar */}
 <div
        className={`w-1/4 text-white p-6 flex flex-col justify-between ${darkMode ? "bg-gradient-to-b from-blue-700 to-blue-900" : "bg-gradient-to-b from-blue-500 to-blue-700"} transition-colors duration-300`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold">WeatherSphere</h1>
          <p className="text-sm italic mt-2">Your AI-Powered Weather Companion</p>
       
          <p className="text-lg mt-6 font-bold"> <span className="text-3xl">📍</span>{weather?.city || "Loading..."}</p>
          <p className="text-sm italic mt-2 font-bold">{weather?.weather_data?.description || "Loading..."}</p>
          <div className="text-6xl font-extrabold mt-6">
            {weather?.weather_data?.temperature !== undefined ? `${weather.weather_data.temperature}°C` : "--"}
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="mt-10 space-y-4 text-sm">
          <div className="flex items-center gap-2">
            <WiSunrise className="text-3xl" /> Sunrise: {formatTime(weather?.sunrise)}
          </div>
          <div className="flex items-center gap-2">
            <WiSunset className="text-3xl" /> Sunset: {formatTime(weather?.sunset)}
          </div>
        </div>

        <div className="text-xs mt-10 opacity-80">
          © 2025 Weather Dashboard <br /> Powered by OpenWeatherMap
        </div>
      </div>



      {/* Main Dashboard */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={`px-4 py-2 rounded-l-md border ${
              darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"
            } w-1/3`}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Temperature", value: `${weather?.weather_data?.temperature || "--"}°C`, icon: <WiThermometer /> },
            { label: "Humidity", value: `${weather?.weather_data?.humidity || "--"}%`, icon: <WiHumidity /> },
            { label: "Pressure", value: `${weather?.weather_data?.pressure || "--"} hPa`, icon: <WiBarometer /> },
            { label: "Wind Speed", value: `${weather?.weather_data?.wind_speed || "--"} m/s`, icon: <WiStrongWind /> },
          ].map((item, index) => (
            <div
              key={index}
              className={`backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 text-center ${textClass} font-semibold transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${cardClass}`}
            >
              <div className={`text-4xl ${darkMode ? "text-blue-400" : "text-blue-700"} mx-auto mb-2`}>{item.icon}</div>
              <p className="text-md uppercase tracking-wide">{item.label}</p>
              <p className="text-2xl mt-2 font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Predicted Condition */}
        <div className="mt-10">
          <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-blue-900"}`}>Predicted Condition</h3>
          <div
            className={`mt-4 p-6 border border-white/20 shadow-xl rounded-xl text-center ${textClass} font-semibold ${cardClass}`}
          >
            <p className="text-2xl font-bold">{weather?.predicted_condition || "Loading..."}</p>
          </div>
        </div>

        {/* Forecast Toggle */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-blue-900"}`}>Forecast</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setForecastType("hourly")}
                className={`px-4 py-2 rounded-md ${
                  forecastType === "hourly"
                    ? "bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white"
                    : `${darkMode ? "bg-gray-800 text-white" : "bg-white text-blue-600"} border`
                }`}
              >
                Hourly
              </button>
              <button
                onClick={() => setForecastType("5day")}
                className={`px-4 py-2 rounded-md ${
                  forecastType === "5day"
                    ? "bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white"
                    : `${darkMode ? "bg-gray-800 text-white" : "bg-white text-blue-600"} border`
                }`}
              >
                5 Day
              </button>
            </div>
          </div>

          {/* Forecast Chart */}
          <ForecastChart key={forecastType} type={forecastType} data={forecastData} darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
