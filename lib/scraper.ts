"use server";

import {
  scrapeScreenshot,
  scrapeViaCheerio,
  scrapeViaPuppeteer,
} from "./actions";
import { readKeyConfig } from "./config";
import { fetchScrapers, fetchScrapersData } from "./data";
import type { ScraperData, ScraperDataAction, Settings } from "./definitions";

interface CacheScraperDataItem {
  data: ScraperData[];
  timestamp: number;
}

const settings: Settings["general"] = await readKeyConfig("general");
const staleTime = settings.stale || 60;
const isNoCache = settings.db === "None";

// In-memory cache
const cache: Record<string, CacheScraperDataItem> = {};

// Cache duration in milliseconds (minutes -> seconds -> milliseconds)
const CACHE_DURATION = staleTime * 60 * 1000;

/**
 * Fetches scraper data based on the caching mechanism and scraper configurations.
 *
 * If caching is disabled (`isNoCache` is true), it fetches the list of scrapers and processes
 * each scraper based on its format and scraper type. The supported formats are:
 * - "Screenshot": Uses `scrapeScreenshot` to fetch screenshot data.
 * - "Text": Uses either `scrapeViaCheerio` or `scrapeViaPuppeteer` based on the scraper type.
 *
 * If caching is enabled, it checks the cache for existing data. If the cache is valid
 * (not expired), it returns the cached data. Otherwise, it fetches new scraper data,
 * updates the cache, and returns the new data.
 *
 * @returns {Promise<ScraperData[]>} A promise that resolves to an array of scraper data objects.
 * @throws {Error} If no scraper data is found in the database when fetching new data.
 */
export async function getScraperData(): Promise<ScraperData[]> {
  if (isNoCache) {
    const scrapersList = await fetchScrapers();
    const scraperData: ScraperDataAction[] = await Promise.all(
      scrapersList.map(async (scraper) => {
        if (scraper.format === "Screenshot") {
          const data = await scrapeScreenshot(
            scraper.url,
            scraper.title_selector,
            scraper.selectors,
            scraper.width,
            scraper.height,
          );
          const base64Image = Buffer.from(data.screenshot ?? "").toString(
            "base64",
          );
          return {
            title: data.title,
            data: `data:image/png;base64,${base64Image}`,
            url: scraper.url,
            format: scraper.format,
            qrcode: scraper.qrcode,
            date: Date.now().toString(),
          };
        } else if (scraper.format === "Text") {
          if (scraper.scraper === "Cheerio") {
            const data = await scrapeViaCheerio(
              scraper.url,
              scraper.title_selector,
              [scraper.selectors],
            );
            return {
              title: data.title,
              data: data.data,
              url: scraper.url,
              format: scraper.format,
              qrcode: scraper.qrcode,
              date: Date.now().toString(),
            };
          } else if (scraper.scraper === "Puppeteer") {
            const data = await scrapeViaPuppeteer(
              scraper.url,
              scraper.title_selector,
              [scraper.selectors],
              scraper.width,
              scraper.height,
            );
            return {
              title: data?.title || scraper.title_selector,
              data: data?.data || scraper.selectors,
              url: scraper.url,
              format: scraper.format,
              qrcode: scraper.qrcode,
              date: Date.now().toString(),
            };
          }
        }
      }),
    );
    // Filter out undefined elements
    const filteredScraperData: ScraperData[] = scraperData.filter(
      (item): item is ScraperData => item !== undefined,
    );
    console.log(filteredScraperData);

    return filteredScraperData;
  } else {
    const cacheKey = "scraperData";
    const now = Date.now();

    if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
      console.log(`Using cached scraper data`);
      return cache[cacheKey].data;
    }

    console.log(`Fetching new scraper data`);

    const scraperData = await fetchScrapersData();
    if (!scraperData) {
      throw new Error("No scraper data found in the database.");
    }

    // Update cache
    cache[cacheKey] = {
      data: scraperData,
      timestamp: now,
    };
    console.log(scraperData);

    return scraperData;
  }
}
