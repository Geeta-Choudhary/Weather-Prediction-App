const AlertCard = ({ alert, onDismiss }) => {
    const getSeverityColor = () => {
      switch(alert.severity.toLowerCase()) {
        case 'high':
          return 'bg-red-100 dark:bg-red-900/50 border-red-500';
        case 'moderate':
          return 'bg-yellow-100 dark:bg-yellow-900/50 border-yellow-500';
        default:
          return 'bg-blue-100 dark:bg-blue-900/50 border-blue-500';
      }
    };
  
    return (
      <div className={`${getSeverityColor()} border-l-4 p-4 rounded-r-lg flex justify-between items-start`}>
        <div>
          <div className="flex items-center mb-1">
            <span className="font-bold mr-2">{alert.title}</span>
            <span className="text-sm opacity-70">{alert.time}</span>
          </div>
          <p>{alert.description}</p>
        </div>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 ml-4"
          >
            ×
          </button>
        )}
      </div>
    );
  };
  
  export default AlertCard;