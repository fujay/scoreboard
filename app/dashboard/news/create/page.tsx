import NewsForm from "@/ui/news/create-news";
import Breadcrumbs from "@/ui/breadcumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create News",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "News", href: "/dashboard/news" },
          {
            label: "Create News",
            href: "/dashboard/news/create",
            active: true,
          },
        ]}
      />
      <NewsForm />
    </main>
  );
}
