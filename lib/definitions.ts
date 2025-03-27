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

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
