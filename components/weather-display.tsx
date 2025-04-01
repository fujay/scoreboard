"use client";

import { ProgressBar } from "@/ui/progress-bar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Weather from "./weather";

type MessageConfig = {
  component: React.ReactNode;
};

export default function WeatherDisplay({ interval }: { interval: number }) {
  const messages: MessageConfig[] = [
    {
      component: (
        <Weather
          location="Frankfurt am Main"
          qrcode={true}
          graphic={"Classic"}
        />
      ),
    },
    {
      component: (
        <Weather location="Maintal" qrcode={true} graphic={"Animated"} />
      ),
    },
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentConfig = messages[currentMessageIndex];
  const CurrentMessage = currentConfig.component;

  const transitionIntervalMs = interval * 1000;
  const progressUpdateInterval = transitionIntervalMs / 100;

  useEffect(() => {
    setProgress(0);

    // Set up progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, progressUpdateInterval);

    // Set up interval to switch slide every interval
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, transitionIntervalMs);

    return () => {
      clearInterval(intervalId);
      clearInterval(progressInterval);
    };
  }, [
    currentMessageIndex,
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
        <div className="mt-6">
          <p className="mb-1 text-xs text-gray-500">
            Next slide in {secondsRemaining} seconds
          </p>
          <ProgressBar progress={progress} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
