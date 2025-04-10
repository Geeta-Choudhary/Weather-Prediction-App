const DailyForecast = ({ data }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {data.map((day, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 ${index !== data.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
          >
            <p className="font-semibold w-20">{day.day}</p>
            <p className="text-xl w-10">☀️</p>
            <div className="flex items-center space-x-4 w-32">
              <p className="font-bold">{day.high}°</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${((day.high - day.low) / 20) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">{day.low}°</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default DailyForecast;