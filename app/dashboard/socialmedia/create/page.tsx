import Breadcrumbs from "@/ui/breadcumbs";
import SocialMediaForm from "@/ui/social-media/create-social-media";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Social Media",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Social Media", href: "/dashboard/socialmedia" },
          {
            label: "Create Social Media",
            href: "/dashboard/socialmedia/create",
            active: true,
          },
        ]}
      />
      <SocialMediaForm />
    </main>
  );
}
