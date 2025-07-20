import {
  ArrowDown,
  ArrowUp,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  MoonStar,
  QrCode,
  Sun,
  ThermometerSun,
  Wind,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { getWeatherData } from "@/lib/weather";
import { useEffect, useState } from "react";
import type { WeatherData, WeatherGraphicTypes } from "@/lib/definitions";

export default function Weather({
  location,
  qrcode,
  graphic,
  stale,
  onDataLoaded,
}: {
  location: string;
  qrcode: boolean;
  graphic: WeatherGraphicTypes;
  stale: number;
  onDataLoaded?: () => void;
}) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWeatherData(location, qrcode, graphic, stale);
        setWeatherData(data);
        setError(null);
        if (onDataLoaded) onDataLoaded();
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, onDataLoaded]);

  return (
    <main className="bg-gradient-to-b from-sky-100 to-sky-50 p-4 dark:from-slate-900 dark:to-slate-800">
      {loading ? (
        // <div className="flex flex-col items-center justify-center py-8">
        //   <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        //   <p className="mt-4 text-gray-500">Loading weather data...</p>
        // </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Weather in {location} <Skeleton className="inline-block h-8 w-8" />
          </h1>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Main Weather Card */}
            <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                  <Skeleton className="inline-block h-8 w-8" />
                </CardTitle>
                <CardDescription className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                  <Skeleton className="inline-block h-8 w-8" />
                  °C
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500">Last updated:</p>
                <Skeleton className="inline-block h-8 w-8" />
              </CardFooter>
            </Card>

            {/* Weather Feels like */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ThermometerSun className="size-8 text-orange-500" />
                  Feels Like
                </CardTitle>
              </CardHeader>
              <CardContent className="flex">
                <Skeleton className="h-8 w-8" />
                <p className="text-3xl font-semibold">°C</p>
              </CardContent>
            </Card>

            {/* Humidity */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Droplets className="size-8 text-blue-500" />
                  Humidity
                </CardTitle>
              </CardHeader>
              <CardContent className="flex">
                <Skeleton className="h-8 w-8" />
                <p className="text-3xl font-semibold">%</p>
              </CardContent>
            </Card>

            {/* Max / Min Temp */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ArrowUp className="size-8 text-red-500" />
                  <ArrowDown className="mt-4 text-blue-500" />
                  Max / <span className="mt-4">Min Temp</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Skeleton className="inline-block h-8 w-8" />
                <p className="text-3xl font-semibold">°C /</p>
                <Skeleton className="inline-block h-8 w-8" />
                <p className="mt-4 text-xl font-semibold">°C</p>
              </CardContent>
            </Card>

            {/* Wind Speed */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Wind className="size-8 text-sky-500" />
                  Wind Speed
                </CardTitle>
              </CardHeader>
              <CardContent className="flex">
                <Skeleton className="h-8 w-8" />
                <p className="text-3xl font-semibold">km/h</p>
              </CardContent>
            </Card>

            {/* QR Code */}
            {qrcode && (
              <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <QrCode className="size-8 text-sky-500" />
                    QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Skeleton className="h-32 w-32" />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : weatherData ? (
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Weather in {weatherData.cityName} ({weatherData.mainWeather})
          </h1>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Main Weather Card */}
            <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                  <WeatherIcon weather={weatherData.icon} iconSet={graphic} />
                  {weatherData.weatherDescription}
                </CardTitle>
                <CardDescription className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                  {weatherData.temperature}°C
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Last updated: {weatherData.dataTime}
                </p>
              </CardFooter>
            </Card>

            {/* Weather Feels like */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ThermometerSun className="size-8 text-orange-500" />
                  Feels Like
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">
                  {weatherData.feelsLike}°C
                </p>
              </CardContent>
            </Card>

            {/* Humidity */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Droplets className="size-8 text-blue-500" />
                  Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">
                  {weatherData.humidity}%
                </p>
              </CardContent>
            </Card>

            {/* Max / Min Temp */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ArrowUp className="size-8 text-red-500" />
                  <ArrowDown className="mt-4 text-blue-500" />
                  Max / <span className="mt-4">Min Temp</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <p className="text-3xl font-semibold">
                  {weatherData.tempMax}°C /
                </p>
                <p className="mt-4 text-xl font-semibold">
                  {weatherData.tempMin}°C
                </p>
              </CardContent>
            </Card>

            {/* Wind Speed */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Wind className="size-8 text-sky-500" />
                  Wind Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">
                  {weatherData.windSpeed} km/h
                </p>
              </CardContent>
            </Card>

            {/* QR Code */}
            {qrcode && (
              <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <QrCode className="size-8 text-sky-500" />
                    QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <QRCodeSVG
                    value={`https://openweathermap.org/city/${weatherData.cityId}`}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}

export const WeatherIcon: React.FC<{
  weather: string;
  iconSet: "Classic" | "Animated";
}> = ({ weather, iconSet }) => {
  if (iconSet === "Classic") {
    switch (weather) {
      case "11d": // Thunderstorm
        return <CloudLightning className="size-12 text-amber-500" />;

      case "09d": // Drizzle
        return <CloudDrizzle className="size-12 text-blue-400" />;

      case "10d": // Rain
        return <CloudRain className="size-12 text-blue-600" />;

      case "13d": // Snow
        return <CloudSnow className="size-12 text-cyan-500" />;

      case "50d": // Atmosphere
        return <CloudFog className="size-12 text-neutral-500" />;

      case "01d": // Clear Day
        return <Sun className="size-12 text-yellow-500" />;
      case "01n": // Clear Night
        return <MoonStar className="size-12 text-stone-500" />;

      case "02d": // few clouds
      case "02n": // few clouds
        return <CloudSun className="size-12 text-amber-500" />;

      case "03d": // scattered clouds
      case "03n": // scattered clouds
      case "04d": // broken clouds / overcast clouds
      case "04n": // broken clouds / overcast clouds
        return <Cloud className="size-12 text-gray-500" />;

      default:
        return "";
    }
  } else {
    return (
      <Image
        src={`https://openweathermap.org/img/wn/${weather}@2x.png`}
        alt={""}
        width={100}
        height={100}
      />
    );
  }
};
