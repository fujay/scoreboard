import ScraperDisplay from "@/components/scraper-display";
import SocialMediaDisplay from "@/components/social-media-display";
import WeatherDisplay from "@/components/weather-display";
import MessageDisplay from "@/components/message-display";
import {
  ContentType,
  MessageData,
  ScraperData,
  SocialMediaData,
  WeatherData,
} from "@/lib/definitions";

export default function ContentDisplay({ content }: { content: ContentType }) {
  return (
    <div /* className="mx-auto flex h-full w-full max-w-4xl items-center justify-center" */
    >
      {content.type === "weather" ? (
        <WeatherDisplay data={content.data as WeatherData} />
      ) : content.type === "message" ? (
        <MessageDisplay data={content.data as MessageData} />
      ) : content.type === "scraper" ? (
        <ScraperDisplay data={content.data as ScraperData} />
      ) : content.type === "social-media" ? (
        <SocialMediaDisplay data={content.data as SocialMediaData} />
      ) : (
        <div className="text-2xl">No content to display</div>
      )}
    </div>
  );
}
