"use client";

import { createScraper, StateScraper } from "@/lib/actions";
import { Scraper } from "@/lib/definitions";
import { Button } from "@/ui/button";
import {
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
  QrCodeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  LetterText,
  Library,
  MoveHorizontal,
  MoveVertical,
  Save,
  TextSelect,
} from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useActionState, useState } from "react";

export default function EditScraperForm({ scraper }: { scraper: Scraper }) {
  const initialState: StateScraper = {
    message: null,
    errors: {},
  };

  const [format, setFormat] = useState<string>(scraper.format);
  const [selectedScraper, setSelectedScraper] = useState<string>(
    scraper.scraper
  );

  const [state, formAction] = useActionState(createScraper, initialState);

  const onChangeScraper = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedScraper(e.target.value);
    if (e.target.value === "Cheerio") {
      setFormat("Text");
    }
  };

  const onChangeFormat = (e: ChangeEvent<HTMLInputElement>) => {
    setFormat(e.target.value);
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* url */}
        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            URL of the website to scrape:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="url"
                name="url"
                type="url"
                defaultValue={scraper.url}
                placeholder="https://www.frankfurt-university.de/"
                title="The URL of the website to scrape"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-label="The URL of the website to scrape"
                aria-describedby="url-error"
                // required
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="url-error" aria-live="polite" aria-atomic="true">
            {state.errors?.url &&
              state.errors.url.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* titleSelector */}
        <div className="mb-4">
          <label
            htmlFor="titleSelector"
            className="mb-2 block text-sm font-medium"
          >
            Selector or text for the title element on the website:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="titleSelector"
                name="titleSelector"
                type="text"
                defaultValue={scraper.titleSelector}
                placeholder="#c18317 > h2 or Semestertermine"
                title="The selector for the title element on the website, e.g. #c18317 > h2."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-label="The selector for the title element on the website, e.g. #c18317 > h2."
                aria-describedby="titleSelector-error"
                // required
              />
              <LetterText className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="titleSelector-error" aria-live="polite" aria-atomic="true">
            {state.errors?.titleSelector &&
              state.errors.titleSelector.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* selectors */}
        <div className="mb-4">
          <label htmlFor="selectors" className="mb-2 block text-sm font-medium">
            Selectors for the data elements to scrape:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="selectors"
                name="selectors"
                type="text"
                defaultValue={scraper.selectors}
                placeholder="#c18317 > h2"
                title="The selector for the data element on the website, e.g. #c18317 > h2."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-label="The selector for the data element on the website, e.g. #c18317 > h2."
                aria-describedby="selectors-error"
                // required
              />
              <TextSelect className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="selectors-error" aria-live="polite" aria-atomic="true">
            {state.errors?.selectors &&
              state.errors.selectors.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* scraper */}
        <div className="mb-4">
          <label htmlFor="scraper" className="mb-2 block text-sm font-medium">
            Scraper tool for parsing HTML:
          </label>
          <div className="relative">
            <select
              id="scraper"
              name="scraper"
              defaultValue={scraper.scraper}
              onChange={onChangeScraper}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              title={`The scraper tool for parsing HTML.
                -Cheerio is fast, flexible, and elegant library for parsing and manipulating HTML and XML.

                -Puppeteer is a JavaScript library which provides a high-level API to control Chrome. Puppeteer runs headless (no visible UI).

                --Only Puppeteer works with screenshots!`}
              aria-describedby="scraper-error"
            >
              <option value="" disabled>
                --Select a scraper option--
              </option>
              <option value="Puppeteer">Puppeteer</option>
              <option value="Cheerio">Cheerio</option>
            </select>
            <Library className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="scraper-error" aria-live="polite" aria-atomic="true">
            {state.errors?.scraper &&
              state.errors.scraper.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* format */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Scraper output format:
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="text"
                  name="format"
                  onChange={onChangeFormat}
                  checked={format === "Text"}
                  type="radio"
                  value="Text"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="format-error"
                />
                <label
                  htmlFor="text"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full ${
                    format === "Text" ? "bg-blue-300" : "bg-gray-100"
                  } px-3 py-1.5 text-xs font-medium text-gray-600`}
                >
                  Text <DocumentTextIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="screenshot"
                  name="format"
                  onChange={onChangeFormat}
                  checked={format === "Screenshot"}
                  type="radio"
                  value="Screenshot"
                  disabled={selectedScraper !== "Puppeteer"}
                  className="h-4 w-4 disabled:cursor-not-allowed cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="format-error"
                />
                <label
                  htmlFor="screenshot"
                  className={`ml-2 flex ${
                    selectedScraper !== "Puppeteer"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } items-center gap-1.5 rounded-full ${
                    format === "Screenshot" ? "bg-blue-300" : "bg-gray-100"
                  } px-3 py-1.5 text-xs font-medium text-gray-600`}
                >
                  Screenshot <PhotoIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="format-error" aria-live="polite" aria-atomic="true">
            {state.errors?.format &&
              state.errors.format.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* qrcode */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">QR Code:</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="qrcode"
                  name="qrcode"
                  type="checkbox"
                  defaultChecked={scraper.qrcode}
                  title="Activate to show the QR code for the website url"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="qrcode-error"
                  aria-label="Activate to show the QR code for the website url"
                />
                <label
                  htmlFor="qrcode"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  QR Code <QrCodeIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="qrcode-error" aria-live="polite" aria-atomic="true">
            {state.errors?.qrcode &&
              state.errors.qrcode.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* width */}
        <datalist id="defaultWidths">
          <option value="800"></option>
          <option value="1024"></option>
          <option value="1280"></option>
          <option value="1600"></option>
          <option value="1920"></option>
        </datalist>
        <div className="mb-4">
          <label htmlFor="width" className="mb-2 block text-sm font-medium">
            Page width in pixels (100-2000):
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="width"
                name="width"
                type="number"
                step="1"
                min="100"
                max="2000"
                list="defaultWidths"
                defaultValue={scraper.width}
                placeholder="1920"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                title="The page width in CSS pixels."
                aria-label="The page width in CSS pixels."
                aria-describedby="width-error"
              />
              <MoveHorizontal className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="width-error" aria-live="polite" aria-atomic="true">
            {state.errors?.width &&
              state.errors.width.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* height */}
        <datalist id="defaultHeights">
          <option value="600"></option>
          <option value="768"></option>
          <option value="800"></option>
          <option value="900"></option>
          <option value="1080"></option>
        </datalist>
        <div className="mb-4">
          <label htmlFor="height" className="mb-2 block text-sm font-medium">
            Page height in pixels (100-2000):
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="height"
                name="height"
                type="number"
                step="1"
                min="100"
                max="2000"
                list="defaultHeights"
                defaultValue={scraper.height}
                placeholder="1080"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                title="The page height in CSS pixels."
                aria-label="The page height in CSS pixels."
                aria-describedby="height-error"
              />
              <MoveVertical className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="height-error" aria-live="polite" aria-atomic="true">
            {state.errors?.height &&
              state.errors.height.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Errors */}
        <div aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/scraper"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <XMarkIcon className="mr-1.5 w-6 h-6" />
          Cancel
        </Link>
        <Button className="cursor-pointer" type="submit">
          <Save />
          <span>Edit Scraper</span>
        </Button>
      </div>
    </form>
  );
}
