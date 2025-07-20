"use server";

import * as cheerio from "cheerio";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import puppeteer from "puppeteer";
import { z } from "zod";
import { uploadImage } from "./cloudinary";
import { Settings } from "./definitions";
import { containsCssSelectors } from "./utils";
import { readKeyConfig, saveConfig } from "./config";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid  credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const FormSchemaGeneral = z.object({
  time: z.number().int().min(1).max(300),
  db: z.enum(["None", "Local", "Remote"]),
  images: z.enum(["Local", "Remote"]),
  stale: z.number().int().min(1).max(1440),
  fetching: z.enum(["Nextjs", "SWR", "Query"]),
  date: z.enum([
    "Clock",
    "Date",
    "Clock and Date",
    "Clock and Date without time",
  ]),
  news: z.enum(["carousel", "infinite"]),
  progressbar: z.enum([
    "None",
    "ProgressBar",
    "Countdown",
    "ProgressBar and Countdown",
  ]),
});

const FormSchemaWeather = z.object({
  active: z.coerce.boolean(),
  location: z
    .string()
    .regex(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/)
    // ^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$
    .or(z.string().min(2)),
  qrcode: z.coerce.boolean(),
  graphic: z.enum(["OpenWeatherMap", "Lucide Icons", "3D"]),
});

const FormSchemaNews = z.object({
  title: z.string().min(2),
  content: z.string().min(2),
  icon: z.enum([
    "alarm-clock",
    "bell",
    "circle-alert",
    "circle-help",
    "info",
    "megaphone",
    "triangle-alert",
  ]),
  showUntil: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().date().nullable(),
  ),
});

const FormSchemaScraper = z.object({
  url: z.string().url(),
  titleSelector: z.string().trim().min(2),
  selectors: z.string().min(1),
  // selectors: z.array(z.string().min(1)),
  scraper: z.enum(["Puppeteer", "Cheerio"]),
  format: z.enum(["Text", "Screenshot"]),
  width: z.preprocess(
    (val) => (val === "" || val === undefined ? 1920 : Number(val)),
    z.number().min(100).max(2000),
  ),
  height: z.preprocess(
    (val) => (val === "" || val === undefined ? 1080 : Number(val)),
    z.number().min(100).max(2000),
  ),
  qrcode: z.coerce.boolean(),
});

const FormSchemaSocialMedia = z.object({
  title: z.string(),
  platform: z.enum([
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Pinterest",
    "TikTok",
    "Tweet",
    "X",
    "YouTube",
  ]),
  url: z.string().url().or(z.number()),
  qrcode: z.coerce.boolean(),
  showUntil: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().date().nullable(),
  ),
});

