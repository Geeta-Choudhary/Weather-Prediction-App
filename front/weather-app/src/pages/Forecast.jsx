import { useState, useEffect } from 'react';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import WeatherChart from '../components/WeatherChart';

const Forecast = () => {
  const [city, setCity] = useState('Haveli');
  const [currentWeather, setCurrentWeather] = useState({
    temp: 30,
    humidity: 24,
    pressure: 1011,
    wind: 1,
    uvIndex: 3,
    condition: 'Sunny',
    feelsLike: 33,
    visibility: 10,
    dewPoint: 6,
  });
  const [hourlyData, setHourlyData] = useState([
    { time: '8 AM', temp: 25, condition: 'Clear' },
    { time: 'Now', temp: 29, condition: 'Sunny' },
    { time: '12 PM', temp: 35, condition: 'Sunny' },
    { time: '2 PM', temp: 36, condition: 'Sunny' },
    { time: '4 PM', temp: 37, condition: 'Sunny' },
    { time: '6 PM', temp: 37, condition: 'Partly Cloudy' },
    { time: '8 PM', temp: 31, condition: 'Partly Cloudy' },
    { time: '10 PM', temp: 27, condition: 'Clear' },
    { time: '12 AM', temp: 25, condition: 'Clear' },
    { time: '2 AM', temp: 23, condition: 'Clear' },
    { time: '4 AM', temp: 22, condition: 'Clear' },
    { time: '6 AM', temp: 20, condition: 'Clear' },
  ]);
  const [dailyData, setDailyData] = useState([
    { day: 'Today', high: 37, low: 19, condition: 'Sunny' },
    { day: 'Mon', high: 37, low: 20, condition: 'Partly Cloudy' },
    { day: 'Tue', high: 38, low: 20, condition: 'Partly Cloudy' },
    { day: 'Wed', high: 38, low: 21, condition: 'Sunny' },
    { day: 'Thu', high: 39, low: 21, condition: 'Sunny' },
    { day: 'Fri', high: 37, low: 21, condition: 'Clear' },
    { day: 'Sat', high: 36, low: 20, condition: 'Clear' },
  ]);
  const [cities, setCities] = useState([
    'Haveli', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'
  ]);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    // Mock prediction
    const conditions = ['Rainy', 'Sunny', 'Cloudy', 'Thunderstorm', 'Foggy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomConfidence = (Math.random() * 30 + 70).toFixed(1);
    
    setPrediction({
      condition: randomCondition,
      confidence: randomConfidence,
      message: `Our AI model predicts ${randomCondition} conditions with ${randomConfidence}% confidence`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Weather Forecast</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 flex-grow"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={handlePredict}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Predict with ML
          </button>
        </div>
      </div>

      {prediction && (
        <div className="bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
          <h3 className="font-bold text-lg mb-2">AI Prediction Result</h3>
          <p>
            <span className="font-semibold">Condition:</span> {prediction.condition}<br />
            <span className="font-semibold">Confidence:</span> {prediction.confidence}%<br />
            {prediction.message}
          </p>
        </div>
      )}

      {/* Current Weather */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Current Weather in {city}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-5xl font-bold">{currentWeather.temp}°C</p>
            <p className="text-lg">{currentWeather.condition}</p>
            <p>Feels like {currentWeather.feelsLike}°C</p>
          </div>
          <div>
            <p><span className="font-semibold">Humidity:</span> {currentWeather.humidity}%</p>
            <p><span className="font-semibold">Pressure:</span> {currentWeather.pressure} mb</p>
            <p><span className="font-semibold">UV Index:</span> {currentWeather.uvIndex}</p>
          </div>
          <div>
            <p><span className="font-semibold">Wind:</span> {currentWeather.wind} km/h</p>
            <p><span className="font-semibold">Visibility:</span> {currentWeather.visibility} km</p>
            <p><span className="font-semibold">Dew Point:</span> {currentWeather.dewPoint}°C</p>
          </div>
          <div className="flex items-center justify-center">
            {/* Weather icon would go here */}
            <div className="text-8xl">☀️</div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Hourly Forecast</h2>
        <HourlyForecast data={hourlyData} />
      </div>

      {/* 7-Day Forecast */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
        <DailyForecast data={dailyData} />
      </div>

      {/* Weather Charts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Temperature Trends</h2>
        <WeatherChart data={hourlyData} />
      </div>
    </div>
  );
};

export default Forecast;