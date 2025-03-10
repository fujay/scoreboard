import { clsx, type ClassValue } from "clsx";
import fs from "node:fs/promises";
import { twMerge } from "tailwind-merge";
import { Settings } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function readConfig() {
  const configFileContent = await fs.readFile(
    "settings.json",
    // process.cwd() + "/settings.json",
    "utf-8",
  );
  const config: Settings = JSON.parse(configFileContent);
  return config;
}

export async function readKeyConfig(key: string) {
  const configFileContent = await fs.readFile("settings.json", "utf-8");
  const config = JSON.parse(configFileContent);
  const keyConfig = config[key];
  return keyConfig;
}

export async function saveConfig(
  newConfig: Record<string, unknown> | Record<string, unknown>[], // newConfig: [key: string]: unknown,
  key: string,
  index?: number,
) {
  const configFileContent = await fs.readFile("settings.json", "utf-8");
  const config = JSON.parse(configFileContent);

  if (index) {
    config[key][index] = newConfig;
  } else {
    config[key] = newConfig;
  }

  await fs.writeFile("settings.json", JSON.stringify(config));
}

export async function saveImageLocal(
  image: Uint8Array<ArrayBufferLike>,
  fileName: string,
) {
  await fs.writeFile(`${process.cwd()}/assets/images/${fileName}.png`, image);
}

/**
 * Converts temperature from Kelvin to Celsius and remove decimal part (keeps integer part).
 * @param tempKelvin The temperature in Kelvin.
 * @returns The temperature in Celsius.
 */
export function convertKelvinToCelsius(tempKelvin: number): number {
  const tempCelsius = tempKelvin - 273.15;
  return Math.floor(tempCelsius);
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US",
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const cleanString = (textString: string) => {
  return textString.replace(/[^a-zA-Z0-9]/g, "");
};

/**
 * Checks if the given input string contains common CSS selectors.
 *
 * This function uses a regular expression to detect the presence of common CSS selectors
 * such as element names (e.g., div, p, span), class selectors (.), ID selectors (#),
 * attribute selectors ([]), and combinators (>, +, ~).
 *
 * @param input - The input string to check for CSS selectors.
 * @returns `true` if the input string contains CSS selectors, otherwise `false`.
 */
export function containsCssSelectors(input: string): boolean {
  const cssSelectorPattern =
    /[>#\.\[]|\b(div|p|span|a|ul|li|body|html|h[1-6]|section|article|header|footer|nav|main|aside|button|input|textarea|select|label|form)\b/;

  return cssSelectorPattern.test(input);
}
