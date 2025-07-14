import BillboardDisplay from "@/components/billboard-display";
import Header from "@/components/header";
import { readConfig } from "@/lib/config";

export default async function Home() {
  const settings = await readConfig();

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header settings={settings.general} />
      <div>{settings.general.time}</div>
      <div>{settings.general.db}</div>
      <div>{settings.general.images}</div>
      <div>{settings.general.stale}</div>
      <div>{settings.general.date}</div>
      <div>{settings.general.news}</div>
      <div>{settings.weather.active === true ? "Active" : "Inactive"}</div>
      <div>{settings.weather.location}</div>
      <div>{settings.weather.qrcode === true ? "Enabled" : "Disabled"}</div>
      <div>{settings.weather.graphic}</div>
      <BillboardDisplay
        active={settings.weather.active}
        location={settings.weather.location}
        interval={settings.general.time}
        stale={settings.general.stale}
        progressbar={settings.general.progressbar}
      />
    </div>
  );
}
