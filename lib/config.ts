"use server";

import fs from "node:fs/promises";
import { Settings } from "./definitions";

export async function readConfig() {
  const configFileContent = await fs.readFile(
    // "settings.json",
    process.cwd() + "/settings.json",
    "utf-8",
  );
  const config: Settings = JSON.parse(configFileContent);
  return config;
}

export async function readKeyConfig(key: string) {
  const configFileContent = await fs.readFile(
    process.cwd() + "/settings.json",
    "utf-8",
  );
  const config = JSON.parse(configFileContent);
  const keyConfig = config[key];
  return keyConfig;
}

export async function saveConfig(
  newConfig: Record<string, unknown> | Record<string, unknown>[], // newConfig: [key: string]: unknown,
  key: string,
  index?: number,
) {
  const configFileContent = await fs.readFile(
    process.cwd() + "/settings.json",
    "utf-8",
  );
  const config = JSON.parse(configFileContent);

  if (index) {
    config[key][index] = newConfig;
  } else {
    config[key] = newConfig;
  }

  await fs.writeFile(process.cwd() + "/settings.json", JSON.stringify(config));
}

export async function saveImageLocal(
  image: Uint8Array<ArrayBufferLike>,
  fileName: string,
) {
  await fs.writeFile(`${process.cwd()}/assets/images/${fileName}.png`, image);
}

// export async function saveDataLocal(
//   scraperData: Record<string, unknown> | Record<string, unknown>[],
// ) {
//   const scraperDataFile = await fs.readFile(
//     `${process.cwd()}/assets/storage/scraper_data.json`,
//     "utf-8",
//   );
//   const scraperDataJson = JSON.parse(scraperDataFile);
//   const newScraperDataJson = { ...scraperDataJson, scraperData };

//   await fs.writeFile(
//     `${process.cwd()}/assets/storage/scraper_data.json`,
//     JSON.stringify(newScraperDataJson),
//   );
// }
