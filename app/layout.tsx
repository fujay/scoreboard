import type { Metadata } from "next";
import "./globals.css";
// import Script from "next/script";
import { inter } from "@/ui/fonts";
import { Toaster } from "sonner";

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
      {/* <Script
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      /> */}
      <body
        // className={`${inter.className} ${geistSans.className} ${geistMono.className} antialiased`}
        className={`${inter.className} antialiased`}
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
