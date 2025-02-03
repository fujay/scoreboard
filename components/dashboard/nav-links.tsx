"use client";

import XIcon from "@/ui/x-icon";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog8ToothIcon,
  SunIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CloudIcon,
  CalendarDaysIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { FileVideo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { name: "Cloud", href: "/dashboard/cloud", icon: CloudIcon },
  { name: "Message", href: "/dashboard/message", icon: DocumentTextIcon },
  { name: "RSS", href: "/dashboard/rss", icon: RssIcon },
  { name: "Scraper", href: "/dashboard/scraper", icon: GlobeAltIcon },
  { name: "Twitter", href: "/dashboard/x", icon: XIcon },
  { name: "Weather", href: "/dashboard/weather", icon: SunIcon },
  { name: "Multimedia", href: "/dashboard/multimedia", icon: FileVideo },
  { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDaysIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog8ToothIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              pathname === link.href ? "bg-sky-100 text-blue-600" : ""
            }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
