import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "rounded-lg px-4 py-2 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-emerald text-white hover:bg-emerald-dark"
      : "border border-border text-muted hover:text-white hover:border-emerald";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
