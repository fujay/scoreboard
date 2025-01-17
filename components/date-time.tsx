"use client";

import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

type DateTimeProps = {
  config: {
    clock: "Clock" | "Date" | "Clock and Date" | "Clock and Date without time";
  };
};

const DateTime = ({ config }: DateTimeProps) => {
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
    <Clock renderNumbers={true} value={date} locale="en-EN" />

    // <>
    //   {config.clock === "Clock" && (
    //     <div className="flex justify-center">
    //       <Clock renderNumbers={true} value={date} locale="en-EN" />
    //     </div>
    //   )}
    //   {config.clock === "Date" && (
    //     <div className="text-xl">
    //       {moment().format("MMMM Do YYYY, hh:mm a")}
    //     </div>
    //   )}
    //   {config.clock === "Clock and Date" && (
    //     <>
    //       <div className="flex justify-center">
    //         <Clock renderNumbers={true} value={date} locale="en-EN" />
    //       </div>
    //       <div className="mt-2 text-xl">
    //         {moment().format("MMMM Do YYYY, hh:mm a")}
    //       </div>
    //     </>
    //   )}
    //   {config.clock === "Clock and Date without time" && (
    //     <>
    //       <div className="flex justify-center">
    //         <Clock renderNumbers={true} value={date} locale="en-EN" />
    //       </div>
    //       <div className="mt-2 text-xl">{moment().format("MMMM Do YYYY")}</div>
    //     </>
    //   )}
    // </>
  );
};

export default DateTime;
