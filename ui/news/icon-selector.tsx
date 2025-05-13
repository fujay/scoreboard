"use client";

import { NewsIconsMapping } from "@/lib/definitions";

type IconSelectorProps = {
  selectedIcon: string | null;
  onSelectedIcon: (iconName: string) => void;
};

export default function IconSelector({
  selectedIcon,
  onSelectedIcon,
}: IconSelectorProps) {
  return (
    <div className="flex flex-wrap justify-between rounded-md border p-2 md:gap-2">
      {NewsIconsMapping.map((icon) => (
        <div
          key={icon.name}
          className={`cursor-pointer rounded-md p-3 transition-colors hover:bg-primary/10 ${selectedIcon === icon.name ? "bg-primary/30 hover:bg-primary/30" : ""}`}
          onClick={() => onSelectedIcon(icon.name)}
        >
          <icon.icon className="md:h-8 md:w-8" />
        </div>
      ))}
    </div>
  );
}
