import { fetchMessageById } from "@/lib/data";
import Breadcrumbs from "@/ui/breadcumbs";
import EditMessageForm from "@/ui/message/edit-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Message",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const message = await fetchMessageById(id);

  if (!message) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Messages",
            href: "/dashboard/message",
          },
          {
            label: "Edit Message",
            href: `/dashboard/message/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditMessageForm message={message} />
    </main>
  );
}
