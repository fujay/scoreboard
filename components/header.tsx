import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import DateTime from "@/components/date-time";
import { Settings } from "@/lib/definitions";
import NewsCarousel from "./news-carousel";

export default function Header({
  settings,
}: {
  settings: Settings["general"];
}) {
  return (
    <header className="mx-3 my-2 flex flex-row justify-between gap-2">
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
      <section className="w-1/2">
        <NewsCarousel stale={settings.stale} newsDisplay={settings.news} />
      </section>
      <section className="">
        <DateTime settings={settings.date} />
      </section>
    </header>
  );
}
