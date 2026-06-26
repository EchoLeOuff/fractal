"use client";
import { useEffect, useState } from "react";

export interface ArchiveEntry { file: string; date: string; articleCount?: number; }
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function useArchives() {
  const [archives, setArchives] = useState<ArchiveEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${BASE}/archives/index.json?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error(`Erreur ${r.status}`); return r.json(); })
      .then((idx: ArchiveEntry[]) => {
        if (!alive) return;
        const sorted = [...idx].sort((a, b) => +new Date(b.date) - +new Date(a.date));
        setArchives(sorted);
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { archives, loading, error };
}
