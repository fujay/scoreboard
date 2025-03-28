"use server";
import type { OpenWeatherData, Settings, WeatherData } from "./definitions";
import { readKeyConfig } from "./config";

// Cache structure to store weather data with timestamps
interface CacheWeatherItem {
  data: WeatherData;
  timestamp: number;
}

const settings: Settings["general"] = await readKeyConfig("general");
const staleTime = settings.stale || 60;

// In-memory cache
const cache: Record<string, CacheWeatherItem> = {};

// Cache duration in milliseconds (minutes -> seconds -> milliseconds)
const CACHE_DURATION = staleTime * 60 * 1000;

/**
 * Fetches weather data for a specified location.
 * Implements caching to reduce API calls
 * @param location - The location for which to fetch weather data (city name or coordinates).
 * @returns An object containing weather data for the specified location.
 */
export async function getWeatherData(location: string) {
  const cacheKey = location.toLowerCase();
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    console.log(`Using cached weather data for ${location}`);
    return cache[cacheKey].data;
  }

  if (!process.env.OPENWEATHERMAP_API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  console.log(`Fetching weather data for ${location}`);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`,
      { next: { revalidate: CACHE_DURATION / 1000 } },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch weather data: ${response.status}: ${response.statusText}`,
      );
    }

    const data: OpenWeatherData = await response.json();

    const weatherData: WeatherData = {
      cityName: data.name,
      cityId: data.id,
      mainWeather: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      icon: data.weather[0].icon,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      tempMax: Math.round(data.main.temp_max),
      tempMin: Math.round(data.main.temp_min),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      timestamp: now,
    };

    // Update cache
    cache[cacheKey] = {
      data: weatherData,
      timestamp: now,
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}
