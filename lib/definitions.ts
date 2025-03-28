/**
 * The file contains type defeinitions for the application.
 * It describes the shape of the data, and what data type each property should accept.
 */

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Scraper = {
  id: string;
  url: string;
  titleSelector: string;
  selectors: string;
  scraper: "Puppeteer" | "Cheerio";
  format: "Text" | "Screenshot";
  width: number;
  height: number;
  qrcode: boolean;
};

export type ScrapersTable = {
  id: string;
  scraper_data_id: string;
  url: string;
  title_selector: string;
  selectors: string;
  scraper: "Puppeteer" | "Cheerio";
  format: "Text" | "Screenshot";
  width: number;
  height: number;
  qrcode: boolean;
  created_at: string;
};

export type ScraperForm = {
  id: string;
  scraper_data_id: string;
  url: string;
  title_selector: string;
  selectors: string;
  scraper: "Puppeteer" | "Cheerio";
  format: "Text" | "Screenshot";
  width: number;
  height: number;
  qrcode: boolean;
  created_at: string;
  title: string;
  data: string;
  date: string;
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
  timestamp: number;
};

export interface Settings {
  general: {
    time: number;
    db: "None" | "Local" | "Remote";
    images: "Local" | "Remote";
    stale: number;
    date: "Clock" | "Date" | "Clock and Date" | "Clock and Date without time";
  };
  weather: {
    active: boolean;
    location: string;
    graphic: "Classic" | "Animated";
    qrcode: boolean;
  };
  scraper: [
    {
      id: string;
      scraper_data_id: string;
      url: string;
      titleSelector: string;
      selectors: string;
      scraper: "Puppeteer" | "Cheerio";
      format: "Text" | "Screenshot";
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
  },
  weather: {
    active: true,
    location: "Frankfurt",
    graphic: "Classic",
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
