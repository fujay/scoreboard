import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialMediaData } from "@/lib/definitions";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  PinterestEmbed,
  TikTokEmbed,
  XEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import { Tweet } from "react-tweet";

export default function SocialMediaDisplay({
  data,
}: {
  data: SocialMediaData;
}) {
  return (
    <main className="bg-gradient-to-b from-sky-100 to-sky-50 p-4 dark:from-slate-900 dark:to-slate-800">
      {/* Main Card */}
      <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-3xl">
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center text-4xl font-bold text-slate-900 dark:text-slate-100">
          {data.platform === "Facebook" ? (
            <FacebookEmbed url={data.url} />
          ) : data.platform === "Instagram" ? (
            <InstagramEmbed url={data.url} captioned />
          ) : data.platform === "LinkedIn" ? (
            <LinkedInEmbed url={data.url} />
          ) : data.platform === "Pinterest" ? (
            <PinterestEmbed url={data.url} />
          ) : data.platform === "TikTok" ? (
            <TikTokEmbed url={data.url} />
          ) : data.platform === "X" ? (
            <XEmbed url={data.url} />
          ) : data.platform === "Tweet" ? (
            <Tweet id={data.url} />
          ) : data.platform === "YouTube" ? (
            <YouTubeEmbed
              url={data.url}
              youTubeProps={{
                onReady(event) {
                  event.target.playVideo();
                },
              }}
            />
          ) : null}
          {data.qrcode && (
            <>
              <QrCode className="size-8 text-sky-500" />
              <QRCodeSVG value={data.url} />
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
