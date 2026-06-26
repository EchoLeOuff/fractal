// atoms/Label.tsx — Le label mono uppercase de fractal.css (.label)
export function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-tertiary">{children}</span>;
}
