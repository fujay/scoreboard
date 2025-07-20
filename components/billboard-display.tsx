"use client";

import ContentDisplay from "@/components/content-display";
import type {
  ContentType,
  DbTypes,
  FetchingTypes,
  ProgressbarTypes,
  ScraperData,
  SocialMediaData,
  WeatherData,
} from "@/lib/definitions";
import { getScraperData } from "@/lib/scraper";
import { getSocialMediaData } from "@/lib/social-media";
import { getWeatherData } from "@/lib/weather";
import { ProgressBar } from "@/ui/progress-bar";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

export default function BillboardDisplay({
  active,
  location,
  interval,
  stale,
  db,
  fetching,
  progressbar,
}: {
  active: boolean;
  location: string;
  interval: number;
  stale: number;
  db: DbTypes;
  fetching: FetchingTypes;
  progressbar: ProgressbarTypes;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [weatherDataNextjs, setWeatherDataNextjs] = useState<
    WeatherData | undefined
  >(undefined);
  const [weatherErrorNextjs, setWeatherErrorNextjs] =
    useState<unknown>(undefined);
  const [weatherLoadingNextjs, setWeatherLoadingNextjs] = useState(false);

  const [scraperDataNextjs, setScraperDataNextjs] = useState<
    ScraperData[] | undefined
  >(undefined);
  const [scraperErrorNextjs, setScraperErrorNextjs] =
    useState<unknown>(undefined);
  const [scraperLoadingNextjs, setScraperLoadingNextjs] = useState(false);

  const [socialMediaDataNextjs, setSocialMediaDataNextjs] = useState<
    SocialMediaData[] | undefined
  >(undefined);
  const [socialMediaErrorNextjs, setSocialMediaErrorNextjs] =
    useState<unknown>(undefined);
  const [socialMediaLoadingNextjs, setSocialMediaLoadingNextjs] =
    useState(false);

  const weatherSWR = useSWR<WeatherData>(
    active ? ["weather", location] : null,
    () => getWeatherData(location),
    { refreshInterval: stale * 60 * 1000 },
  );
  const scraperSWR = useSWR<ScraperData[]>(
    "scraper",
    () => getScraperData(db === "None"),
    {
      refreshInterval: stale * 60 * 1000,
    },
  );
  const socialMediaSWR = useSWR<SocialMediaData[]>(
    "social-media",
    getSocialMediaData,
    {
      refreshInterval: stale * 60 * 1000,
    },
  );

  let weatherData: WeatherData | undefined;
  let weatherError: unknown;
  let weatherLoading = false;
  let scraperData: ScraperData[] | undefined;
  let scraperError: unknown;
  let scraperLoading = false;
  let socialMediaData: SocialMediaData[] | undefined;
  let socialMediaError: unknown;
  let socialMediaLoading = false;

  useEffect(() => {
    if (fetching !== "Nextjs") return;
    let isMounted = true;
    setWeatherLoadingNextjs(true);
    setScraperLoadingNextjs(true);
    setSocialMediaLoadingNextjs(true);
    getWeatherData(location)
      .then((data) => {
        if (isMounted) setWeatherDataNextjs(data);
      })
      .catch((err) => {
        if (isMounted) setWeatherErrorNextjs(err);
      })
      .finally(() => {
        if (isMounted) setWeatherLoadingNextjs(false);
      });
    getScraperData(db === "None")
      .then((data) => {
        if (isMounted) setScraperDataNextjs(data);
      })
      .catch((err) => {
        if (isMounted) setScraperErrorNextjs(err);
      })
      .finally(() => {
        if (isMounted) setScraperLoadingNextjs(false);
      });
    getSocialMediaData()
      .then((data) => {
        if (isMounted) setSocialMediaDataNextjs(data);
      })
      .catch((err) => {
        if (isMounted) setSocialMediaErrorNextjs(err);
      })
      .finally(() => {
        if (isMounted) setSocialMediaLoadingNextjs(false);
      });
    return () => {
      isMounted = false;
    };
  }, [fetching, location, db]);

  if (fetching === "Nextjs") {
    weatherData = weatherDataNextjs;
    weatherError = weatherErrorNextjs;
    weatherLoading = weatherLoadingNextjs;
    scraperData = scraperDataNextjs;
    scraperError = scraperErrorNextjs;
    scraperLoading = scraperLoadingNextjs;
    socialMediaData = socialMediaDataNextjs;
    socialMediaError = socialMediaErrorNextjs;
    socialMediaLoading = socialMediaLoadingNextjs;
  } else if (fetching === "SWR") {
    weatherData = weatherSWR.data;
    weatherError = weatherSWR.error;
    weatherLoading = weatherSWR.isLoading;

    scraperData = scraperSWR.data;
    scraperError = scraperSWR.error;
    scraperLoading = scraperSWR.isLoading;

    socialMediaData = socialMediaSWR.data;
    socialMediaError = socialMediaSWR.error;
    socialMediaLoading = socialMediaSWR.isLoading;
  }

  // Combine content
  const contentItems: ContentType[] = useMemo(() => {
    const allContent: ContentType[] = [
      ...(weatherData ? [{ type: "weather" as const, data: weatherData }] : []),
      ...(scraperData
        ? scraperData.map((scraperDataItem) => ({
            type: "scraper" as const,
            data: scraperDataItem,
          }))
        : []),
      ...(socialMediaData
        ? socialMediaData.map((socialMediaItem) => ({
            type: "social-media" as const,
            data: socialMediaItem,
          }))
        : []),
    ];
    return allContent.sort(() => Math.random() - 0.5);
  }, [weatherData, scraperData, socialMediaData]);

  const isLoading = weatherLoading || scraperLoading || socialMediaLoading;
  const error = weatherError || scraperError || socialMediaError;

  // Handle content rotation and progress bar
  useEffect(() => {
    if (isPaused || contentItems.length === 0) return;

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
          return 0;
        }
        return prevProgress + 1;
      });
    }, interval * 10);

    return () => {
      clearInterval(progressInterval);
    };
  }, [contentItems.length, isPaused, interval]);

  // Current content to display
  const currentContent = contentItems[currentIndex];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
              <div className="text-2xl">Loading content...</div>
            </div>
          ) : contentItems.length > 0 ? (
            <ContentDisplay content={currentContent} />
          ) : (
            <div className="flex items-center justify-center text-2xl">
              No content available
            </div>
          )}
        </motion.main>
      </AnimatePresence>
      <footer
        className="cursor-pointer"
        onClick={() => setIsPaused((prev) => !prev)}
      >
        {error ? (
          <div className="text-center text-xl text-red-400">
            <p className="mb-4">⚠️ {String(error)}</p>
            <p className="opacity-80">
              Check your environment variables and try again.
            </p>
          </div>
        ) : null}
        {isPaused ? (
          <p className="flex justify-center">
            <Play className="size-5 text-primary" />
          </p>
        ) : null}
        {progressbar !== "None" &&
          !isLoading &&
          !error &&
          contentItems.length > 0 && (
            <div className="p-6">
              <ProgressBar
                progress={progress}
                interval={interval}
                option={progressbar}
              />
            </div>
          )}
      </footer>
    </>
  );
}
