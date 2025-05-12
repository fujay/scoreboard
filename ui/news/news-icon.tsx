"use client";

import { NewsIcons, NewsIconsMapping } from "@/lib/definitions";
import { Info } from "lucide-react";

export const IconMapping = ({ icon }: { icon: NewsIcons }) => {
  const matchedIcon = NewsIconsMapping.find(
    (iconMapping) => iconMapping.name === icon,
  );
  return matchedIcon ? <matchedIcon.icon /> : <Info />;
  // switch (icon) {
  //   case "alarm-clock":
  //     return <AlarmClock />;
  //   case "bell":
  //     return <Bell />;
  //   case "circle-alert":
  //     return <CircleAlert />;
  //   case "circle-help":
  //     return <CircleHelp />;
  //   case "info":
  //     return <Info />;
  //   case "megaphone":
  //     return <Megaphone />;
  //   case "triangle-alert":
  //     return <TriangleAlert />;
  //   default:
  //     return <Info />;
  // }
};
