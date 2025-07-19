import Settings from "@/components/dashboard/settings";
// import { readKeyConfig } from "@/lib/config";
import { Settings as SettingsDef } from "@/lib/definitions";
import { lusitana } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};
export default async function Page() {
  // const settings = await readKeyConfig("general");
  const settings: SettingsDef = {
    general: {
      time: 15,
      db: "Remote",
      images: "Remote",
      stale: 10,
      fetching: "SWR",
      date: "Clock and Date without time",
      news: "carousel",
      progressbar: "ProgressBar and Countdown",
    },
    weather: {
      active: true,
      location: "Frankfurt am Main",
      qrcode: true,
      graphic: "Lucide Icons",
    },
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      </div>
      <Settings settings={settings.general} />
    </div>
  );
}
