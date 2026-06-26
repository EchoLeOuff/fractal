import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-subtle px-6 py-12 text-center">
      <p className="mx-auto max-w-3xl text-xs leading-[1.8] text-muted">
        Fractal est un média de vulgarisation financière. Les données sont fournies à titre informatif uniquement.
      </p>
      <p className="mt-4 text-xs leading-[1.8] text-muted">
        © 2025 Fractal ·{" "}
        <Link href="/apropos" className="text-tertiary transition-colors hover:text-accent">Mentions légales</Link> ·{" "}
        <Link href="/apropos" className="text-tertiary transition-colors hover:text-accent">À propos</Link>
      </p>
    </footer>
  );
}
