import { readKeyConfig } from "@/lib/config";
import { OpenWeatherData, Settings, WeatherData } from "@/lib/definitions";
import { NextResponse } from "next/server";

const staleSettings: Settings["general"] = await readKeyConfig("general");
const { location } = await readKeyConfig("weather");
const CACHE_DURATION = (staleSettings.stale || 60) * 60;

export async function GET() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`,
      { cache: "force-cache", next: { revalidate: CACHE_DURATION } },
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
      timestamp: data.dt,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
