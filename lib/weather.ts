"use server";

import type { OpenWeatherData, WeatherData } from "./definitions";
import { readConfig } from "./config";

const settings = await readConfig();

const staleTime = settings.general.stale || 60;

/**
 * Fetches current weather data for a given location using the OpenWeatherMap API.
 *
 * @param location - The name of the city or location to fetch weather data for.
 * @returns A promise that resolves to a `WeatherData` object containing weather information for the specified location.
 * @throws Will throw an error if the OpenWeatherMap API key is not configured, if the fetch request fails, or if the response is not OK.
 */
export async function getWeatherData(location: string) {
  try {
    if (!process.env.OPENWEATHERMAP_API_KEY) {
      throw new Error("OpenWeather API key is not configured");
    }

    console.log(`Fetching weather data for ${location}`);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`,
      { cache: "force-cache", next: { revalidate: staleTime * 60 } },
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
      dataTime: new Date(data.dt * 1000).toLocaleTimeString(),
      qrcode: settings.weather.qrcode,
      graphic: settings.weather.graphic,
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}
