import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "59b118663aed46e684e111552243008";

  const handleOnChange = (e) => {
    setCity(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${weatherData ? 'bg-gray-100' : 'bg-gray-200'}`}>
      <form onSubmit={handleOnSubmit} className={`bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-md shadow-inner`}>
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Weather Search</h1>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
          value={city}
          onChange={handleOnChange}
          placeholder="City name here"
        />
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 text-white"
        >
          Search
        </button>
      </form>

      <div className="w-full max-w-4xl">
        {loading && <p className="text-center text-gray-500">Loading Weather Data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {weatherData && !loading && (
          <div className="bg-white shadow-lg rounded-lg p-6 shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Weather Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Card for Temperature */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center inset-shadow">
                <h3 className="text-lg font-semibold text-gray-800">Temperature</h3>
                <p className="mt-4 text-2xl font-bold text-gray-800">{weatherData.current.temp_c}°C</p>
              </div>

              {/* Card for Condition */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center inset-shadow">
                <h3 className="text-lg font-semibold text-gray-800">Condition</h3>
                <div className="flex items-center mt-4">
                  <img
                    src={`https:${weatherData.current.condition.icon}`}
                    alt={weatherData.current.condition.text}
                    className="w-16 h-16"
                  />
                  <p className="ml-4 text-lg text-gray-800">{weatherData.current.condition.text}</p>
                </div>
              </div>

              {/* Card for Humidity */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center inset-shadow">
                <h3 className="text-lg font-semibold text-gray-800">Humidity</h3>
                <p className="text-xl font-bold text-gray-800">{weatherData.current.humidity}%</p>
              </div>

              {/* Card for Wind */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center inset-shadow">
                <h3 className="text-lg font-semibold text-gray-800">Wind</h3>
                <p className="text-lg text-gray-800">{weatherData.current.wind_kph} kph {weatherData.current.wind_dir}</p>
              </div>

              {/* Card for Pressure */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center inset-shadow">
                <h3 className="text-lg font-semibold text-gray-800">Pressure</h3>
                <p className="text-lg text-gray-800">{weatherData.current.pressure_mb} mb</p>
              </div>

              {/* Card for Visibility */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center inset-shadow">
                <h3 className="text-lg font-semibold text-gray-800">Visibility</h3>
                <p className="text-lg text-gray-800">{weatherData.current.vis_km} km</p>
              </div>

              {/* Card for Precipitation */}
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center inset-shadow">
                <h3 className="text-lg font-semibold text-gray-800">Precipitation</h3>
                <p className="text-lg text-gray-800">{weatherData.current.precip_mm} mm</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
