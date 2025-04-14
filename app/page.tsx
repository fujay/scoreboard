import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import BillboardDisplay from "@/components/billboard-display";
import DateTime from "@/components/date-time";
import { readConfig } from "@/lib/config";

export default async function Home() {
  const settings = await readConfig();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="mx-3 my-2 flex flex-row justify-between gap-2">
        <section className="">
          <Link href="/dashboard">
            <Image
              src={logo}
              alt="Digital Message Board logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        </section>
        <section className="">Status</section>
        <section className="">
          <DateTime settings={settings.general} />
        </section>
      </div>
      <main className="flex-1">
        <BillboardDisplay
          active={settings.weather.active}
          location={settings.weather.location}
          qrcode={settings.weather.qrcode}
          graphic={settings.weather.graphic}
          interval={settings.general.time}
        />
      </main>
      {/* <footer className="">Progress</footer> */}
    </div>
  );
}
