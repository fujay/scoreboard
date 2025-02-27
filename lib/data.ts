import { sql } from "@vercel/postgres";
import { Settings, Tweet, TweetTable } from "./definitions";
import { readKeyConfig } from "./utils";

const ITEMS_PER_PAGE = 6;

export async function fetchCardData() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // const tweetCountPromise = sql`SELECT COUNT(*) FROM tweets`;
    const scrapersListPromise: Promise<Settings["scraper"]> =
      readKeyConfig("scraper");

    const tweetCountPromise = sql`SELECT COUNT(*) FROM customers`;

    const data = await Promise.all([scrapersListPromise, tweetCountPromise]);

    const numberofScrapers = data[0].length;
    const numberOfTweets = Number(data[1].rows[0].count ?? "0");

    return {
      numberofScrapers,
      numberOfTweets,
    };
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchFilteredScrapers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const scrapersList: Settings["scraper"] = await readKeyConfig("scraper");

    const filteredScrapers = scrapersList.filter((scraper) => {
      return (
        scraper.url.includes(query) ||
        scraper.titleSelector.includes(query) ||
        scraper.selectors.includes(query) ||
        scraper.format.includes(query)
      );
    });

    const length = filteredScrapers.length;

    const start = Math.min(length - 1, offset);
    const end = Math.min(length, offset + ITEMS_PER_PAGE);

    return filteredScrapers.slice(start, end);

    // const tweets =
    //   await sql<TweetTable>`SELECT * FROM tweets WHERE content ILIKE ${`%${query}%`} LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    // return tweets.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch scrapers.");
  }
}

export async function fetchScrapersPages(query: string) {
  try {
    const scrapersList: Settings["scraper"] = await readKeyConfig("scraper");
    const countedScrapers = scrapersList.filter((scraper) => {
      return (
        scraper.url.includes(query) ||
        scraper.titleSelector.includes(query) ||
        scraper.selectors.includes(query) ||
        scraper.format.includes(query)
      );
    });
    const totalPages = Math.ceil(countedScrapers.length / ITEMS_PER_PAGE);

    // const count =
    //   await sql`SELECT COUNT(*) FROM scrapers WHERE content ILIKE ${`%${query}%`}`;
    // const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of scrapers.");
  }
}

export async function fetchTweets() {
  try {
    const data = await sql<Tweet>`SELECT * FROM tweets`;
    return data.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch tweet data.");
  }
}

export async function fetchFilteredTweets(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tweets =
      await sql<TweetTable>`SELECT * FROM tweets WHERE content ILIKE ${`%${query}%`} LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return tweets.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch tweets.");
  }
}

export async function fetchTweetsPages(query: string) {
  try {
    const count =
      await sql`SELECT COUNT(*) FROM tweets WHERE content ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchTweetById(id: string) {
  try {
    const data = await sql<Tweet>`SELECT * FROM tweets WHERE id = ${id}`;

    const tweet = data.rows[0];
    return tweet;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tweet.");
  }
}
