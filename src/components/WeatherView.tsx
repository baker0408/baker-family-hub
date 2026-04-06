"use client";

import { useState, useEffect } from "react";

interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  isDay: boolean;
}

interface TodayWeather {
  high: number;
  low: number;
  sunrise: string;
  sunset: string;
  precipitationChance: number;
  weatherCode: number;
  description: string;
}

interface ForecastDay {
  date: string;
  dayName: string;
  high: number;
  low: number;
  weatherCode: number;
  description: string;
  precipitationChance: number;
}

interface WeatherData {
  location: string;
  current: CurrentWeather;
  today: TodayWeather;
  forecast: ForecastDay[];
}

function getWeatherEmoji(code: number, isDay = true): string {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code === 1) return "🌤️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 55) return "🌦️";
  if (code === 56 || code === 57) return "🥶🌧️";
  if (code >= 61 && code <= 65) return "🌧️";
  if (code === 66 || code === 67) return "🥶🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code === 85 || code === 86) return "❄️";
  if (code === 95 || code === 96 || code === 99) return "⛈️";
  return "🌤️";
}

export default function WeatherView() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchWeather() {
    try {
      setError(null);
      const res = await fetch("/api/weather");
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch {
      setError("Could not load weather data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
        <p className="mt-3 text-sm text-text-secondary">Loading weather...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-bg">
        <span className="text-6xl">🌤️</span>
        <p className="mt-4 text-lg text-text-primary">{error || "Something went wrong"}</p>
        <button
          onClick={() => {
            setLoading(true);
            fetchWeather();
          }}
          className="mt-4 rounded-xl bg-accent px-6 py-2 text-white transition-opacity hover:opacity-80"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { current, today, forecast } = weather;

  return (
    <div className="h-full w-full overflow-y-auto bg-bg p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Hero: Current Conditions */}
        <div className="flex flex-col items-center py-6 text-center">
          <span className="text-8xl leading-none">
            {getWeatherEmoji(current.weatherCode, current.isDay)}
          </span>
          <p className="mt-4 text-6xl font-bold text-text-primary">
            {Math.round(current.temperature)}°
          </p>
          <p className="mt-2 text-xl capitalize text-text-primary">
            {current.description}
          </p>
          <p className="mt-1 text-base text-text-secondary">
            Feels like {Math.round(current.feelsLike)}°
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {weather.location}
          </p>
        </div>

        {/* Today's Details */}
        <div className="rounded-2xl border border-accent/20 bg-sidebar p-4">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">🌡️</span>
              <span className="text-xs text-text-secondary">Hi / Lo</span>
              <span className="text-sm font-semibold text-text-primary">
                {Math.round(today.high)}° / {Math.round(today.low)}°
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">💧</span>
              <span className="text-xs text-text-secondary">Humidity</span>
              <span className="text-sm font-semibold text-text-primary">
                {current.humidity}%
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">💨</span>
              <span className="text-xs text-text-secondary">Wind</span>
              <span className="text-sm font-semibold text-text-primary">
                {Math.round(current.windSpeed)} mph
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">🌧️</span>
              <span className="text-xs text-text-secondary">Rain</span>
              <span className="text-sm font-semibold text-text-primary">
                {today.precipitationChance}%
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">🌅</span>
              <span className="text-xs text-text-secondary">Sunrise</span>
              <span className="text-sm font-semibold text-text-primary">
                {today.sunrise}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">🌇</span>
              <span className="text-xs text-text-secondary">Sunset</span>
              <span className="text-sm font-semibold text-text-primary">
                {today.sunset}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-text-primary">
            Next 5 Days
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {forecast.slice(0, 5).map((day) => (
              <div
                key={day.date}
                className="flex min-w-[110px] flex-1 flex-col items-center gap-2 rounded-xl border border-accent/20 bg-sidebar-active p-3"
              >
                <span className="text-sm font-semibold text-text-primary">
                  {day.dayName}
                </span>
                <span className="text-3xl leading-none">
                  {getWeatherEmoji(day.weatherCode)}
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  {Math.round(day.high)}° / {Math.round(day.low)}°
                </span>
                {day.precipitationChance > 0 && (
                  <span className="text-xs text-text-secondary">
                    🌧️ {day.precipitationChance}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
