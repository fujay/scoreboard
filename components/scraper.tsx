import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScraperData } from "@/lib/definitions";
import { getScraperData } from "@/lib/scraper";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";

export default function Scraper({
  onDataLoaded,
  db,
}: {
  onDataLoaded?: () => void;
  db: boolean;
}) {
  const [scraperData, setScraperData] = useState<ScraperData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getScraperData(db);
        setScraperData(data);
        setError(null);
        if (onDataLoaded) {
          onDataLoaded();
        }
      } catch (err) {
        console.error("Error fetching scraper data: ", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [db, onDataLoaded]);

  return (
    <main className="bg-gradient-to-b from-sky-100 to-sky-50 p-4 dark:from-slate-900 dark:to-slate-800">
      {loading ? (
        // <div className="flex flex-col items-center justify-center py-8">
        //   <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        //   <p className="mt-4 text-gray-500">Loading data...</p>
        // </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <Skeleton className="inline-block h-8 w-8" />
          </h1>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Main Card */}
            <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                  <Skeleton className="inline-block h-8 w-8" />
                </CardTitle>
                <CardContent className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                  <Skeleton className="inline-block h-8 w-8" />
                </CardContent>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500">Last updated:</p>
                <Skeleton className="inline-block h-8 w-8" />
              </CardFooter>
            </Card>

            {/* QR Code */}
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <QrCode className="size-8 text-sky-500" />
                  QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Skeleton className="h-32 w-32" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : scraperData ? (
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scraperData[0]?.title}
          </h1>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Main Card */}
            <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                  {scraperData[0]?.title}
                </CardTitle>
                <CardContent className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                  {scraperData[0]?.format === "Screenshot" ? (
                    <Image
                      src={scraperData[0].data}
                      alt={scraperData[0].title}
                      fill
                    />
                  ) : (
                    // <img
                    //   src={scraperData[0]?.data}
                    //   alt="Screenshot"
                    //   className="rounded-lg shadow-lg"
                    // />
                    <p className="text-xl">{scraperData[0]?.data}</p>
                  )}
                </CardContent>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  From: {formatDateToLocal(scraperData[0]?.date, "long")}
                </p>
              </CardFooter>
            </Card>

            {/* QR Code */}
            {scraperData[0]?.qrcode && (
              <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <QrCode className="size-8 text-sky-500" />
                    QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <QRCodeSVG value={scraperData[0]?.url} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
