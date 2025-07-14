"use client";

import { StateNews, updateNews } from "@/lib/actions";
import { NewsData } from "@/lib/definitions";
import { Button } from "@/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CalendarDays,
  LetterText,
  MessageSquareText,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import IconSelector from "./icon-selector";

export default function EditNewsForm({ news }: { news: NewsData }) {
  const updateNewsWithId = updateNews.bind(null, news.id);

  const initialState: Omit<StateNews, "inputs"> = {
    message: null,
    errors: {},
  };

  const [selectedIcon, setSelectedIcon] = useState<string>(news.icon);

  const [state, formAction, isPending] = useActionState(
    updateNewsWithId,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title for the news article:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title of the news article"
                title="The title of the news article"
                defaultValue={news.title}
                className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 ${state.errors?.title ? "border-destructive" : "border-gray-200"}`}
                aria-label="The title of the news article"
                aria-describedby="title-error"
                required
              />
              <LetterText className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content for the news article:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                placeholder="Content of the news article"
                title="The content of the news article"
                defaultValue={news.content}
                className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 ${state.errors?.content ? "border-destructive" : "border-gray-200"}`}
                aria-label="The content of the news article"
                aria-describedby="content-error"
                required
              />
              <MessageSquareText className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content &&
              state.errors.content.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* showUntil */}
        <div className="mb-4">
          <label htmlFor="showUntil" className="mb-2 block text-sm font-medium">
            Date until which the news article will be shown:
          </label>
          <div className="relative">
            <input
              id="showUntil"
              name="showUntil"
              type="date"
              defaultValue={
                news.show_until &&
                new Date(news.show_until).toISOString().split("T")[0]
              }
              className={`peer block w-full cursor-pointer rounded-md border py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 ${state.errors?.showUntil ? "border-destructive" : "border-gray-200"}`}
              title="The date until which the news article will be shown"
              aria-label="The date until which the news article will be shown"
              aria-describedby="showUntil-error"
            />
            <CalendarDays className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="showUntil-error" aria-live="polite" aria-atomic="true">
            {state.errors?.showUntil &&
              state.errors.showUntil.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* icon */}
        <div className="mb-4">
          <label htmlFor="icon" className="mb-2 block text-sm font-medium">
            Icon for the news article:
          </label>
          <IconSelector
            className={`outline-1 ${state.errors?.icon ? "border-destructive" : "border-gray-200"}`}
            selectedIcon={selectedIcon}
            onSelectedIcon={setSelectedIcon}
          />
          {/* Hidden input to include the selected icon in the form data */}
          <input type="hidden" name="icon" value={selectedIcon || ""} />

          <div id="icon-error" aria-live="polite" aria-atomic="true">
            {state.errors?.icon &&
              state.errors.icon.map((error) => (
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
          href="/dashboard/news"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <XMarkIcon className="h-6 w-6 sm:mr-1.5" />
          <span className="hidden sm:block">Cancel</span>
        </Link>

        <Button type="submit" disabled={isPending}>
          <Save />
          <span className="hidden sm:block">
            {isPending ? "Saving..." : "Edit News"}
          </span>
        </Button>
      </div>
    </form>
  );
}
