"use client";

import { saveSettings, StateSettings } from "@/lib/actions";
import type { Settings } from "@/lib/definitions";
import { Button } from "@/ui/button";
import { ChangeEvent, ReactNode, useActionState, useState } from "react";
import {
  Clock,
  Download,
  GalleryHorizontal,
  GalleryHorizontalEnd,
  GlassWater,
  HardDrive,
  MoveLeft,
  MoveRight,
  Palette,
  RectangleEllipsis,
  Save,
  Timer,
} from "lucide-react";
import { CloudIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

export default function Settings({
  settings,
}: {
  settings: Settings["general"];
}) {
  const initialState: StateSettings = {
    message: null,
    errors: {},
  };

  const [storage, setStorage] = useState<ReactNode>(() => {
    if (settings.db === "None") {
      return (
        <NoSymbolIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    } else if (settings.db === "Local") {
      return (
        <HardDrive className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    } else if (settings.db === "Remote") {
      return (
        <CloudIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    }
  });

  const [news, setNews] = useState<ReactNode>(() => {
    if (settings.news === "carousel") {
      return (
        <GalleryHorizontal className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    } else if (settings.news === "infinite") {
      return (
        <GalleryHorizontalEnd className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    }
  });

  const [slide, setSlide] = useState<ReactNode>(() => {
    if (settings.slidenumber === "None") {
      return (
        <NoSymbolIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    } else if (settings.slidenumber === "Left") {
      return (
        <MoveLeft className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    } else if (settings.slidenumber === "Right") {
      return (
        <MoveRight className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      );
    }
  });

  const [stale, setStale] = useState<number>(settings.stale);

  const [state, formAction, isPending] = useActionState(
    saveSettings,
    initialState,
  );

  const handleStorageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "None") {
      setStorage(
        <NoSymbolIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    } else if (e.target.value === "Local") {
      setStorage(
        <HardDrive className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    } else if (e.target.value === "Remote") {
      setStorage(
        <CloudIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    }
  };

  const handleNewsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "carousel") {
      setNews(
        <GalleryHorizontal className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    } else if (e.target.value === "infinite") {
      setNews(
        <GalleryHorizontalEnd className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    }
  };

  const handleStaleChange = (value: ChangeEvent<HTMLInputElement>) => {
    setStale(Number(value.target.value));
  };

  const handleSlideChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "None") {
      setSlide(
        <NoSymbolIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    } else if (e.target.value === "Left") {
      setSlide(
        <MoveLeft className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    } else if (e.target.value === "Right") {
      setSlide(
        <MoveRight className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
      );
    }
  };

  return (
    <form action={formAction}>
      <datalist id="defaultSeconds">
        <option value="10"></option>
        <option value="60"></option>
        <option value="120"></option>
        <option value="180"></option>
        <option value="240"></option>
        <option value="300"></option>
      </datalist>

      <datalist id="defaultStales">
        <option value="1"></option>
        <option value="720"></option>
        <option value="1440"></option>
      </datalist>

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* color */}
        <div className="mb-4">
          <label htmlFor="color" className="mb-2 block text-sm font-medium">
            Color:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="color"
                name="color"
                type="color"
                // defaultValue={settings.color}
                className="peer block w-1/2 cursor-pointer rounded-md border border-gray-200 p-10 py-1 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="color-error"
              />
              <Palette className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* <div id="color-error" aria-live="polite" aria-atomic="true">
            {state.errors?.color &&
              state.errors.color.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* time */}
        <div className="mb-4">
          <label htmlFor="time" className="mb-2 block text-sm font-medium">
            Seconds interval for bulletin (1-300):
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="time"
                name="time"
                type="number"
                step="1"
                min="1"
                max="300"
                list="defaultSeconds"
                defaultValue={settings.time}
                placeholder="Enter Seconds interval"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="time-error"
              />
              <Timer className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="time-error" aria-live="polite" aria-atomic="true">
            {state.errors?.time &&
              state.errors.time.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* db */}
        <div className="mb-4">
          <label htmlFor="db" className="mb-2 block text-sm font-medium">
            Storage:
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              onChange={handleStorageChange}
              id="db"
              name="db"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={settings.db}
              aria-describedby="db-error"
            >
              <option value="" disabled>
                --Select a storage option--
              </option>
              <option value="None">None</option>
              <option value="Local">Local</option>
              <option value="Remote">Remote</option>
            </select>
            {storage}
            {/* {settings.general.db === "None" && (
              <NoSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            )}
            {settings.general.db === "Local" && (
              <HardDrive className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            )}
            {settings.general.db === "Remote" && (
              <CloudIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            )} */}
          </div>
          <div id="db-error" aria-live="polite" aria-atomic="true">
            {state.errors?.db &&
              state.errors.db.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* images */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Images storage:
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="local"
                  name="images"
                  type="radio"
                  value="Local"
                  defaultChecked={settings.images === "Local"}
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="images-error"
                />
                <label
                  htmlFor="local"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Local <HardDrive className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="remote"
                  name="images"
                  type="radio"
                  value="Remote"
                  defaultChecked={settings.images === "Remote"}
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="images-error"
                />
                <label
                  htmlFor="remote"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Remote <CloudIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="images-error" aria-live="polite" aria-atomic="true">
            {state.errors?.images &&
              state.errors.images.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* stale */}
        <div className="mb-4">
          <label htmlFor="stale" className="mb-2 block text-sm font-medium">
            Minutes for Stale times (1-1440):
          </label>
          <div className="mt-2 rounded-md">
            <div className="flex items-center space-x-2">
              <GlassWater className="pointer-events-none h-[18px] w-[18px] flex-shrink-0 text-gray-500 peer-focus:text-gray-900" />
              <input
                id="stale"
                name="stale"
                type="range"
                step="1"
                min="1"
                max="1440"
                // onChange={(e) => handleStaleChange(parseInt(e.target.value))}
                onChange={handleStaleChange}
                list="defaultStales"
                defaultValue={settings.stale}
                placeholder="Enter Seconds interval"
                className="peer block w-full flex-grow rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="stale-error"
              />
              <span className="w-4 flex-shrink-0 text-right">{stale}</span>
            </div>
          </div>
          <div id="stale-error" aria-live="polite" aria-atomic="true">
            {state.errors?.stale &&
              state.errors.stale.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* fetching */}
        <div className="mb-4">
          <label htmlFor="fetching" className="mb-2 block text-sm font-medium">
            Fetching method:
          </label>
          <div className="relative">
            <select
              id="fetching"
              name="fetching"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={settings.fetching}
              aria-describedby="fetching-error"
            >
              <option value="" disabled>
                --Select a fetching method--
              </option>
              <option value="Nextjs">Next.js fetching</option>
              <option value="SWR">SWR Stale-while-revalidate</option>
              <option value="Query">TanStack Query</option>
            </select>
            <Download className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="fetching-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fetching &&
              state.errors.fetching.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* date */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date display:
          </label>
          <div className="relative">
            <select
              id="date"
              name="date"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={settings.date}
              aria-describedby="date-error"
            >
              <option value="" disabled>
                --Select a date option--
              </option>
              <option value="Clock">Clock</option>
              <option value="Date">Date</option>
              <option value="Clock and Date">Clock and Date</option>
              <option value="Clock and Date without time">
                Clock and Date without time
              </option>
            </select>
            <Clock className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date &&
              state.errors.date.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* news */}
        <div className="mb-4">
          <label htmlFor="news" className="mb-2 block text-sm font-medium">
            News:
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              onChange={handleNewsChange}
              id="news"
              name="news"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={settings.news}
              aria-describedby="news-error"
            >
              <option value="" disabled>
                --Select a news option--
              </option>
              <option value="carousel">News carousel</option>
              <option value="infinite">Infinite scroll</option>
            </select>
            {news}
          </div>
          <div id="news-error" aria-live="polite" aria-atomic="true">
            {state.errors?.news &&
              state.errors.news.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* progressbar */}
        <div className="mb-4">
          <label
            htmlFor="progressbar"
            className="mb-2 block text-sm font-medium"
          >
            Progress bar:
          </label>
          <div className="relative">
            <select
              id="progressbar"
              name="progressbar"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={settings.progressbar}
              aria-describedby="progressbar-error"
            >
              <option value="" disabled>
                --Select a progress bar option--
              </option>
              <option value="None">None</option>
              <option value="ProgressBar">ProgressBar</option>
              <option value="Countdown">Countdown</option>
              <option value="ProgressBar and Countdown">
                ProgressBar and Countdown
              </option>
            </select>
            <RectangleEllipsis className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="progressbar-error" aria-live="polite" aria-atomic="true">
            {state.errors?.progressbar &&
              state.errors.progressbar.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* slidenumber */}
        <div className="mb-4">
          <label
            htmlFor="slidenumber"
            className="mb-2 block text-sm font-medium"
          >
            Slide number:
          </label>
          <div className="relative">
            <select
              id="slidenumber"
              name="slidenumber"
              onChange={handleSlideChange}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={settings.slidenumber}
              aria-describedby="slidenumber-error"
            >
              <option value="" disabled>
                --Select a slide option--
              </option>
              <option value="None">None</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
            {slide}
          </div>
          <div id="slidenumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.slidenumber &&
              state.errors.slidenumber.map((error) => (
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
        <Button type="submit" disabled={isPending}>
          <Save />
          <span>{isPending ? "Saving..." : "Save"}</span>
        </Button>
      </div>
    </form>
  );
}
