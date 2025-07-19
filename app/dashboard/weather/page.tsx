import Weather from "@/components/dashboard/weather";
import { Settings } from "@/lib/definitions";
// import { readKeyConfig } from "@/lib/config";
import { lusitana } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather",
};

export default async function Page() {
  // const settings = await readKeyConfig("weather");
  const settings: Settings = {
    general: {
      time: 15,
      db: "Remote",
      images: "Remote",
      stale: 10,
      fetching: "SWR",
      date: "Clock and Date without time",
      news: "carousel",
      progressbar: "ProgressBar and Countdown",
    },
    weather: {
      active: true,
      location: "Frankfurt am Main",
      qrcode: true,
      graphic: "Lucide Icons",
    },
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Weather</h1>
      </div>
      <Weather settings={settings.weather} />
    </div>
  );
}
