import BillboardDisplay from "@/components/billboard-display";
// import Header from "@/components/header";
import { readConfig } from "@/lib/config";
import { getWeatherData } from "@/lib/weather";
import { getScraperData } from "@/lib/scraper";

export default async function Home() {
  const settings = await readConfig();
  const weatherPromise = getWeatherData(settings.weather.location);
  const scraperPromise = getScraperData();
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* <Header settings={settings.general} /> */}
      <BillboardDisplay
        // active={settings.weather.active}
        // location={settings.weather.location}
        interval={settings.general.time}
        // stale={settings.general.stale}
        progressbar={settings.general.progressbar}
        weatherPromise={weatherPromise}
        scraperPromise={scraperPromise}
      />
    </div>
  );
}
