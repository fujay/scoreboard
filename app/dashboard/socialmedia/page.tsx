import { fetchSocialMediaPages } from "@/lib/data";
import { lusitana } from "@/ui/fonts";
import Pagination from "@/ui/pagination";
import Search from "@/ui/search";
import { SocialMediaTableSkeleton } from "@/ui/skeletons";
import { CreateSocialMedia } from "@/ui/social-media/buttons";
import Table from "@/ui/social-media/table";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Social Media",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchSocialMediaPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Social Media</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search social media..." />
        <CreateSocialMedia />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<SocialMediaTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
