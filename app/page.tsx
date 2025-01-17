import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import DateTime from "@/components/date-time";

export default async function Home() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 h-screen p-4 overflow-hidden">
      <section className="justify-self-start">
        <Link
          // className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
          href="/dashboard"
        >
          <Image
            src={logo}
            alt="Digital Message Board logo"
            width={100}
            height={100}
            priority
          />
        </Link>
      </section>
      <section className="justify-self-center">Status</section>
      <section className="justify-self-end">
        <DateTime />
      </section>
      <main className="col-span-3 content-center">Main</main>
      <footer className="col-span-3 row-start-4">Progress</footer>
    </div>
  );
}
