import Multimedia from "@/components/dashboard/multimedia";
import { lusitana } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multimedia",
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Multimedia</h1>
      </div>
      <Multimedia />
    </div>
  );
}
