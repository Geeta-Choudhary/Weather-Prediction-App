
const AlertCard = ({ alert, onDismiss, darkMode }) => {
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-300"
      case "moderate":
        return "bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-500 dark:text-yellow-300"
      case "low":
        return "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-500 dark:text-green-300"
      default:
        return "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300"
    }
  }

  return (
    <div className={`border-l-4 p-4 rounded-lg shadow-md ${getSeverityColor(alert.severity)}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{alert.title}</h3>
          <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{alert.description}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>{alert.time}</span>
            <span className="mx-2">•</span>
            <span className="font-medium">{alert.severity} Severity</span>
          </div>
        </div>
        {alert.active && (
          <button
            onClick={() => onDismiss(alert.id)}
            className={`px-3 py-1 rounded-md ${
              darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  )
}

export default AlertCard;
