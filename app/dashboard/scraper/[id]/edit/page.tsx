import { Settings } from "@/lib/definitions";
import { readKeyConfig } from "@/lib/utils";
import Breadcrumbs from "@/ui/breadcumbs";
import EditScraperForm from "@/ui/scraper/edit-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Scraper",
};

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const id = params.id;

  const scraperList: Settings["scraper"] = await readKeyConfig("scraper");

  const scraper = scraperList[id];

  if (!scraper) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Scraper",
            href: "/dashboard/scraper",
          },
          {
            label: "Edit Scraper",
            href: `/dashboard/scraper/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditScraperForm scraper={scraper} />
    </main>
  );
}
