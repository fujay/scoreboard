import { readKeyConfig } from "@/lib/utils";
import { lusitana } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scraper",
};

export default async function Page() {
  const settings = await readKeyConfig("scraper");

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Scraper</h1>
      </div>
    </div>
  );
}
