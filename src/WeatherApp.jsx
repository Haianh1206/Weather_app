import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'fb34885677c6a1cbe98bdf5b968af0a5';

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=vi&appid=${apiKey}`
      );
      if (!res.ok) throw new Error('Không tìm thấy thành phố');
      const data = await res.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>🌤 Ứng dụng thời tiết</h1>
      <input
        type="text"
        placeholder="Nhập tên thành phố (vd : Hanoi,..)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Xem thời tiết</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>
            <strong>Nhiệt độ:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Trạng thái:</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Độ ẩm:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Gió:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
