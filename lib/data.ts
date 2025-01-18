import { sql } from "@vercel/postgres";
import { Tweet, TweetTable } from "./definitions";

const ITEMS_PER_PAGE = 6;

export async function fetchCardData() {
  try {
    // const tweetCountPromise = sql`SELECT COUNT(*) FROM tweets`;
    const tweetCountPromise = sql`SELECT COUNT(*) FROM customers`;

    const data = await Promise.all([tweetCountPromise]);

    const numberOfTweets = Number(data[0].rows[0].count ?? "0");

    return {
      numberOfTweets,
    };
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch card data.");
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
