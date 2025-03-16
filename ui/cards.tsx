import { fetchCardData } from "@/lib/data";
import {
  DocumentTextIcon,
  GlobeAltIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";
import XIcon from "./x-icon";

const iconMap = {
  scraper: GlobeAltIcon,
  scraperText: DocumentTextIcon,
  scraperImage: PhotoIcon,
  tweet: XIcon,
};

export default async function CardWrapper() {
  const { numberOfScrapers, numberOfScraperTexts, numberOfScraperImages } =
    await fetchCardData();

  return (
    <>
      <Card title="Scrapers" value={numberOfScrapers} type="scraper" />
      <Card
        title="Scraper texts"
        value={numberOfScraperTexts}
        type="scraperText"
      />
      <Card
        title="Scraper images"
        value={numberOfScraperImages}
        type="scraperImage"
      />
      {/* <Card title="Tweets" value={numberOfTweets} type="tweet" />
      <Card title="Tweets" value={numberOfTweets} type="invoices" />
      <Card title="Tweets" value={numberOfTweets} type="customers" /> */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "scraper" | "scraperText" | "scraperImage" | "tweet";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
