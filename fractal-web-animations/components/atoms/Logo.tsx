// atoms/Logo.tsx — Le mark "F." de Fractal.
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-light to-emerald-dark font-display font-bold text-white shadow-lg"
        style={{ width: size, height: size, fontSize: size * 0.55 }}
      >
        F
      </div>
      <span className="font-display text-xl font-bold tracking-tight">
        Fractal<span className="text-emerald-light">.</span>
      </span>
    </div>
  );
}
