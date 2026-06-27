"use client";
import { useReveal } from "@/hooks/useReveal";

// Enveloppe un bloc pour le faire apparaître au scroll (fondu + glissement).
// `delay` (ms) permet une apparition en cascade.
export function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
