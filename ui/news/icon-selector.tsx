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
          className={`cursor-pointer rounded-md p-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color ${selectedIcon === icon.name ? "bg-primary-color/80" : "hover:bg-primary-color/30"}`}
          onClick={() => onSelectedIcon(icon.name)}
          tabIndex={0}
        >
          <icon.icon className="md:h-8 md:w-8" />
        </div>
      ))}
    </div>
  );
}
