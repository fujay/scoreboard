/**
 * The file contains type defeinitions for the application.
 * It describes the shape of the data, and what data type each property should accept.
 */

import {
  AlarmClock,
  Bell,
  CircleAlert,
  CircleHelp,
  Info,
  LucideIcon,
  Megaphone,
  TriangleAlert,
} from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ContentType = {
  type: string;
  data: WeatherData | ScraperData | SocialMediaData;
};

export type NewsData = {
  id: string;
  title: string;
  content: string;
  show_until: string;
  icon: NewsIcons;
};

export type NewsIcons =
  | "alarm-clock"
  | "bell"
  | "circle-alert"
  | "circle-help"
  | "info"
  | "megaphone"
  | "triangle-alert";

export const NewsIconsMapping: { name: NewsIcons; icon: LucideIcon }[] = [
  { name: "alarm-clock", icon: AlarmClock },
  { name: "bell", icon: Bell },
  { name: "circle-alert", icon: CircleAlert },
  { name: "circle-help", icon: CircleHelp },
  { name: "info", icon: Info },
  { name: "megaphone", icon: Megaphone },
  { name: "triangle-alert", icon: TriangleAlert },
];

export type Scraper = {
  id: string;
  url: string;
  title_selector: string;
  selectors: string;
  scraper: ScraperTypes;
  format: ScraperFormats;
  width: number;
  height: number;
  qrcode: boolean;
};

export type ScraperDataAction =
  | {
      title: string;
      data:
        | string
        | Uint8Array<ArrayBufferLike>
        | undefined
        | (string | undefined)[];
      url: string;
      format: ScraperFormats;
      qrcode: boolean;
      date: string;
    }
  | undefined;

export type ScraperData = {
  title: string;
  data: string;
  url: string;
  format: ScraperFormats;
  qrcode: boolean;
  date: string;
};

export type ScraperForm = {
  id: string;
  scraper_data_id: string;
  url: string;
  title_selector: string;
  selectors: string;
  scraper: ScraperTypes;
  format: ScraperFormats;
  width: number;
  height: number;
  qrcode: boolean;
  created_at: string;
  title: string;
  data: string;
  date: string;
};

export type SocialMediaData = {
  id: string;
  title: string;
  platform: SocialMediaTypes;
  url: string;
  qrcode: boolean;
  show_until: string;
};

export type Tweet = {
  id: string;
  tweetId: string;
};

export type TweetTable = {
  id: string;
  tweetId: string;
  text: string;
  createdAt: string;
  name: string;
  screenName: string;
  showUntil: string;
};

/**
 * Represents the response data structure from the OpenWeather API for current weather information.
 *
 * @property coord - Geographic coordinates of the location.
 * @property weather - Array of weather condition objects.
 * @property base - Internal parameter used by the API.
 * @property main - Main weather metrics such as temperature, pressure, and humidity.
 * @property visibility - Visibility in meters.
 * @property wind - Wind speed and direction.
 * @property clouds - Cloudiness percentage.
 * @property dt - Time of data calculation (Unix, UTC).
 * @property sys - Additional system data such as country, sunrise, and sunset times.
 * @property timezone - Shift in seconds from UTC.
 * @property id - City ID.
 * @property name - City name.
 * @property cod - Internal parameter used by the API.
 * @see https://openweathermap.org/current for more details.
 */
export type OpenWeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

/**
 * Represents weather data for a specific city.
 *
 * @property cityName - The name of the city.
 * @property cityId - The unique identifier for the city.
 * @property mainWeather - The main weather condition (e.g., "Clear", "Rain").
 * @property weatherDescription - A detailed description of the weather.
 * @property icon - The icon code representing the weather condition.
 * @property temperature - The current temperature in degrees Celsius.
 * @property feelsLike - The perceived temperature in degrees Celsius.
 * @property tempMax - The maximum temperature recorded.
 * @property tempMin - The minimum temperature recorded.
 * @property humidity - The humidity percentage.
 * @property windSpeed - The wind speed in meters per second.
 * @property dataTime - The timestamp of the weather data (in UNIX format).
 * @property qrcode - Indicates if a QR code is associated with the data.
 * @property graphic - The type of graphic representation ("Classic" or "Animated").
 */
export type WeatherData = {
  cityName: string;
  cityId: number;
  mainWeather: string;
  weatherDescription: string;
  icon: string;
  temperature: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  dataTime: string;
  qrcode: boolean;
  graphic: WeatherGraphicTypes;
};

export type ScraperTypes = "Puppeteer" | "Cheerio";
export type ScraperFormats = "Text" | "Screenshot";

export type DbTypes = "None" | "Local" | "Remote";

export type ImagesTypes = "Local" | "Remote";

export type FetchingTypes = "Nextjs" | "SWR" | "Query";

export type DateTypes =
  | "Clock"
  | "Date"
  | "Clock and Date"
  | "Clock and Date without time";

export type NewsType = "carousel" | "infinite";

export type ProgressbarTypes =
  | "None"
  | "ProgressBar"
  | "Countdown"
  | "ProgressBar and Countdown";

export type WeatherGraphicTypes = "OpenWeatherMap" | "Lucide Icons" | "3D";

export type SocialMediaTypes =
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Pinterest"
  | "TikTok"
  | "Tweet"
  | "X"
  | "YouTube";

export interface Settings {
  general: {
    time: number;
    db: DbTypes;
    images: ImagesTypes;
    stale: number;
    fetching: FetchingTypes;
    date: DateTypes;
    news: NewsType;
    progressbar: ProgressbarTypes;
  };
  weather: {
    active: boolean;
    location: string;
    graphic: WeatherGraphicTypes;
    qrcode: boolean;
  };
  scraper: [
    {
      id: string;
      scraper_data_id: string;
      url: string;
      titleSelector: string;
      selectors: string;
      scraper: ScraperTypes;
      format: ScraperFormats;
      width: number;
      height: number;
      qrcode: boolean;
      createdAt: string;
      title: string;
      data: string;
      date: string;
    },
  ];
}

export const DEFAULT_SETTINGS: Settings = {
  general: {
    time: 10000,
    db: "Local",
    images: "Local",
    stale: 3600,
    date: "Clock",
    fetching: "Nextjs",
    news: "carousel",
    progressbar: "ProgressBar and Countdown",
  },
  weather: {
    active: true,
    location: "Frankfurt",
    graphic: "OpenWeatherMap",
    qrcode: false,
  },
  scraper: [
    {
      id: "",
      scraper_data_id: "",
      url: "",
      titleSelector: "",
      selectors: "",
      scraper: "Puppeteer",
      format: "Text",
      width: 0,
      height: 0,
      qrcode: false,
      createdAt: new Date().toISOString(),
      title: "",
      data: "",
      date: new Date().toISOString(),
    },
  ],
};
