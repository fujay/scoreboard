import { Metadata } from "next";
import { Tweet } from "react-tweet";
import { fetchTweet } from "react-tweet/api";
import Image from "next/image";
import { fetchTweetsPages } from "@/lib/data";
import { lusitana } from "@/ui/fonts";
import Search from "@/ui/search";
import { Suspense } from "react";
import Pagination from "@/ui/pagination";
import { CreateX } from "@/ui/x/buttons";

export const metadata: Metadata = {
  title: "X Tweets",
};

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTweetsPages(query);

  const test = await fetchTweet("1050401946048364544");
  console.log(test);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateX />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
    // <div /* className="dark" */>
    //   <Tweet id="1050401946048364544" />
    // </div>
    // <div>
    //   <p>{test.data?.text}</p>
    //   <p>{test.data?.created_at}</p>
    //   <p>{test.data?.user.name}</p>
    //   <p>{test.data?.user.screen_name}</p>
    // </div>
  );
}
