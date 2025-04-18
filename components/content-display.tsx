import { ContentType, ScraperData, WeatherData } from "@/lib/definitions";
import WeatherDisplay from "@/components/weather-display";
import ScraperDisplay from "@/components/scraper-display";

export default function ContentDisplay({ content }: { content: ContentType }) {
  return (
    <div /* className="mx-auto flex h-full w-full max-w-4xl items-center justify-center" */
    >
      {content.type === "weather" ? (
        <WeatherDisplay data={content.data as WeatherData} />
      ) : content.type === "scraper" ? (
        <ScraperDisplay data={content.data as ScraperData} />
      ) : (
        <div className="text-2xl">No content to display</div>
      )}
    </div>
  );
}
