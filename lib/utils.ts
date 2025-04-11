import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an array of page numbers for pagination.
 *
 * @param currentPage - The current active page number.
 * @param totalPages - The total number of pages available.
 * @returns An array of page numbers for pagination.
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

/**
 * Converts temperature from Kelvin to Celsius and remove decimal part (keeps integer part).
 * @param tempKelvin The temperature in Kelvin.
 * @returns The temperature in Celsius.
 */
export function convertKelvinToCelsius(tempKelvin: number): number {
  const tempCelsius = tempKelvin - 273.15;
  return Math.floor(tempCelsius);
}

/**
 * Formats a date string to a more human-readable format.
 *
 * This function takes a date string and formats it to a more human-readable format
 * using the Intl.DateTimeFormat API. The default locale is set to "en-US", but it can
 * be overridden by passing a different locale as an argument.
 *
 * @param dateStr - The date string to be formatted.
 * @param locale - The locale to use for formatting (default is "en-US").
 * @returns A formatted date string in the specified locale.
 */
export const formatDateToLocal = (
  dateStr: string,
  monthLength: "short" | "long" = "short",
  locale: string = "en-US",
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: monthLength,
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

/**
 * Cleans a string by removing all non-alphanumeric characters.
 *
 * This function uses a regular expression to replace all characters that are not
 * letters (a-z, A-Z) or digits (0-9) with an empty string. The resulting string
 * will only contain alphanumeric characters.
 *
 * @param textString - The input string to be cleaned.
 * @returns A new string containing only alphanumeric characters.
 */
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
