import Weather from "@/components/dashboard/weather";
import { readKeyConfig } from "@/lib/config";
import { lusitana } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather",
};

export default async function Page() {
  const settings = await readKeyConfig("weather");

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Weather</h1>
      </div>
      <Weather settings={settings} />
    </div>
  );
}
