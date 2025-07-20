"use server";

import {
  scrapeScreenshot,
  scrapeViaCheerio,
  scrapeViaPuppeteer,
} from "@/lib/actions";
import { fetchScrapers, fetchScrapersData } from "@/lib/data";
import type { ScraperData, ScraperDataAction } from "@/lib/definitions";
// import { unstable_cache } from "next/cache";

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
export async function getScraperData(
  isNoCache: boolean,
): Promise<ScraperData[]> {
  // const staleTime = settings.stale || 60;

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
    // const scraperData = unstable_cache(
    //   async () => {
    //     return await fetchScrapersData();
    //   },
    //   ["scraperData"],
    //   { revalidate: staleTime * 60 },
    // );

    const scraperData = await fetchScrapersData();
    if (!scraperData) {
      throw new Error("No scraper data found in the database.");
    }

    console.log(scraperData);

    return scraperData;
  }
}
