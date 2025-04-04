"use client";

import { ProgressBar } from "@/ui/progress-bar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Weather from "./weather";

type MessageConfig = {
  component: React.ReactNode;
};

export default function BillboardDisplay({ interval }: { interval: number }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleDataLoaded = useCallback(() => {
    setIsDataLoaded(true);
  }, []);

  const messages: MessageConfig[] = [
    {
      component: (
        <Weather
          location="Frankfurt am Main"
          qrcode={true}
          graphic={"Classic"}
          onDataLoaded={handleDataLoaded}
        />
      ),
    },
    {
      component: (
        <Weather
          location="Maintal"
          qrcode={true}
          graphic={"Animated"}
          onDataLoaded={handleDataLoaded}
        />
      ),
    },
  ];

  const currentConfig = messages[currentMessageIndex];
  const CurrentMessage = currentConfig.component;
  const transitionIntervalMs = interval * 1000;
  const progressUpdateInterval = transitionIntervalMs / 100;

  // Reset progress and data loaded flag when changing slides
  useEffect(() => {
    setProgress(0);
    setIsDataLoaded(false);
  }, [currentMessageIndex]);

  // Set up the progress bar and slide transition
  useEffect(() => {
    // Don't start progress until data is loaded
    if (!isDataLoaded) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, progressUpdateInterval);

    const transitionInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, transitionIntervalMs);

    return () => {
      clearInterval(progressInterval);
      clearInterval(transitionInterval);
    };
  }, [
    isDataLoaded,
    progressUpdateInterval,
    transitionIntervalMs,
    messages.length,
  ]);

  const secondsRemaining = Math.ceil(((100 - progress) * interval) / 100);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <>{CurrentMessage}</>
        {/* <Weather
          location={currentConfig.location}
          qrcode={currentConfig.qrcode}
          graphic={currentConfig.graphic}
          onDataLoaded={handleDataLoaded}
        /> */}
        {isDataLoaded && (
          <div className="mt-6">
            <p className="mb-1 text-xs text-gray-500">
              Next slide in {secondsRemaining} seconds
            </p>
            <ProgressBar progress={progress} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
