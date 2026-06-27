"use client";
import { useEffect, useState } from "react";

export interface ArchiveEntry {
  file: string;
  date: string;
  articleCount?: number;
  size_kb?: number;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function useArchives() {
  const [archives, setArchives] = useState<ArchiveEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${BASE}/archives/index.json?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Erreur ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!alive) return;
        // Le script Python génère { archives: [...] } — on extrait le tableau
        const list: ArchiveEntry[] = Array.isArray(data)
          ? data
          : Array.isArray(data.archives)
          ? data.archives
          : [];
        const sorted = [...list].sort(
          (a, b) => +new Date(b.date) - +new Date(a.date)
        );
        setArchives(sorted);
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return { archives, loading, error };
}