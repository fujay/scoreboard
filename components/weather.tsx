import { WeatherData } from "@/lib/definitions";
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  QrCode,
  Sun,
  ThermometerSun,
  Wind,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertKelvinToCelsios } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

export default async function Weather() {
  const city = "Frankfurt am Main";
  // const weatherData = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
  // );
  // const weather: WeatherData = await weatherData.json();
  const weather = {
    coord: { lon: 8.6833, lat: 50.1167 },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04n",
      },
    ],
    base: "stations",
    main: {
      temp: 279.51,
      feels_like: 278.04,
      temp_min: 277.51,
      temp_max: 280.91,
      pressure: 1019,
      humidity: 88,
      sea_level: 1019,
      grnd_level: 1001,
    },
    visibility: 9000,
    wind: { speed: 2.06, deg: 70 },
    clouds: { all: 100 },
    dt: 1740191829,
    sys: {
      type: 2,
      id: 2081434,
      country: "DE",
      sunrise: 1740205378,
      sunset: 1740243293,
    },
    timezone: 3600,
    id: 2925533,
    name: "Frankfurt am Main",
    cod: 200,
  };
  console.log(weather);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Weather in {weather.name} ({weather.weather[0].main})
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Main Weather Card */}
          <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <Sun className="size-12 text-yellow-500" />
                {weather.weather[0].description}
              </CardTitle>
              <CardDescription className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                {convertKelvinToCelsios(weather.main.temp)}°C
              </CardDescription>
            </CardHeader>
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
                {convertKelvinToCelsios(weather.main.feels_like)}°C
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
              <p className="text-3xl font-semibold">{weather.main.humidity}%</p>
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
              <p className="text-3xl font-semibold">
                {convertKelvinToCelsios(weather.main.temp_max)}°C /
              </p>
              <p className="mt-4 text-xl font-semibold">
                {convertKelvinToCelsios(weather.main.temp_min)}°C
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
                {Math.round(weather.wind.speed * 3.6)} km/h
              </p>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <QrCode className="size-8 text-sky-500" />
                QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <QRCodeSVG
                value={`https://openweathermap.org/city/${weather.id}`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
