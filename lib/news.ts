"use server";

import { fetchNews } from "./data";
import type { NewsData } from "./definitions";

export async function getNewsData(): Promise<NewsData[]> {
  const newsData = await fetchNews();

  if (!newsData) {
    throw new Error("Failed to fetch news data");
  }

  return newsData;
}
