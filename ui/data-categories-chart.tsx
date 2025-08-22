"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LabelList, Pie, PieChart } from "recharts";
import { lusitana } from "./fonts";

const chartConfig = {
  visitors: {
    label: "Count",
  },
  messages: {
    label: "Messages",
    color: "var(--chart-1)",
  },
  scrapers: {
    label: "Scrapers",
    color: "var(--chart-2)",
  },
  socialMedia: {
    label: "Social Media",
    color: "var(--chart-3)",
  },
  news: {
    label: "News",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function DataCategoriesChart({
  numberOfMessages,
  numberOfScrapers,
  numberOfSocialMedia,
  numberOfNews,
}: {
  numberOfMessages: number;
  numberOfScrapers: number;
  numberOfSocialMedia: number;
  numberOfNews: number;
}) {
  if (
    !numberOfMessages &&
    !numberOfScrapers &&
    !numberOfSocialMedia &&
    !numberOfNews
  ) {
    return (
      <div className="w-full md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Data Categories
        </h2>
        <p className="mt-4 text-gray-400">No data available.</p>
      </div>
    );
  }

  const chartData = [
    {
      categories: "messages",
      visitors: numberOfMessages,
      fill: "var(--color-messages)",
    },
    {
      categories: "scrapers",
      visitors: numberOfScrapers,
      fill: "var(--color-scrapers)",
    },
    {
      categories: "socialMedia",
      visitors: numberOfSocialMedia,
      fill: "var(--color-socialMedia)",
    },
    {
      categories: "news",
      visitors: numberOfNews,
      fill: "var(--color-news)",
    },
  ].filter((d) => d.visitors > 0);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Data Charts
      </h2>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie data={chartData} dataKey="visitors">
                <LabelList
                  dataKey="categories"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
