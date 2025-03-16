import { fetchScraperById } from "@/lib/data";
import Breadcrumbs from "@/ui/breadcumbs";
import EditScraperForm from "@/ui/scraper/edit-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Scraper",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  // const storage: Settings["general"] = await readKeyConfig("general");
  // let scraper: ScraperForm | null = null;
  // if (storage.db === "Local") {
  //   const scraperList: Settings["scraper"] = await readKeyConfig("scraper");

  //   scraper = scraperList[Number(id)];
  // } else if (storage.db === "Remote") {
  const scraper = await fetchScraperById(id);
  // }

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
