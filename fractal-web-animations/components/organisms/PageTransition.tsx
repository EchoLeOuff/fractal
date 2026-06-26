"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Transition douce à chaque changement de route (fondu + léger glissement).
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(false);
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
