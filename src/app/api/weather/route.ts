import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const LATITUDE = 41.8775;
const LONGITUDE = -88.0673;
const TIMEZONE = 'America/Chicago';

const OPEN_METEO_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=${TIMEZONE}&forecast_days=6`;

function getWeatherDescription(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code === 51 || code === 53 || code === 55) return 'Drizzle';
  if (code === 56 || code === 57) return 'Freezing drizzle';
  if (code === 61 || code === 63 || code === 65) return 'Rain';
  if (code === 66 || code === 67) return 'Freezing rain';
  if (code === 71 || code === 73 || code === 75) return 'Snow';
  if (code === 77) return 'Snow grains';
  if (code === 80 || code === 81 || code === 82) return 'Rain showers';
  if (code === 85 || code === 86) return 'Snow showers';
  if (code === 95) return 'Thunderstorm';
  if (code === 96 || code === 99) return 'Thunderstorm with hail';
  return 'Unknown';
}

function formatTime(isoString: string): string {
  // Open-Meteo returns local times like "2026-04-06T06:25" already in the requested timezone
  const match = isoString.match(/T(\d{2}):(\d{2})/);
  if (!match) return isoString;
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const ampm = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${minute} ${ampm}`;
}

function getDayName(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: TIMEZONE,
  });
}

export async function GET() {
  try {
    const response = await fetch(OPEN_METEO_URL);

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }

    const data = await response.json();

    const weather = {
      location: 'Glen Ellyn, IL',
      current: {
        temperature: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        weatherCode: data.current.weather_code,
        description: getWeatherDescription(data.current.weather_code),
        isDay: Boolean(data.current.is_day),
      },
      today: {
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        sunrise: formatTime(data.daily.sunrise[0]),
        sunset: formatTime(data.daily.sunset[0]),
        precipitationChance: data.daily.precipitation_probability_max[0],
        weatherCode: data.daily.weather_code[0],
        description: getWeatherDescription(data.daily.weather_code[0]),
      },
      forecast: data.daily.time.slice(1, 6).map((date: string, i: number) => ({
        date,
        dayName: getDayName(date),
        high: Math.round(data.daily.temperature_2m_max[i + 1]),
        low: Math.round(data.daily.temperature_2m_min[i + 1]),
        weatherCode: data.daily.weather_code[i + 1],
        description: getWeatherDescription(data.daily.weather_code[i + 1]),
        precipitationChance: data.daily.precipitation_probability_max[i + 1],
      })),
    };

    return NextResponse.json(weather, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
