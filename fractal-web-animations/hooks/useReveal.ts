"use client";
import { useEffect, useRef, useState } from "react";

// Scroll-reveal via IntersectionObserver (équivalent de .reveal d'origine).
export function useReveal<T extends HTMLElement = HTMLDivElement>(once = true) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // respecte prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
        else if (!once) setVisible(false);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return { ref, visible };
}
