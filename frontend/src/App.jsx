

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Forecast from "./pages/Dashboard"
import Alerts from "./pages/Alerts"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useState } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/forecast" element={<Forecast darkMode={darkMode} />} />
          <Route path="/alerts" element={<Alerts darkMode={darkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
        </Routes>
        <Footer darkMode={darkMode} />
      </Router>
    </div>
  )
}

export default App;
