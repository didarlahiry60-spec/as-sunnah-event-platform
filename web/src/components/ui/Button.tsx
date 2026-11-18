import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const styles = {
  primary: "bg-brand-800 text-ivory hover:bg-brand-600 focus-visible:outline-brand-600",
  accent: "accent-foil-bg text-brand-950 font-bold hover:brightness-110 focus-visible:outline-accent-500",
  ghost: "border border-ivory/60 text-ivory hover:bg-ivory/10 focus-visible:outline-ivory",
  outline: "border-2 border-brand-800 text-brand-900 bg-transparent hover:bg-sand/60 focus-visible:outline-brand-800",
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
  const baseClasses = `inline-flex min-h-12 items-center justify-center rounded-full px-6 font-ui font-semibold transition-all duration-200 cursor-pointer ${styles[variant]} ${className}`;

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
