const HourlyForecast = ({ data }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {data.map((hour, index) => (
            <div key={index} className="flex flex-col items-center p-2 min-w-[70px]">
              <p className="font-semibold">{hour.time}</p>
              <p className="text-2xl my-2">☀️</p>
              <p className="font-bold">{hour.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HourlyForecast;