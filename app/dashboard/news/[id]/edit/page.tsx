import { fetchNewsById } from "@/lib/data";
import Breadcrumbs from "@/ui/breadcumbs";
import EditNewsForm from "@/ui/news/edit-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit News",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const news = await fetchNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "News",
            href: "/dashboard/news",
          },
          {
            label: "Edit News",
            href: `/dashboard/news/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditNewsForm news={news} />
    </main>
  );
}