export type StateSettings = {
  errors?: {
    time?: string[];
    db?: string[];
    images?: string[];
    stale?: string[];
    fetching?: string[];
    date?: string[];
    news?: string[];
    progressbar?: string[];
  };
  message?: string | null;
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

export type StateNews = {
  errors?: {
    title?: string[];
    content?: string[];
    icon?: string[];
    showUntil?: string[];
  };
  message?: string | null;
  inputs?: {
    title?: string;
    content?: string;
    icon?: string;
    showUntil?: string;
  };
};

export type StateScraper = {
  errors?: {
    url?: string[];
    titleSelector?: string[];
    selectors?: string[];
    scraper?: string[];
    format?: string[];
    width?: string[];
    height?: string[];
    qrcode?: string[];
  };
  message?: string | null;
  inputs?: {
    url?: string;
    titleSelector?: string;
    selectors?: string;
    scraper?: string;
    format?: string;
    width?: number;
    height?: number;
    qrcode?: boolean;
  };
};

export type StateSocialMedia = {
  errors?: {
    title?: string[];
    platform?: string[];
    url?: string[];
    qrcode?: string[];
    showUntil?: string[];
  };
  message?: string | null;
  inputs?: {
    title?: string;
    platform?: string;
    url?: string;
    qrcode?: boolean;
    showUntil?: string;
  };
};

export async function saveSettings(
  prevState: StateSettings,
  formData: FormData,
) {
  const validatedFields = FormSchemaGeneral.safeParse({
    time: parseInt(formData.get("time") as string),
    db: formData.get("db"),
    images: formData.get("images"),
    stale: parseInt(formData.get("stale") as string),
    fetching: formData.get("fetching"),
    date: formData.get("date"),
    news: formData.get("news"),
    progressbar: formData.get("progressbar"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Save Settings.",
    };
  }

  const { time, db, images, stale, fetching, date, news, progressbar } =
    validatedFields.data;

  await saveConfig(
    { time, db, images, stale, fetching, date, news, progressbar },
    "general",
  );

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
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

export async function createScraper(
  prevState: StateScraper,
  formData: FormData,
) {
  const validatedFields = FormSchemaScraper.safeParse({
    url: formData.get("url"),
    titleSelector: formData.get("titleSelector"),
    selectors: formData.get("selectors"),
    scraper: formData.get("scraper"),
    format: formData.get("format"),
    width: formData.get("width"),
    height: formData.get("height"),
    qrcode: formData.get("qrcode"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Scraper.",
      inputs: {
        url: formData.get("url") as string,
        titleSelector: formData.get("titleSelector") as string,
        selectors: formData.get("selectors") as string,
        scraper: formData.get("scraper") as string,
        format: formData.get("format") as string,
        width: Number(formData.get("width")),
        height: Number(formData.get("height")),
        qrcode: formData.get("qrcode") === "on",
      },
    };
  }

  const {
    url,
    titleSelector,
    selectors,
    scraper,
    format,
    width,
    height,
    qrcode,
  } = validatedFields.data;

  // const storage: Settings["general"] = await readKeyConfig("general");

  const date = new Date().toISOString().split("T")[0];
  let result_remote_scraper_data;
  // const scraperUUID = crypto.randomUUID();

  if (format === "Screenshot") {
    const imageData = await scrapeScreenshot(
      url,
      titleSelector,
      selectors,
      width,
      height,
    );
    // if (storage.images === "Local") {
    //   if (imageData.screenshot) {
    //     const cleanedTitle = cleanString(imageData.title);
    //     await saveImageLocal(imageData.screenshot, cleanedTitle);
    //     await saveDataLocal({
    //       id: scraperUUID,
    //       title: imageData.title,
    //       data: cleanedTitle,
    //       date: new Date().toISOString().split("T")[0],
    //     });
    //   }
    // } else if (storage.images === "Remote") {
    let imageUrl = "";
    try {
      if (imageData.screenshot) {
        imageUrl = await uploadImage(imageData.screenshot);
      }
    } catch (error) {
      throw new Error(`${error}: Image upload failed. Please try again later.`);
    }

    try {
      result_remote_scraper_data = await sql`
        INSERT INTO scraper_data (title, data, date)
        VALUES (${imageData.title}, ${imageUrl}, ${date})
        returning id`;
    } catch (error) {
      return {
        message: `Database Error: Failed to Create Scraper data (${error}).`,
      };
    }
    // }
  } else if (format === "Text") {
    let scrappedData;
    if (scraper === "Puppeteer") {
      scrappedData = await scrapeViaPuppeteer(
        url,
        titleSelector,
        [selectors],
        width,
        height,
      );
    } else if (scraper === "Cheerio") {
      scrappedData = await scrapeViaCheerio(url, titleSelector, [selectors]);
    }

    try {
      result_remote_scraper_data = await sql`
        INSERT INTO scraper_data (title, data, date)
        VALUES (${scrappedData?.title ?? ""}, ${scrappedData?.data?.join(", ") ?? ""}, ${date})
        returning id`;
    } catch (error) {
      return {
        message: `Database Error: Failed to Create Scraper data (${error}).`,
      };
    }
  }

  // if (storage.db === "Local") {
  //   const scrapersList = await readKeyConfig("scraper");
  //   const scraperLength = scrapersList.length;

  //   await saveConfig(
  //     {
  //       id: scraperUUID,
  //       url,
  //       titleSelector,
  //       selectors,
  //       scraper,
  //       format,
  //       width,
  //       height,
  //       qrcode,
  //     },
  //     "scraper",
  //     scraperLength,
  //   );

  //   await saveDataLocal({
  //     id: scraperUUID,
  //     title: scrappedData?.title,
  //     data: scrappedData?.data,
  //     date: new Date().toISOString().split("T")[0],
  //   });
  // } else if (storage.db === "Remote") {
  const scraper_data_id = result_remote_scraper_data
    ? result_remote_scraper_data[0].id
    : null;
  if (!scraper_data_id) {
    return {
      message:
        "Failed to create scraper data. No data returned from the database.",
    };
  }
  try {
    await sql`
        INSERT INTO scrapers (url, title_selector, selectors, scraper, format, width, height, scraper_data_id, qrcode, created_at)
        VALUES (${url}, ${titleSelector}, ${selectors}, ${scraper}, ${format}, ${width}, ${height}, ${scraper_data_id}, ${qrcode}, ${date})
      `;
  } catch (error) {
    return {
      message: `${error}: Database Error: Failed to create scraper.`,
    };
  }
  // }

  revalidatePath("/dashboard/scraper");
  redirect("/dashboard/scraper");
}

export async function deleteScraper(id: string) {
  try {
    // const storage: Settings["general"] = await readKeyConfig("general");

    // if (storage.db === "Local") {
    //   const scraper: Settings["scraper"] = await readKeyConfig("scraper");
    //   scraper.splice(id, 1);

    //   await saveConfig(scraper, "scraper");
    // } else if (storage.db === "Remote") {
    const result =
      await sql`DELETE FROM scrapers WHERE id = ${id} returning scraper_data_id`;

    const scraper_data_id = result[0].scraper_data_id;
    await sql`DELETE FROM scraper_data WHERE id = ${scraper_data_id}`;
    // }
    revalidatePath("/dashboard/scraper");
  } catch (error) {
    console.error("Error deleting scraper:", error);
  }
}

export async function updateScraper(
  id: string,
  prevState: StateScraper,
  formData: FormData,
) {
  const validatedFields = FormSchemaScraper.safeParse({
    url: formData.get("url"),
    titleSelector: formData.get("titleSelector"),
    selectors: formData.get("selectors"),
    scraper: formData.get("scraper"),
    format: formData.get("format"),
    width: formData.get("width"),
    height: formData.get("height"),
    qrcode: formData.get("qrcode"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Scraper.",
    };
  }

  const {
    url,
    titleSelector,
    selectors,
    scraper,
    format,
    width,
    height,
    qrcode,
  } = validatedFields.data;

  const storage: Settings["general"] = await readKeyConfig("general");

  if (storage.db === "Local") {
    await saveConfig(
      {
        url,
        titleSelector,
        selectors,
        scraper,
        format,
        width,
        height,
        qrcode,
      },
      "scraper",
      Number(id),
    );
  } else if (storage.db === "Remote") {
    try {
      await sql`
     UPDATE scrapers
     SET url = ${url}, title_selector = ${titleSelector}, selectors = ${selectors}, scraper = ${scraper}, format = ${format}, width = ${width}, height = ${height}, qrcode = ${qrcode}
     WHERE id = ${id}
     `;
    } catch (error) {
      return {
        message: `Database Error: Failed to update Scraper. (${error}).`,
      };
    }
  }

  revalidatePath("/dashboard/scraper");
  redirect("/dashboard/scraper");
}

export async function createNews(prevState: StateNews, formData: FormData) {
  const validatedFields = FormSchemaNews.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    icon: formData.get("icon"),
    showUntil: formData.get("showUntil"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create News.",
      inputs: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        icon: formData.get("icon") as string,
        showUntil: formData.get("showUntil") as string,
      },
    };
  }

  const { title, content, icon, showUntil } = validatedFields.data;

  try {
    await sql`
      INSERT INTO news (title, content, icon, show_until)
      VALUES (${title}, ${content}, ${icon}, ${showUntil})
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create News. (${error}).`,
    };
  }

  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}

export async function updateNews(
  id: string,
  prevState: StateNews,
  formData: FormData,
) {
  const validatedFields = FormSchemaNews.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    icon: formData.get("icon"),
    showUntil: formData.get("showUntil"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update News.",
    };
  }

  const { title, content, icon, showUntil } = validatedFields.data;

  try {
    await sql`
      UPDATE news
      SET title = ${title}, content = ${content}, icon = ${icon}, show_until = ${showUntil}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to update News. (${error}).`,
    };
  }

  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}

