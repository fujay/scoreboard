import ScraperForm from "@/ui/scraper/create-scraper";
import Breadcrumbs from "@/ui/breadcumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Scraper",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Scraper", href: "/dashboard/scraper" },
          {
            label: "Create Scraper",
            href: "/dashboard/scraper/create",
            active: true,
          },
        ]}
      />
      <ScraperForm />
    </main>
  );
}
