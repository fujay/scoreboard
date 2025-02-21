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
  url: string;
  titleSelector: string;
  selectors: string;
  scraper: string;
  format: "Text" | "Screenshot";
  width: string;
  height: string;
  qrcode: boolean;
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

export type WeatherData = {
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
      url: string;
      titleSelector: string;
      selectors: string;
      scraper: string;
      format: "Text" | "Screenshot";
      width: string;
      height: string;
      qrcode: boolean;
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
      url: "",
      titleSelector: "",
      selectors: "",
      scraper: "",
      format: "Text",
      width: "",
      height: "",
      qrcode: false,
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
