"use client";

import ContentDisplay from "@/components/content-display";
import type { ContentType, ProgressbarTypes } from "@/lib/definitions";
import { getScraperData } from "@/lib/scraper";
import { getSocialMediaData } from "@/lib/social-media";
import { getWeatherData } from "@/lib/weather";
import { ProgressBar } from "@/ui/progress-bar";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function BillboardDisplay({
  active,
  location,
  interval,
  stale,
  progressbar,
}: {
  active: boolean;
  location: string;
  interval: number;
  stale: number;
  progressbar: ProgressbarTypes;
}) {
  const [contentItems, setContentItems] = useState<ContentType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const transitionIntervalMs = interval * 1000;
  const progressUpdateInterval = transitionIntervalMs / 100;

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let weatherData = null;
        if (active) {
          // Fetch weather data
          weatherData = await getWeatherData(location);
        }

        // Fetch scraper data
        const scraperData = await getScraperData();

        // Fetch social media data
        const socialMediaData = await getSocialMediaData();

        // Combine content to a single array
        const allContent = [
          ...(weatherData ? [{ type: "weather", data: weatherData }] : []),
          ...scraperData.map((scraperDataItem) => ({
            type: "scraper",
            data: scraperDataItem,
          })),
          ...socialMediaData.map((socialMediaItem) => ({
            type: "social-media",
            data: socialMediaItem,
          })),
        ];

        if (allContent.length === 0) {
          setError(
            "No content available. Please check your database and API connections.",
          );
        } else {
          setContentItems(allContent);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading initial data:", error);
        setError("Failed to load content. Please check your API connections.");
        setIsLoading(false);
      }
    };

    loadInitialData();

    // Refresh data every interval
    const refreshInterval = setInterval(loadInitialData, stale * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [active, location, stale]);

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
    }, progressUpdateInterval);

    return () => {
      clearInterval(progressInterval);
    };
  }, [contentItems.length, isPaused, progressUpdateInterval]);

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
          ) : error ? (
            <div className="text-center text-2xl text-red-400">
              <p className="mb-4">⚠️ {error}</p>
              <p className="text-lg opacity-80">
                Check your environment variables and try again.
              </p>
            </div>
          ) : contentItems.length > 0 ? (
            <ContentDisplay content={currentContent} />
          ) : (
            <div className="text-2xl">No content available</div>
          )}
        </motion.main>
      </AnimatePresence>
      <footer
        className="cursor-pointer"
        onClick={() => setIsPaused((prev) => !prev)}
      >
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
