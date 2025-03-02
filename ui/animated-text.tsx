"use client";

export default function AnimatedText({ text }: { text: string }) {
  return (
    <p className="mt-12 max-w-2xl leading-loose">
      {text.split("").map((char, index) => (
        <span
          key={char + index.toString()}
          style={{ transitionDelay: `${500 * (index / 100)}ms` }}
          className="inline-block opacity-100 transition-all duration-750 starting:opacity-25"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}
