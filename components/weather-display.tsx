"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { WeatherData } from "@/lib/definitions";
import { getWeatherData } from "@/lib/weather";
import { ProgressBar } from "@/ui/progress-bar";
import { AnimatePresence, motion } from "framer-motion";
import { Cloud, CloudRain, CloudSnow, Droplets, Sun, Wind } from "lucide-react";
import { useEffect, useState } from "react";

const cities = [{ name: "Frankfurt am Main" }, { name: "Maintal" }];

export default function WeatherDisplay({ interval }: { interval: number }) {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const currentCity = cities[currentCityIndex];

  const transitionIntervalMs = interval * 1000;
  const progressUpdateInterval = transitionIntervalMs / 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWeatherData(currentCity.name);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    setProgress(0);

    // Set up progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, progressUpdateInterval);

    // Set up interval to switch slide every interval
    const intervalId = setInterval(() => {
      setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, transitionIntervalMs);

    return () => {
      clearInterval(intervalId);
      clearInterval(progressInterval);
    };
  }, [currentCityIndex, progressUpdateInterval, transitionIntervalMs]);

  const getWeatherIcon = (weatherCode: string) => {
    const code = weatherCode.toLowerCase();
    if (code.includes("clear"))
      return <Sun className="h-12 w-12 text-yellow-400" />;
    if (code.includes("cloud"))
      return <Cloud className="h-12 w-12 text-gray-400" />;
    if (code.includes("rain"))
      return <CloudRain className="h-12 w-12 text-blue-400" />;
    if (code.includes("snow"))
      return <CloudSnow className="h-12 w-12 text-blue-200" />;
    if (code.includes("drizzle"))
      return <Droplets className="h-12 w-12 text-blue-300" />;
    return <Wind className="h-12 w-12 text-gray-500" />;
  };

  const secondsRemaining = Math.ceil(((100 - progress) * interval) / 100);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentCity.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-500">Loading weather data...</p>
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : weatherData ? (
              <div className="flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {weatherData.cityName}
                    </h2>
                    <p className="text-gray-500">{weatherData.cityId}</p>
                  </div>
                  {getWeatherIcon(weatherData.mainWeather)}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-2xl font-bold">
                      {Math.round(weatherData.temperature)}°C
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-gray-500">Feels Like</p>
                    <p className="text-2xl font-bold">
                      {Math.round(weatherData.feelsLike)}°C
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-2xl font-bold">
                      {weatherData.humidity}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="text-2xl font-bold">
                      {weatherData.windSpeed} m/s
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(weatherData.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ) : null}
            {weatherData && (
              <div className="mt-6">
                <p className="mb-1 text-xs text-gray-500">
                  Next slide in {secondsRemaining} seconds
                </p>
                <ProgressBar progress={progress} />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
