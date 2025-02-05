"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveConfig } from "./utils";

const FormSchemaGeneral = z.object({
  time: z.number().int().min(1).max(300),
  db: z.enum(["None", "Local", "Remote"]),
  images: z.enum(["Local", "Remote"]),
  stale: z.number().int().min(1).max(1440),
  date: z.enum([
    "Clock",
    "Date",
    "Clock and Date",
    "Clock and Date without time",
  ]),
});

const FormSchemaWeather = z.object({
  active: z.boolean(),
  location: z
    .string()
    .regex(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/)
    // ^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$
    .or(z.string().min(2)),
  qrcode: z.boolean(),
  graphic: z.enum(["Classic", "Animated"]),
});

const FormSchemaTweet = z.object({
  id: z.string(),
  tweetId: z
    .string()
    .min(5, { message: "ID must be at least 5 characters long." }),
  text: z.string(),
  createdAt: z.string().datetime(),
  name: z.string(),
  screenName: z.string(),
  showUntil: z.string().datetime(),
});

const CreateX = FormSchemaTweet.omit({
  id: true,
});
const UpdateX = FormSchemaTweet.omit({
  id: true,
});

export type StateSettings = {
  errors: {
    time?: string[];
    db?: string[];
    images?: string[];
    stale?: string[];
    date?: string[];
  };
  message: string;
};

export type StateWeather = {
  errors?: {
    active?: string[];
    location?: string[];
    graphic?: string[];
    qrcode?: string[];
  };
  message?: string | null;
};

export type StateX = {
  errors?: {
    tweetId?: string[];
    showUntil?: string[];
  };
  message?: string | null;
};

export async function saveSettings(
  prevState: StateSettings,
  formData: FormData
) {
  const validatedFields = FormSchemaGeneral.safeParse({
    time: parseInt(formData.get("time") as string),
    db: formData.get("db"),
    images: formData.get("images"),
    stale: parseInt(formData.get("stale") as string),
    date: formData.get("date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Save Settings.",
    };
  }

  const { time, db, images, stale, date } = validatedFields.data;

  // try {
  //   await sql`
  //   UPDATE settings
  //   SET time = ${time}, db = ${db}, images = ${images}, stale = ${stale}, date = ${date}, weather = ${weather}`;
  // } catch (error) {
  //   return {
  //     message: `Database Error: Failed to Save Settings (${error}).`,
  //   };
  // }

  await saveConfig({ time, db, images, stale, date }, "general");

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
}

export async function saveWeather(prevState: StateWeather, formData: FormData) {
  const validatedFields = FormSchemaWeather.safeParse({
    active: formData.get("active"),
    location: formData.get("location"),
    qrcode: formData.get("qrcode"),
    graphic: formData.get("graphic"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Save Weather Settings.",
    };
  }

  const { active, location, qrcode, graphic } = validatedFields.data;

  await saveConfig({ active, location, qrcode, graphic }, "weather");

  revalidatePath("/dashboard/weather");
  redirect("/dashboard/weather");
}

export async function createX(prevState: StateX, formData: FormData) {
  const validatedFields = CreateX.safeParse({
    tweetId: formData.get("tweetId"),
    text: formData.get("text"),
    createdAt: formData.get("createdAt"),
    name: formData.get("name"),
    screenName: formData.get("screenName"),
    showUntil: formData.get("showUntil"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create X / Tweet.",
    };
  }

  const { tweetId, text, createdAt, name, screenName, showUntil } =
    validatedFields.data;

  try {
    await sql`
    INSERT INTO tweets (tweetId, text, createdAt, name, screenName, showUntil)
    VALUES (${tweetId}, ${text}, ${createdAt}, ${name}, ${screenName}, ${showUntil})`;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Create X / Tweet. (${error}).`,
    };
  }

  revalidatePath("/dashboard/x");
  redirect("/dashboard/x");
}

export async function updateX(
  id: string,
  prevState: StateX,
  formData: FormData
) {
  const validatedFields = UpdateX.safeParse({
    tweetId: formData.get("tweetId"),
    text: formData.get("text"),
    createdAt: formData.get("createdAt"),
    name: formData.get("name"),
    screenName: formData.get("screenName"),
    showUntil: formData.get("showUntil"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update X / Tweet.",
    };
  }

  const { tweetId, text, createdAt, name, screenName, showUntil } =
    validatedFields.data;

  try {
    await sql`
    UPDATE tweets
    SET tweetId = ${tweetId}, text = ${text}, createdAt = ${createdAt}, name = ${name}, screenName = ${screenName}, showUntil = ${showUntil}
    WHERE id = ${id}`;
  } catch (error) {
    return {
      message: `Database Error: Failed to Update X / Tweet. (${error}).`,
    };
  }

  revalidatePath("/dashboard/x");
  redirect("/dashboard/x");
}

export async function deleteX(id: string) {
  // try {
  await sql`DELETE FROM tweets WHERE id = ${id}`;
  revalidatePath("/dashboard/x");
  // return { message: "Deleted X / Tweet." };
  // } catch (error) {
  // return {
  // message: `Database Error: Failed to Delete X / Tweet (${error}).`,
  // message: "Database Error: Failed to Delete X / Tweet (${error}).",
  // };
  // }
}

export async function scrapeViaCheerio(
  url: string,
  title: string,
  selectors: string[]
) {
  const response = await fetch(url);

  const text = await response.text();

  const $ = cheerio.load(text);

  const scrappedData: string[] = [];

  const header = $(title).text().trim();

  selectors.forEach((selector) => {
    const data = $(selector).text().trim();
    scrappedData.push(data);
  });

  return {
    header,
    data: scrappedData,
  };
}

export async function scrapeViaPuppeteer(
  url: string,
  titleSelector: string,
  selectors: string[],
  width: number = 1080,
  height: number = 768
) {
  let browser;

  try {
    browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setViewport({
      width: width,
      height: height,
    });

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const data = await page.evaluate(
      (titleSelector, selectors) => {
        const title = document
          .querySelector(titleSelector)
          ?.textContent?.trim();

        // const data = Array.from(
        //   document.querySelectorAll(
        //     "#c18317 > table > tbody > tr > td"
        //   ) as NodeListOf<HTMLElement>
        // ).map((el) => el.textContent?.trim());
        // return { title, data };

        const data = selectors.map((selector) => {
          return document.querySelector(selector)?.textContent?.trim();
        });
        return { title, data };
      },
      titleSelector,
      selectors
    );
    console.log(data);
    return data;

    //

    // const scrappedData: string[] = [];

    // const header = await page.$eval(titleSelector, (el) =>
    //   el.textContent?.trim()
    // );
    // console.log(header);

    // selectors.forEach(async (selector, index) => {
    //   const data = await page.$eval(selector, (el) => el.textContent?.trim());
    //   if (data) scrappedData.push(data);
    //   // console.log(data);
    // });
    // console.log(scrappedData);
  } catch (error) {
    console.log(error);
    await browser?.close();
  } /* finally {
      await browser?.close();
    } */
  await browser?.close();
}

export async function scrapeScreenshot(
  url: string,
  titleSelector: string,
  selector: string,
  width: number = 1080,
  height: number = 1768
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: width,
    height: height,
  });

  await page.goto(url);

  const element = await page.$(selector);

  const title = await page.$eval(titleSelector, (el) => el.textContent?.trim());

  const cleanedTitle = title?.replace(/[^a-zA-Z]/g, "");

  console.log(cleanedTitle);

  await element?.screenshot({ path: `public/images/${cleanedTitle}.png` });

  await browser.close();
}
