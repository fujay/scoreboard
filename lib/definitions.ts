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
      selector: string;
      scraper: string;
      format: "Text" | "Screenshot";
      width: string;
      height: string;
      qrcode: boolean;
    }
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
      selector: "",
      scraper: "",
      format: "Text",
      width: "",
      height: "",
      qrcode: false,
    },
  ],
};
