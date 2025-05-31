import { fetchSocialMediaById } from "@/lib/data";
import Breadcrumbs from "@/ui/breadcumbs";
import EditSocialMediaForm from "@/ui/social-media/edit-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Social Media",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const socialMedia = await fetchSocialMediaById(id);

  if (!socialMedia) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Social Media",
            href: "/dashboard/socialmedia",
          },
          {
            label: "Edit Social Media",
            href: `/dashboard/socialmedia/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditSocialMediaForm socialMedia={socialMedia} />
    </main>
  );
}
