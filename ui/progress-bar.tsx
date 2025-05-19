"use client";

import { ProgressbarTypes } from "@/lib/definitions";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  interval: number;
  option: ProgressbarTypes;
}

export function ProgressBar({ progress, interval, option }: ProgressBarProps) {
  const secondsRemaining = Math.ceil(((100 - progress) * interval) / 100);

  return (
    <div className="w-full">
      {(option === "Countdown" || option === "ProgressBar and Countdown") && (
        <p className="mb-1 text-center text-xs text-gray-500">
          Next slide in {secondsRemaining} seconds
        </p>
      )}
      {(option === "ProgressBar" || option === "ProgressBar and Countdown") && (
        <div className={`h-1.5 overflow-hidden rounded-full bg-gray-200`}>
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}

export function ProgressBarNew({
  timeRemaining,
  totalTime,
}: {
  timeRemaining: number;
  totalTime: number;
}) {
  const progress = (timeRemaining / totalTime) * 100;

  return (
    <div className="w-full">
      <div className="mb-1 text-center text-sm">
        <span>Next update in {timeRemaining} seconds</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-700">
        <div
          className="h-2.5 rounded-full bg-blue-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
