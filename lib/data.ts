import postgres from "postgres";
import {
  NewsData,
  Scraper,
  ScraperData,
  ScraperForm,
  ScrapersTable,
  Settings,
  Tweet,
  TweetTable,
} from "./definitions";
import { readKeyConfig } from "./config";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 6;

export async function fetchCardData() {
  try {
    const storage: Settings["general"] = await readKeyConfig("general");
    // const tweetCountPromise = sql`SELECT COUNT(*) FROM tweets`;
    // if (storage.db === "Local") {
    //   const scrapersListPromise: Promise<Settings["scraper"]> =
    //     readKeyConfig("scraper");
    //   const data = await Promise.all([scrapersListPromise]);
    //   const numberOfScrapers = data[0].length;
    //   return {
    //     numberOfScrapers,
    //   };
    // } else if (storage.db === "Remote") {
    const scrapersListPromise = sql`SELECT COUNT(*) FROM scrapers`;
    const scrapersTextListPromise = sql`SELECT COUNT(*) FROM scrapers WHERE format = 'Text'`;
    const scrapersImageListPromise = sql`SELECT COUNT(*) FROM scrapers WHERE format = 'Screenshot'`;
    const newsListPromise = sql`SELECT COUNT(*) FROM news`;
    const data = await Promise.all([
      scrapersListPromise,
      scrapersTextListPromise,
      scrapersImageListPromise,
      newsListPromise,
    ]);

    const numberOfScrapers = data[0][0].count ?? "0";
    const numberOfScraperTexts = data[1][0].count ?? "0";
    const numberOfScraperImages = data[2][0].count ?? "0";
    const numberOfNews = data[3][0].count ?? "0";

    return {
      numberOfScrapers,
      numberOfScraperTexts,
      numberOfScraperImages,
      numberOfNews,
    };
    // } else {
    //   return {
    //     numberOfScrapers: 0,
    //   };
    // }

    // const tweetCountPromise = sql`SELECT COUNT(*) FROM customers`;

    // const numberOfTweets = Number(data[1].rows[0].count ?? "0");
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchScraperById(id: string) {
  try {
    const scraper = await sql<ScraperForm[]>`
      SELECT
        scrapers.id,
        scrapers.url,
        scrapers.title_selector,
        scrapers.selectors,
        scrapers.scraper,
        scrapers.format,
        scrapers.width,
        scrapers.height,
        scrapers.scraper_data_id,
        scrapers.qrcode,
        scrapers.created_at,
        scraper_data.title,
        scraper_data.data,
        scraper_data.date
      FROM scrapers
      JOIN scraper_data ON scrapers.scraper_data_id = scraper_data.id
      WHERE scrapers.id = ${id};
    `;

    return scraper[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch scraper.");
  }
}

export async function fetchFilteredScrapers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // const storage: Settings["general"] = await readKeyConfig("general");
    // if (storage.db === "Local") {
    //   const scrapersList: Settings["scraper"] = await readKeyConfig("scraper");

    //   const filteredScrapers = scrapersList.filter((scraper) => {
    //     return (
    //       scraper.url.includes(query) ||
    //       scraper.titleSelector.includes(query) ||
    //       scraper.selectors.includes(query) ||
    //       scraper.format.includes(query)
    //     );
    //   });

    //   const length = filteredScrapers.length;

    //   const start = Math.min(length - 1, offset);
    //   const end = Math.min(length, offset + ITEMS_PER_PAGE);

    //   return filteredScrapers.slice(start, end);
    // } else if (storage.db === "Remote") {
    const scrapers = await sql<ScrapersTable[]>`
      SELECT
        scrapers.id,
        scrapers.url,
        scrapers.title_selector,
        scrapers.selectors,
        scrapers.scraper,
        scrapers.format,
        scrapers.width,
        scrapers.height,
        scrapers.qrcode,
        scrapers.created_at,
        scraper_data.title,
        scraper_data.data,
        scraper_data.date
      FROM scrapers
      JOIN scraper_data ON scrapers.scraper_data_id = scraper_data.id
      WHERE
        scrapers.url ILIKE ${`%${query}%`} OR
        scrapers.title_selector ILIKE ${`%${query}%`} OR
        scrapers.selectors ILIKE ${`%${query}%`} OR
        scrapers.scraper ILIKE ${`%${query}%`} OR
        scrapers.format ILIKE ${`%${query}%`} OR
        scrapers.width::text ILIKE ${`%${query}%`} OR
        scrapers.height::text ILIKE ${`%${query}%`} OR
        scrapers.qrcode::text ILIKE ${`%${query}%`} OR
        scrapers.created_at::text ILIKE ${`%${query}%`} OR
        scraper_data.title ILIKE ${`%${query}%`} OR
        scraper_data.data ILIKE ${`%${query}%`} OR
        scraper_data.date::text ILIKE ${`%${query}%`}
      ORDER BY scraper_data.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return scrapers;
    // }
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch scrapers.");
  }
}

export async function fetchScrapersPages(query: string) {
  try {
    const storage: Settings["general"] = await readKeyConfig("general");
    // if (storage.db === "Local") {
    //   const scrapersList: Settings["scraper"] = await readKeyConfig("scraper");
    //   const countedScrapers = scrapersList.filter((scraper) => {
    //     return (
    //       scraper.url.includes(query) ||
    //       scraper.titleSelector.includes(query) ||
    //       scraper.selectors.includes(query) ||
    //       scraper.format.includes(query)
    //     );
    //   });
    //   const totalPages = Math.ceil(countedScrapers.length / ITEMS_PER_PAGE);

    //   return totalPages;
    // } else if (storage.db === "Remote") {
    const data = await sql`SELECT COUNT(*)
      from scrapers
      JOIN scraper_data ON scrapers.scraper_data_id = scraper_data.id
      WHERE
        scrapers.url ILIKE ${`%${query}%`} OR
        scrapers.title_selector ILIKE ${`%${query}%`} OR
        scrapers.selectors ILIKE ${`%${query}%`} OR
        scrapers.scraper ILIKE ${`%${query}%`} OR
        scrapers.format ILIKE ${`%${query}%`} OR
        scrapers.width::text ILIKE ${`%${query}%`} OR
        scrapers.height::text ILIKE ${`%${query}%`} OR
        scrapers.qrcode::text ILIKE ${`%${query}%`} OR
        scrapers.created_at::text ILIKE ${`%${query}%`} OR
        scraper_data.title ILIKE ${`%${query}%`} OR
        scraper_data.data ILIKE ${`%${query}%`} OR
        scraper_data.date::text ILIKE ${`%${query}%`}
      `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
    // } else {
    //   return 0;
    // }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of scrapers.");
  }
}

export async function fetchScrapers() {
  try {
    const scrapers = await sql<Scraper[]>`
    SELECT
    scrapers.id,
    scrapers.url,
    scrapers.title_selector,
    scrapers.selectors,
    scrapers.scraper,
    scrapers.format,
    scrapers.width,
    scrapers.height,
    scrapers.qrcode
    FROM scrapers
    `;

    return scrapers;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch scrapers");
  }
}

export async function fetchScrapersData() {
  try {
    const scrapersData = await sql<ScraperData[]>`
      SELECT
      scrapers.url,
      scrapers.qrcode,
      scrapers.format,
      scraper_data.title,
      scraper_data.data,
      scraper_data.date
      FROM scrapers
      JOIN scraper_data ON scrapers.scraper_data_id = scraper_data.id
    `;

    return scrapersData;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch scrapers data");
  }
}

export async function fetchNews() {
  try {
    const news = await sql<NewsData[]>`
    SELECT id, title, content
    FROM news
    WHERE (show_until IS NULL OR show_until > NOW())
    `;

    return news;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch news data.");
  }
}
export async function fetchTweets() {
  try {
    const tweets = await sql<Tweet[]>`SELECT * FROM tweets`;
    return tweets;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch tweet data.");
  }
}

export async function fetchFilteredTweets(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tweets = await sql<TweetTable[]>`
    SELECT * FROM tweets WHERE content ILIKE ${`%${query}%`} LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return tweets;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch tweets.");
  }
}

export async function fetchTweetsPages(query: string) {
  try {
    const data =
      await sql`SELECT COUNT(*) FROM tweets WHERE content ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of tweets.");
  }
}

export async function fetchTweetById(id: string) {
  try {
    const tweet = await sql<Tweet[]>`SELECT * FROM tweets WHERE id = ${id}`;

    return tweet;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tweet.");
  }
}
