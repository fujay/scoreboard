"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { NewsData, Settings } from "@/lib/definitions";
import { getNewsData } from "@/lib/news";
import { IconMapping } from "@/ui/news/news-icon";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewsCarousel({
  stale,
  newsDisplay,
}: {
  stale: Settings["general"]["stale"];
  newsDisplay: Settings["general"]["news"];
}) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [news, setNews] = useState<NewsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial news data
  useEffect(() => {
    const loadInitialNewsData = async () => {
      try {
        setError(null);

        const news = await getNewsData();

        setNews(news);
      } catch (error) {
        console.error("Error loading initial data:", error);
        setError("Failed to load news data.");
      }
    };

    loadInitialNewsData();

    // Refresh news data every interval
    const refreshInterval = setInterval(loadInitialNewsData, stale * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [stale]);

  // Handle news rotation
  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [news.length]);

  const currentNews = news[currentNewsIndex];

  return error ? (
    <Card className="bg-white shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-red-100 p-2">
            <Info className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Error</h3>
            <p className="text-slate-600">{error}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : news.length > 0 ? (
    <>
      <Card className="bg-white shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-destructive p-2 text-primary">
              <IconMapping icon={currentNews.icon} />
            </div>
            <div>
              <h3 className="text-lg font-bold">{currentNews.title}</h3>
              <p className="text-slate-600">{currentNews.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicators */}
      <div className="mt-2 flex justify-center space-x-1">
        {news.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${index === currentNewsIndex ? "bg-primary" : "bg-primary/30"}`}
          />
        ))}
      </div>
    </>
  ) : null;
}
