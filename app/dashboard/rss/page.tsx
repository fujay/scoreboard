import { lusitana } from "@/ui/fonts";
import Pagination from "@/ui/pagination";
import Search from "@/ui/search";
import { InvoicesTableSkeleton } from "@/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";
import Parser from "rss-parser";
import { CreateRSS } from "@/ui/rss/buttons";
import Table from "@/ui/rss/table";

export const metadata: Metadata = {
  title: "RSS",
};

const parser = new Parser();

export default async function Page() {
  const feed = await parser.parseURL(
    "https://www.frankfurt-university.de/de/aktuelles/rss.xml",
  );
  console.log(feed);

  // feed.items.forEach((item) => {
  //   console.log(item.title + ":" + item.link);
  // });

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>RSS</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search RSS..." />
        <CreateRSS />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>

    // {feed.items.map((item) => (
    //   <div className="border" key={item.guid}>
    //     {item.title}
    //   </div>
    // ))}
  );
}
