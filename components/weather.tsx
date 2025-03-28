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

export default async function Weather({
  location,
  qrcode,
  graphic,
}: {
  location: string;
  qrcode: boolean;
  graphic: "Classic" | "Animated";
}) {
  const weather = await getWeatherData(location);
  // const weather = {
  //   coord: { lon: 8.6833, lat: 50.1167 },
  //   mainWeather: "Clouds",
  //   weatherDescription: "overcast clouds",
  //   icon: "04d",
  //   base: "stations",
  //   temperature: 279.51,
  //   feelsLike: 278.04,
  //   tempMin: 277.51,
  //   tempMax: 280.91,
  //   pressure: 1019,
  //   humidity: 88,
  //   sea_level: 1019,
  //   grnd_level: 1001,
  //   visibility: 9000,
  //   windSpeed: 2.06,
  //   clouds: { all: 100 },
  //   dt: 1740191829,
  //   type: 2,
  //   country: "DE",
  //   sunrise: 1740205378,
  //   sunset: 1740243293,
  //   timezone: 3600,
  //   cityId: 2925533,
  //   cityName: location, // "Frankfurt am Main",
  //   cod: 200,
  // };

  return (
    <main className="bg-gradient-to-b from-sky-100 to-sky-50 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Weather in {weather.cityName} ({weather.mainWeather})
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Main Weather Card */}
          <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <WeatherIcon weather={weather.icon} iconSet={graphic} />
                {weather.weatherDescription}
              </CardTitle>
              <CardDescription className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                {weather.temperature}°C
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(weather.timestamp).toLocaleTimeString()}
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
              <p className="text-3xl font-semibold">{weather.feelsLike}°C</p>
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
              <p className="text-3xl font-semibold">{weather.humidity}%</p>
            </CardContent>
          </Card>

          {/*
          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ArrowUp className="size-8 text-red-500" />
                Max Temp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">
                {convertKelvinToCelsios(weather.main.temp_max)}°C
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ArrowDown className="size-8 text-blue-500" />
                Min Temp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">
                {convertKelvinToCelsios(weather.main.temp_min)}°C
              </p>
            </CardContent>
          </Card> */}

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
              <p className="text-3xl font-semibold">{weather.tempMax}°C /</p>
              <p className="mt-4 text-xl font-semibold">{weather.tempMin}°C</p>
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
              <p className="text-3xl font-semibold">{weather.windSpeed} km/h</p>
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
                  value={`https://openweathermap.org/city/${weather.cityId}`}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
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
