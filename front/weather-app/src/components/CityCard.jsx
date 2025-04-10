// src/components/CityCard.jsx
const CityCard = ({ city }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{city.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{city.condition}</p>
            </div>
            <p className="text-3xl font-bold">{city.temp}°</p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">H: {city.temp + 5}° L: {city.temp - 5}°</span>
            <div className="text-4xl">
              {city.condition === 'Sunny' && '☀️'}
              {city.condition === 'Partly Cloudy' && '⛅'}
              {city.condition === 'Rainy' && '🌧️'}
              {city.condition === 'Clear' && '🌤️'}
              {city.condition === 'Humid' && '🌫️'}
              {city.condition === 'Thunderstorms' && '⛈️'}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CityCard; // Make sure to include this default export