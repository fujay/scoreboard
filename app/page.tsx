import BillboardDisplay from "@/components/billboard-display";
import Header from "@/components/header";
import { readConfig } from "@/lib/config";
import settings from "@/app/settings.json";

export const revalidate = settings.general.stale;

export default async function Home() {
  const settings = await readConfig();

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header settings={settings.general} />
      <BillboardDisplay
        active={settings.weather.active}
        location={settings.weather.location}
        qrcode={settings.weather.qrcode}
        graphic={settings.weather.graphic}
        interval={settings.general.time}
        stale={settings.general.stale}
        db={settings.general.db}
        fetching={settings.general.fetching}
        progressbar={settings.general.progressbar}
        slides={settings.general.slidenumber}
      />
    </div>
  );
}
