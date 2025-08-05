// export const experimental_ppr = true;

import SideNav from "@/components/dashboard/sidenav";

import { unstable_ViewTransition as ViewTransition } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-screen flex-col md:flex-row md:overflow-hidden"
      style={{
        backgroundImage: `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">
        <ViewTransition /* name="page" */>{children}</ViewTransition>
      </div>
    </div>
  );
}
