"use client";

import { createScraper, StateScraper } from "@/lib/actions";
import { Button } from "@/ui/button";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LetterText, Save, TextSelect } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export default function ScraperForm() {
  const initialState: StateScraper = {
    message: null,
    errors: {},
  };

  const [state, formAction] = useActionState(createScraper, initialState);

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
          <span>Save</span>
        </Button>
      </div>
    </form>
  );
}