export async function deleteNews(id: string) {
  try {
    await sql`DELETE FROM news WHERE id = ${id}`;

    revalidatePath("/dashboard/news");
  } catch (error) {
    console.error("Error deleting news:", error);
  }
}

export async function createSocialMedia(
  prevState: StateSocialMedia,
  formData: FormData,
) {
  console.log(formData);

  const validatedFields = FormSchemaSocialMedia.safeParse({
    title: formData.get("title"),
    platform: formData.get("platform"),
    url: formData.get("url"),
    qrcode: formData.get("qrcode"),
    showUntil: formData.get("showUntil"),
  });
  console.log(validatedFields);
  console.log(validatedFields.data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Social Media.",
      inputs: {
        title: formData.get("title") as string,
        platform: formData.get("platform") as string,
        url: formData.get("url") as string,
        qrcode: formData.get("qrcode") === "on",
        showUntil: formData.get("showUntil") as string,
      },
    };
  }

  const { title, platform, url, qrcode, showUntil } = validatedFields.data;

  try {
    await sql`
      INSERT INTO social_media (title, platform, url, qrcode, show_until)
      VALUES (${title}, ${platform}, ${url}, ${qrcode}, ${showUntil})
      `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Create Social Media. (${error}).`,
    };
  }

  revalidatePath("/dashboard/socialmedia");
  redirect("/dashboard/socialmedia");
}

export async function updateSocialMedia(
  id: string,
  prevState: StateSocialMedia,
  formData: FormData,
) {
  const validatedFields = FormSchemaSocialMedia.safeParse({
    title: formData.get("title"),
    platform: formData.get("platform"),
    url: formData.get("url"),
    qrcode: formData.get("qrcode"),
    showUntil: formData.get("showUntil"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Social Media.",
      inputs: {
        title: formData.get("title") as string,
        platform: formData.get("platform") as string,
        url: formData.get("url") as string,
        qrcode: formData.get("qrcode") === "on",
        showUntil: formData.get("showUntil") as string,
      },
    };
  }

  const { title, platform, url, qrcode, showUntil } = validatedFields.data;

  try {
    await sql`
    UPDATE social_media
    SET title = ${title}, platform = ${platform}, url = ${url}, qrcode = ${qrcode}, show_until = ${showUntil}
    WHERE id = ${id}`;
  } catch (error) {
    return {
      message: `Database Error: Failed to Update Social Media. (${error}).`,
    };
  }

  revalidatePath("/dashboard/socialmedia");
  redirect("/dashboard/socialmedia");
}

export async function deleteSocialMedia(id: string) {
  try {
    await sql`DELETE FROM social_media WHERE id = ${id}`;

    revalidatePath("/dashboard/socialmedia");
  } catch (error) {
    console.error("Error deleting social media:", error);
  }
}

export async function scrapeViaCheerio(
  url: string,
  title: string,
  selectors: string | string[],
  specific?: string[],
) {
  const response = await fetch(url);

  const text = await response.text();

  const $ = cheerio.load(text);

  const scrappedData: string[] = [];

  let header = "";
  if (containsCssSelectors(title)) {
    header = $(title).text().trim();
  } else {
    header = title;
  }

  if (typeof selectors === "string") {
    console.log("selectors is a string:", selectors);
    $(selectors).each((index, element) => {
      if (specific) {
        specific.forEach((spec) => {
          const data = $(element).find(spec).text().trim();
          scrappedData.push(data);
        });
      } else {
        const data = $(element).text().trim();
        scrappedData.push(data);
      }
    });
  } else {
    console.log("selectors is an array:", selectors);
    selectors.forEach((selector) => {
      const data = $(selector).text().trim();

      scrappedData.push(data);
    });
  }

  return {
    title: header,
    data: scrappedData,
  };
}

export async function scrapeViaPuppeteer(
  url: string,
  titleSelector: string,
  selectors: string[],
  width: number = 1080,
  height: number = 768,
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
      selectors,
    );
    console.log(data);
    // return data
    return {
      title: data.title || titleSelector,
      data: data.data,
    };

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
  height: number = 1768,
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: width,
    height: height,
  });

  await page.goto(url);

  const element = await page.$(selector);

  // const title = containsCssSelectors(titleSelector)
  //   ? await page.$eval(titleSelector, (el) => el.textContent?.trim())
  //   : titleSelector;
  let title = "";
  if (containsCssSelectors(titleSelector)) {
    title =
      (await page.$eval(titleSelector, (el) => el.textContent?.trim())) ||
      titleSelector;
  } else {
    title = titleSelector;
  }

  const screenshot = await element?.screenshot({
    // path: `public/images/${cleanedTitle}.png`,
  });

  await browser.close();

  // if (!screenshot) {
  //   throw new Error("Screenshot could not be taken.");
  // }
  return { title, screenshot };
}
