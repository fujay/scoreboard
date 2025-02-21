import { WeatherData } from "@/lib/definitions";
import { Droplets, Sun, ThermometerSun, Wind } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertKelvinToCelsios } from "@/lib/utils";

export default async function Weather() {
  const city = "Frankfurt am Main";
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
  );
  const weather: WeatherData = await weatherData.json();

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
                <Sun className="size-8 text-yellow-500" />
                {weather.weather[0].description}
              </CardTitle>
              <CardDescription className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                {convertKelvinToCelsios(weather.main.temp)}°C
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Weather Details */}
          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThermometerSun className="text-orange-500" />
                Feels Like
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {convertKelvinToCelsios(weather.main.feels_like)}°C
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="text-blue-500" />
                Humidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{weather.main.humidity}%</p>
            </CardContent>
          </Card>

          <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="text-sky-500" />
                Wind Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {weather.wind.speed} km/h
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
