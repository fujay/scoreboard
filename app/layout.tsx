import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans, inter } from "@/ui/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s Dashboard | Digital Message Board",
    default: "Digital Message Board",
  },
  description:
    "Digital Message Board, your central hub for all the latest news, events, and opportunities! Designed to keep you informed and engaged.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${inter.className} ${geistSans.className} ${geistMono.className} antialiased`}
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
