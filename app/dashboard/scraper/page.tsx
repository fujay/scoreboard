import { readKeyConfig } from "@/lib/utils";
import { lusitana } from "@/ui/fonts";
import Pagination from "@/ui/pagination";
import { CreateScraper } from "@/ui/scraper/buttons";
import Table from "@/ui/scraper/table";
import Search from "@/ui/search";
import { InvoicesTableSkeleton } from "@/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Scraper",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const settings = await readKeyConfig("scraper");

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Scrapers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search scrapers..." />
        <CreateScraper />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={3} /> */}
      </div>
    </div>
  );
}
