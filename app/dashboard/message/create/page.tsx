import Breadcrumbs from "@/ui/breadcumbs";
import MessageForm from "@/ui/message/create-message";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Message",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Messages", href: "/dashboard/message" },
          {
            label: "Create Message",
            href: "/dashboard/message/create",
            active: true,
          },
        ]}
      />
      <MessageForm />
    </main>
  );
}
