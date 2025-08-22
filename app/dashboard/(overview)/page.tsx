import { fetchDataCategoriesChart } from "@/lib/data";
import CardWrapper from "@/ui/cards";
import { DataCategoriesChart } from "@/ui/data-categories-chart";
import { lusitana } from "@/ui/fonts";
import {
  CardsSkeleton,
  DataCategoriesChartSkeleton,
  DataChartSkeleton,
} from "@/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  const {
    numberOfMessages,
    numberOfScrapers,
    numberOfSocialMedia,
    numberOfNews,
  } = await fetchDataCategoriesChart();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<DataChartSkeleton />}>
          {/* <DataChart /> */}
        </Suspense>
        <Suspense fallback={<DataCategoriesChartSkeleton />}>
          <DataCategoriesChart
            numberOfMessages={numberOfMessages}
            numberOfScrapers={numberOfScrapers}
            numberOfSocialMedia={numberOfSocialMedia}
            numberOfNews={numberOfNews}
          />
        </Suspense>
      </div>
    </main>
  );
}
