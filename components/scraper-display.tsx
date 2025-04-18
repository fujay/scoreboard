import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScraperData } from "@/lib/definitions";
import { formatDateToLocal } from "@/lib/utils";
import { QrCode } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

export default function ScraperDisplay({ data }: { data: ScraperData }) {
  return (
    <main className="bg-gradient-to-b from-sky-100 to-sky-50 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {data.title}
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Main Card */}
          <Card className="col-span-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                {data.title}
              </CardTitle>
              <CardContent className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                {data.format === "Screenshot" ? (
                  <Image src={data.data} alt={data.title} fill />
                ) : (
                  // <img
                  //   src={data.data}
                  //   alt="Screenshot"
                  //   className="rounded-lg shadow-lg"
                  // />
                  <p className="text-xl">{data.data}</p>
                )}
              </CardContent>
            </CardHeader>
            <CardFooter>
              <p className="text-sm text-gray-500">
                From: {formatDateToLocal(data.date, "long")}
              </p>
            </CardFooter>
          </Card>

          {/* QR Code */}
          {data.qrcode && (
            <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <QrCode className="size-8 text-sky-500" />
                  QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <QRCodeSVG value={data.url} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
