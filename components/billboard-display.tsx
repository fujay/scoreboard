"use client";

import ContentDisplay from "@/components/content-display";
import type { ContentType } from "@/lib/definitions";
import { getScraperData } from "@/lib/scraper";
import { getWeatherData } from "@/lib/weather";
import { ProgressBar, ProgressBarNew } from "@/ui/progress-bar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BillboardDisplay({
  active,
  location,
  interval,
  stale,
}: {
  active: boolean;
  location: string;
  interval: number;
  stale: number;
}) {
  const [contentItems, setContentItems] = useState<ContentType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(interval);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transitionIntervalMs = interval * 1000;
  const progressUpdateInterval = transitionIntervalMs / 100;

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch weather data
        const weatherData = await getWeatherData(location);
        console.log("Weather data:", weatherData);

        // Fetch scraper data
        const scraperData = await getScraperData();
        console.log("Scraper data:", scraperData);

        if (!scraperData || scraperData.length === 0) {
          console.warn("No scraper data found");
        }

        // Combine content to a single array
        const allContent = [
          { type: "weather", data: weatherData },
          ...scraperData.map((scraperDataItem) => ({
            type: "scraper",
            data: scraperDataItem,
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
  }, [location, stale]);

  // Handle content rotation and progress bar
  useEffect(() => {
    if (contentItems.length === 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          // Move to the next content item //(prevIndex + 1) % contentItems.length);
          setCurrentIndex((prevIndex) =>
            prevIndex === contentItems.length - 1 ? 0 : prevIndex + 1,
          );
          setProgress(0); // Reset progress bar
          return interval; // Reset timer
        }
        return prevTime - 1;
      });
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, progressUpdateInterval);

    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, [contentItems.length, interval, progressUpdateInterval]);

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
            <div className="max-w-md text-center text-2xl text-red-400">
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
      <footer>
        {!isLoading && !error && contentItems.length > 0 && (
          <div className="p-6">
            <ProgressBar progress={progress} interval={interval} />
            <ProgressBarNew
              timeRemaining={timeRemaining}
              totalTime={interval}
            />
          </div>
        )}
      </footer>
    </>
  );
}
