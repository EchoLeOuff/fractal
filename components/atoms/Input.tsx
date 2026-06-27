import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-white placeholder:text-muted focus:border-emerald focus:outline-none ${className}`}
      {...props}
    />
  );
}
