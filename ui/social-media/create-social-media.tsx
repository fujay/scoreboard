"use client";

import { createSocialMedia, type StateSocialMedia } from "@/lib/actions";
import { Button } from "@/ui/button";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CalendarDays, LetterText, QrCodeIcon, Save } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  TikTok,
  X,
  YouTube,
} from "../social-media-icons";
import XIcon from "../x-icon";

export default function SocialMediaForm() {
  const initialState: StateSocialMedia = {
    message: null,
    errors: {},
    inputs: {},
  };

  const [platform, setPlatform] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    createSocialMedia,
    initialState,
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("facebook")) {
      setPlatform("Facebook");
    } else if (e.target.value.includes("instagram")) {
      setPlatform("Instagram");
    } else if (e.target.value.includes("linkedin")) {
      setPlatform("LinkedIn");
    } else if (e.target.value.includes("pinterest")) {
      setPlatform("Pinterest");
    } else if (e.target.value.includes("tiktok")) {
      setPlatform("TikTok");
    } else if (/^\d+$/.test(e.target.value)) {
      setPlatform("Tweet");
    } else if (e.target.value.includes("x")) {
      setPlatform("X");
    } else if (e.target.value.includes("youtube")) {
      setPlatform("YouTube");
    } else {
      setPlatform(null);
    }
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform(e.target.value);
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* url */}
        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            URL of the social media post:
          </label>
          <div className="relative">
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://www.facebook.com/FrankfurtUAS/posts/1174034151435612"
              title="The URL of the social media post"
              onChange={handleUrlChange}
              defaultValue={state.inputs?.url}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-label="The URL of the social media post"
              aria-describedby="url-error"
              required
            />
            <LinkIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

        {/* title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title of the post:
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the title of the post"
              title="The title of the post"
              defaultValue={state.inputs?.title}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-label="The title of the post"
              aria-describedby="title-error"
            />
            <LetterText className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

        {/* platform */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Set the social media platform
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  id="facebook"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "Facebook"}
                  value="Facebook"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="facebook"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "Facebook" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  Facebook <Facebook />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="instagram"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "Instagram"}
                  value="Instagram"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="instagram"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "Instagram" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  Instagram <Instagram />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="linkedin"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "LinkedIn"}
                  value="LinkedIn"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="linkedin"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "LinkedIn" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  LinkedIn <LinkedIn />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pinterest"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "Pinterest"}
                  value="Pinterest"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="pinterest"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "Pinterest" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  Pinterest <Pinterest />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="tiktok"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "TikTok"}
                  value="TikTok"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="tiktok"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "TikTok" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  TikTok <TikTok />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="tweet"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "Tweet"}
                  value="Tweet"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="tweet"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "Tweet" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  Tweet <X />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="X"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "X"}
                  value="X"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="X"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "X" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  X <XIcon />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="youtube"
                  name="platform"
                  type="radio"
                  onChange={handlePlatformChange}
                  checked={platform === "YouTube"}
                  value="YouTube"
                  className="h-4 w-4 cursor-pointer border-gray-300 focus:ring-2"
                  aria-describedby="platform-error"
                  required
                />
                <label
                  htmlFor="youtube"
                  className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 ${
                    platform === "YouTube" ? "bg-blue-300" : "bg-gray-100"
                  }`}
                >
                  YouTube <YouTube />
                </label>
              </div>
            </div>
          </div>
          <div id="platform-error" aria-live="polite" aria-atomic="true">
            {state.errors?.platform &&
              state.errors.platform.map((error) => (
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
                  title="Activate to show the QR code for the website url"
                  defaultChecked={state.inputs?.qrcode}
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
              defaultValue={state.inputs?.showUntil}
              className={`peer block w-auto cursor-pointer rounded-md border py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 ${state.errors?.showUntil ? "border-destructive" : "border-gray-200"}`}
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

        {/* Errors */}
        <div aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/socialmedia"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <XMarkIcon className="h-6 w-6 sm:mr-1.5" />
          <span className="hidden sm:block">Cancel</span>
        </Link>
        <Button type="submit" disabled={isPending}>
          <Save />
          <span className="hidden sm:block">
            {isPending ? "Creating..." : "Create Social Media"}
          </span>
        </Button>
      </div>
    </form>
  );
}
