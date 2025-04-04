import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import DateTime from "@/components/date-time";
import { readConfig } from "@/lib/config";
import BillboardDisplay from "@/components/billboard-display";

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
        <BillboardDisplay interval={settings.general.time} />
      </main>
      {/* <footer className="">Progress</footer> */}
    </div>

    // <div className="grid h-screen grid-cols-3 grid-rows-3 gap-4 overflow-hidden p-4">
    //   <section className="justify-self-start">
    //     <Link
    //       // className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
    //       href="/dashboard"
    //     >
    //       <Image
    //         src={logo}
    //         alt="Digital Message Board logo"
    //         width={100}
    //         height={100}
    //         priority
    //       />
    //     </Link>
    //   </section>
    //   <section className="justify-self-center">Status</section>
    //   <section className="justify-self-end">
    //     <DateTime settings={settings["general"]} />
    //   </section>
    //   <main className="col-span-3 content-center">
    //     <Weather
    //       location={settings["weather"]["location"]}
    //       qrcode={settings["weather"]["qrcode"]}
    //       graphic={settings["weather"]["graphic"]}
    //     />
    //   </main>
    //   <footer className="col-span-3 row-start-4">Progress</footer>
    // </div>
  );
}
