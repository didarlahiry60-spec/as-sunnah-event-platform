import Link from "next/link";
import type { ComponentProps } from "react";

const styles = {
  primary: "bg-brand-800 text-ivory hover:bg-brand-600",
  accent: "accent-foil-bg text-brand-950 hover:brightness-110",
  ghost: "border border-ivory/60 text-ivory hover:bg-ivory/10",
} as const;

type Props = ComponentProps<typeof Link> & { variant?: keyof typeof styles };

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 font-ui font-semibold transition-colors duration-200 ${styles[variant]} ${className}`}
    />
  );
}
