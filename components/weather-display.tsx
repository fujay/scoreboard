import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { WeatherData, WeatherGraphicTypes } from "@/lib/definitions";
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
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import ReactAnimatedWeather from "react-animated-weather";
import { WeatherState, WeatherSvg } from "weather-icons-animated";

export default function WeatherDisplay({ data }: { data: WeatherData }) {
  return (
    <main className="bg-gradient-to-b from-sky-100 to-sky-50 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Weather in {data.cityName} ({data.mainWeather})
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Main Weather Card */}
          <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <WeatherIcon weather={data.icon} iconSet={data.graphic} />
                {data.weatherDescription}
              </CardTitle>
              <CardDescription className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                {data.temperature}°C
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Last updated: {data.dataTime}
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
              <p className="text-3xl font-semibold">{data.feelsLike}°C</p>
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
              <p className="text-3xl font-semibold">{data.humidity}%</p>
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
              <p className="text-3xl font-semibold">{data.tempMax}°C /</p>
              <p className="mt-4 text-xl font-semibold">{data.tempMin}°C</p>
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
              <p className="text-3xl font-semibold">{data.windSpeed} km/h</p>
            </CardContent>
          </Card>

          {/* QR Code */}
          {data.qrcode && (
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <QrCode className="size-8 text-sky-500" />
                  QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <QRCodeSVG
                  value={`https://openweathermap.org/city/${data.cityId}`}
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
  iconSet: WeatherGraphicTypes;
}> = ({ weather, iconSet }) => {
  if (iconSet === "Lucide Icons") {
    switch (weather) {
      case "11d": // Thunderstorm
        return <CloudLightning className="size-16 text-amber-500" />;

      case "09d": // Drizzle
        return <CloudDrizzle className="size-16 text-blue-400" />;

      case "10d": // Rain
        return <CloudRain className="size-16 text-blue-600" />;

      case "13d": // Snow
        return <CloudSnow className="size-16 text-cyan-500" />;

      case "50d": // Atmosphere
        return <CloudFog className="size-16 text-neutral-500" />;

      case "01d": // Clear Day
        return <Sun className="size-16 text-yellow-500" />;
      case "01n": // Clear Night
        return <MoonStar className="size-16 text-stone-500" />;

      case "02d": // few clouds
      case "02n": // few clouds
        return <CloudSun className="size-16 text-amber-500" />;

      case "03d": // scattered clouds
      case "03n": // scattered clouds
      case "04d": // broken clouds / overcast clouds
      case "04n": // broken clouds / overcast clouds
        return <Cloud className="size-16 text-gray-500" />;

      default:
        return "";
    }
  } else if (iconSet === "3D") {
    const codeMapping: { [key: string]: WeatherState } = {
      "01d": "sunny",
      "01n": "clear-night",
      "02d": "partlycloudy",
      "02n": "partlycloudy",
      "03d": "partlycloudy",
      "03n": "partlycloudy",
      "04d": "cloudy",
      "04n": "cloudy",
      "09d": "rainy",
      "09n": "rainy",
      "10d": "pouring",
      "10n": "pouring",
      "11d": "lightning",
      "11n": "lightning",
      "13d": "snowy",
      "13n": "snowy",
      "50d": "fog",
      "50n": "fog",
    } as const;
    return <WeatherSvg state={codeMapping[weather]} width={100} height={100} />;
  } else if (iconSet === "Animated") {
    const codeMapping = {
      "01d": { icon: "CLEAR_DAY", color: "#FFD700" }, // Sunny
      "01n": { icon: "CLEAR_NIGHT", color: "#A3A3A3" }, // Clear night
      "02d": { icon: "PARTLY_CLOUDY_DAY", color: "#FFE066" },
      "02n": { icon: "PARTLY_CLOUDY_NIGHT", color: "#B0B0B0" },
      "03d": { icon: "PARTLY_CLOUDY_DAY", color: "#B0C4DE" },
      "03n": { icon: "PARTLY_CLOUDY_NIGHT", color: "#B0C4DE" },
      "04d": { icon: "CLOUDY", color: "#A0AEC0" },
      "04n": { icon: "CLOUDY", color: "#A0AEC0" },
      "09d": { icon: "RAIN", color: "#60A5FA" },
      "09n": { icon: "RAIN", color: "#60A5FA" },
      "10d": { icon: "RAIN", color: "#2563EB" },
      "10n": { icon: "RAIN", color: "#2563EB" },
      "11d": { icon: "RAIN", color: "#F59E42" }, // Thunderstorm
      "11n": { icon: "RAIN", color: "#F59E42" },
      "13d": { icon: "SNOW", color: "#A7F3D0" },
      "13n": { icon: "SNOW", color: "#A7F3D0" },
      "50d": { icon: "FOG", color: "#CBD5E1" },
      "50n": { icon: "FOG", color: "#CBD5E1" },
    } as const;
    type WeatherCode = keyof typeof codeMapping;
    const weatherMapping = codeMapping[weather as WeatherCode];
    return (
      <ReactAnimatedWeather
        icon={weatherMapping.icon}
        color={weatherMapping.color}
        animate={true}
      />
    );
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
