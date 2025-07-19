import BillboardDisplay from "@/components/billboard-display";
import Header from "@/components/header";
import { Settings } from "@/lib/definitions";
// import { readConfig } from "@/lib/config";

export default async function Home() {
  // const settings = await readConfig();
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
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header settings={settings.general} />
      <BillboardDisplay
        active={settings.weather.active}
        location={settings.weather.location}
        interval={settings.general.time}
        stale={settings.general.stale}
        fetching={settings.general.fetching}
        progressbar={settings.general.progressbar}
      />
    </div>
  );
}
