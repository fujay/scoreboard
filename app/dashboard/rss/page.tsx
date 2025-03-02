import { lusitana } from "@/ui/fonts";
import { Metadata } from "next";
import Parser from "rss-parser";

export const metadata: Metadata = {
  title: "RSS",
};

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ["foo", "baz"],
    //            ^ will error because `baz` is not a key of CustomFeed
    item: ["bar"],
  },
});

export default async function Page() {
  const feed = await parser.parseURL("https://www.reddit.com/.rss");
  console.log(feed.title); // feed will have a `foo` property, type as a string

  feed.items.forEach((item) => {
    console.log(item.title + ":" + item.link); // item will have a `bar` property type as a number
  });

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>RSS</h1>
      </div>
      {feed.items.map((item) => (
        <div className="border" key={item.guid}>
          {item.title}
        </div>
      ))}
    </div>
  );
}
