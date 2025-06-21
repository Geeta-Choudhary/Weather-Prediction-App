
import { useState } from "react"
import AlertCard from "../components/AlertCard"

const Alerts = ({ darkMode }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Heatwave Warning",
      description: "Temperatures expected to reach 42°C in Delhi-NCR region",
      severity: "High",
      time: "2 hours ago",
      active: true,
    },
    {
      id: 2,
      title: "Flash Flood Alert",
      description: "Central US hit by torrential rain and potential flash floods",
      severity: "Moderate",
      time: "33 minutes ago",
      active: true,
    },
    {
      id: 3,
      title: "Rain Relief Expected",
      description: "Heatwave to be followed by rain later this week",
      severity: "Low",
      time: "1 hour ago",
      active: true,
    },
  ])

  const [customAlert, setCustomAlert] = useState("")
  const [notificationMethod, setNotificationMethod] = useState("email")

  const dismissAlert = (id) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, active: false } : alert)))
  }

  const handleCustomAlertSubmit = (e) => {
    e.preventDefault()
    if (customAlert.trim()) {
      alert(`Custom alert for "${customAlert}" has been set!`)
      setCustomAlert("")
    }
  }

  const handleNotificationSubscription = () => {
    alert(`You have subscribed to real-time notifications via ${notificationMethod}.`)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-[#1e1b4b] to-[#312e81] text-white"
          : "bg-gradient-to-b from-blue-100 to-blue-300 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Weather Alerts</h1>

        {/* Active Alerts */}
        <div className="space-y-4">
          {alerts
            .filter((alert) => alert.active)
            .map((alert) => (
              <AlertCard key={alert.id} alert={alert} onDismiss={() => dismissAlert(alert.id)} darkMode={darkMode} />
            ))}
        </div>

        {/* Dismissed Alerts */}
        {alerts.filter((alert) => !alert.active).length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Dismissed Alerts</h2>
            <div className="space-y-4 opacity-70">
              {alerts
                .filter((alert) => !alert.active)
                .map((alert) => (
                  <AlertCard key={alert.id} alert={alert} onDismiss={() => {}} darkMode={darkMode} />
                ))}
            </div>
          </div>
        )}

        {/* Custom Alert Form */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Set Custom Alerts</h2>
          <form onSubmit={handleCustomAlertSubmit} className="space-y-4">
            <input
              type="text"
              value={customAlert}
              onChange={(e) => setCustomAlert(e.target.value)}
              placeholder="Enter weather condition (e.g., heavy rain)"
              className={`w-full px-4 py-2 border rounded-lg ${
                darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Set Alert
            </button>
          </form>
        </div>

        {/* Notification Subscription */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Subscribe to Notifications</h2>
          <div className="space-y-4">
            <select
              value={notificationMethod}
              onChange={(e) => setNotificationMethod(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg ${
                darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="app">In-App Notifications</option>
            </select>
            <button
              onClick={handleNotificationSubscription}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alerts;
