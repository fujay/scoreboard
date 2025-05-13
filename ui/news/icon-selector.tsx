"use client";

import { NewsIconsMapping } from "@/lib/definitions";

type IconSelectorProps = {
  selectedIcon: string | null;
  onSelectedIcon: (iconName: string) => void;
  className?: string;
};

export default function IconSelector({
  selectedIcon,
  onSelectedIcon,
  className,
}: IconSelectorProps) {
  return (
    <div
      className={`flex flex-wrap justify-between rounded-md border p-2 md:gap-2 ${className}`}
    >
      {NewsIconsMapping.map((icon) => (
        <div
          key={icon.name}
          className={`cursor-pointer rounded-md p-3 transition-colors hover:bg-primary/10 ${selectedIcon === icon.name ? "bg-primary/30 hover:bg-primary/30" : ""}`}
          onClick={() => onSelectedIcon(icon.name)}
          tabIndex={0}
        >
          <icon.icon className="md:h-8 md:w-8" />
        </div>
      ))}
    </div>
  );
}
