import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> /* React.ComponentProps<"button"> */ {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "flex h-10 cursor-pointer items-center gap-1.5 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 disabled:cursor-progress disabled:border-muted-foreground disabled:bg-muted disabled:text-muted-foreground aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
