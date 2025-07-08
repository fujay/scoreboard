import postgres from "postgres";
// import { readKeyConfig } from "./config";
import {
  NewsData,
  Scraper,
  ScraperData,
  ScraperForm,
  Settings,
  SocialMediaData,
  Tweet,
  TweetTable,
} from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 6;

export async function fetchCardData() {
  try {
    // const storage: Settings["general"] = await readKeyConfig("general");
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
    const scrapers = await sql<ScraperForm[]>`
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
    // const storage: Settings["general"] = await readKeyConfig("general");
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

export async function fetchNewsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
      from news
      WHERE
        title ILIKE ${`%${query}%`} OR
        content ILIKE ${`%${query}%`} OR
        show_until::text ILIKE ${`%${query}%`} OR
        icon ILIKE ${`%${query}%`}
      `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of news pages.");
  }
}

export async function fetchFilteredNews(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const news = await sql<NewsData[]>`
      SELECT
        id,
        title,
        content,
        show_until,
        icon
      FROM news
      WHERE
        title ILIKE ${`%${query}%`} OR
        content ILIKE ${`%${query}%`} OR
        show_until::text ILIKE ${`%${query}%`} OR
        icon ILIKE ${`%${query}%`}
      ORDER BY show_until DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return news;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch filtered news.");
  }
}

export async function fetchNews() {
  try {
    const news = await sql<NewsData[]>`
    SELECT id, title, content, icon
    FROM news
    WHERE (show_until IS NULL OR show_until > NOW())
    `;

    return news;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch news data.");
  }
}

export async function fetchNewsById(id: string) {
  try {
    const news = await sql<NewsData[]>`
      SELECT
        id,
        title,
        content,
        show_until,
        icon
      FROM news
      WHERE id = ${id};
    `;

    return news[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch news.");
  }
}

export async function fetchSocialMediaPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
      from social_media
      WHERE
        title ILIKE ${`%${query}%`} OR
        platform ILIKE ${`%${query}%`} OR
        url ILIKE ${`%${query}%`} OR
        show_until::text ILIKE ${`%${query}%`}
      `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of social media pages.");
  }
}

export async function fetchFilteredSocialMedia(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const socialMedia = await sql<SocialMediaData[]>`
      SELECT
        id,
        title,
        platform,
        url,
        qrcode,
        show_until

      FROM social_media
      WHERE
        title ILIKE ${`%${query}%`} OR
        platform ILIKE ${`%${query}%`} OR
        url ILIKE ${`%${query}%`} OR
        show_until::text ILIKE ${`%${query}%`}
      ORDER BY show_until DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return socialMedia;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch filtered news.");
  }
}

export async function fetchSocialMedia() {
  try {
    const socialMedia = await sql<SocialMediaData[]>`
    SELECT id, title, platform, url, qrcode
    FROM social_media
    WHERE (show_until IS NULL OR show_until > NOW())
    `;

    return socialMedia;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch social media data.");
  }
}

export async function fetchSocialMediaById(id: string) {
  try {
    const socialMedia = await sql<SocialMediaData[]>`
      SELECT
        id,
        title,
        platform,
        url,
        qrcode,
        show_until
      FROM social_media
      WHERE id = ${id};
    `;

    return socialMedia[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch social media.");
  }
}
