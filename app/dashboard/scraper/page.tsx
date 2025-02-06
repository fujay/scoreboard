import Multimedia from "@/components/dashboard/multimedia";
import Weather from "@/components/dashboard/weather";
import { readKeyConfig } from "@/lib/utils";
import { lusitana } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scraper",
};

export default async function Page() {
  const settings = await readKeyConfig("general");

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Multimedia</h1>
      </div>
      <Multimedia settings={settings} />
    </div>
  );
}
