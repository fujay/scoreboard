import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import DateTime from "@/components/date-time";
import { Settings } from "@/lib/definitions";

export default function Header({
  settings,
}: {
  settings: Settings["general"]["date"];
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
      <section className="">Status</section>
      <section className="">
        <DateTime settings={settings} />
      </section>
    </header>
  );
}
