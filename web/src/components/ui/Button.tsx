import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const styles = {
  primary: "bg-brand-800 text-ivory border border-brand-700/60 hover:bg-brand-700 active:scale-[0.98] shadow-xs focus-visible:outline-brand-600",
  accent: "bg-lime-500 text-brand-950 font-bold hover:bg-lime-400 active:scale-[0.98] shadow-xs shadow-brand-950/20 focus-visible:outline-lime-400",
  ghost: "border border-ivory/25 text-ivory hover:bg-ivory/10 hover:border-ivory/40 active:scale-[0.98] focus-visible:outline-ivory",
  outline: "border border-brand-800/30 text-brand-900 bg-transparent hover:bg-sand/60 active:scale-[0.98] focus-visible:outline-brand-800",
} as const;

type Variant = keyof typeof styles;

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

type RegularButtonProps = {
  href?: undefined;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export type ButtonProps = LinkButtonProps | RegularButtonProps;

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = `inline-flex min-h-12 items-center justify-center rounded-xl px-5 font-ui font-semibold text-base transition-[background-color,border-color,color,transform] duration-150 ease-out cursor-pointer ${styles[variant]} ${className}`;

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props as LinkButtonProps;
    return (
      <Link href={href} className={baseClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as RegularButtonProps;
  return (
    <button type={buttonProps.type ?? "button"} className={baseClasses} {...buttonProps}>
      {children}
    </button>
  );
}
