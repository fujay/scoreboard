"use client";

import { Settings } from "@/lib/definitions";
import moment from "moment";
import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const DateTime = ({ settings }: { settings: Settings["general"] }) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    // <Clock renderNumbers={true} value={date} locale="en-EN" />
    <>
      {settings.date === "Clock" && (
        <div className="flex justify-center">
          <Clock renderNumbers={true} value={date} locale="en-EN" />
        </div>
      )}
      {settings.date === "Date" && (
        <div className="text-xl">
          {moment().format("MMMM Do YYYY, hh:mm a")}
        </div>
      )}
      {settings.date === "Clock and Date" && (
        <>
          <div className="flex justify-center">
            <Clock renderNumbers={true} value={date} locale="en-EN" />
          </div>
          <div className="mt-2 text-xl">
            {moment().format("MMMM Do YYYY, hh:mm a")}
          </div>
        </>
      )}
      {settings.date === "Clock and Date without time" && (
        <>
          <div className="flex justify-center">
            <Clock renderNumbers={true} value={date} locale="en-EN" />
          </div>
          <div className="mt-2 text-xl">{moment().format("MMMM Do YYYY")}</div>
        </>
      )}
    </>
  );
};

export default DateTime;
