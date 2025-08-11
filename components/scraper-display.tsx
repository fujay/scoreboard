import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScraperData } from "@/lib/definitions";
import { formatDateToLocal, getTextSize } from "@/lib/utils";
import { QrCode } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

export default function ScraperDisplay({ data }: { data: ScraperData }) {
  return (
    <>
      {/* Main Card */}
      <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-3xl">
            {data.title}
          </CardTitle>
          <CardContent>
            {data.format === "Screenshot" ? (
              <Image
                src={data.data}
                alt={data.title}
                // fill
                width={1000}
                height={1000}
                style={{ position: "static", width: "100%", height: "auto" }}
              />
            ) : (
              // <img
              //   src={data.data}
              //   alt="Screenshot"
              //   className="rounded-lg shadow-lg"
              // />
              <p
                className={`prose flex max-w-none flex-col items-center text-balance ${getTextSize(data.data)}`}
              >
                {data.data}
              </p>
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
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2 text-2xl">
            <QrCode className="size-8 text-sky-500" />
            QR Code
          </div>
          <QRCodeSVG value={data.url} />
        </div>
        // <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
        //   <CardHeader>
        //     <CardTitle className="flex items-center justify-center gap-2 text-2xl">
        //       <QrCode className="size-8 text-sky-500" />
        //       QR Code
        //     </CardTitle>
        //   </CardHeader>
        //   <CardContent className="flex items-center justify-center">
        //     <QRCodeSVG value={data.url} />
        //   </CardContent>
        // </Card>
      )}
    </>
  );
}
