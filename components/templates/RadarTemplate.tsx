"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Label } from "@/components/atoms/Label";

Chart.register(...registerables);

type AssetType = "indices" | "actions" | "crypto" | "forex";
interface Asset { symbol: string; name: string; type: AssetType; }

const ASSETS: Asset[] = [
  { symbol: "^FCHI", name: "CAC 40", type: "indices" },
  { symbol: "^GSPC", name: "S&P 500", type: "indices" },
  { symbol: "^IXIC", name: "NASDAQ", type: "indices" },
  { symbol: "AAPL", name: "Apple", type: "actions" },
  { symbol: "MSFT", name: "Microsoft", type: "actions" },
  { symbol: "TSLA", name: "Tesla", type: "actions" },
  { symbol: "NVDA", name: "Nvidia", type: "actions" },
  { symbol: "BTC-USD", name: "Bitcoin", type: "crypto" },
  { symbol: "ETH-USD", name: "Ethereum", type: "crypto" },
  { symbol: "EURUSD=X", name: "EUR/USD", type: "forex" },
  { symbol: "GBPUSD=X", name: "GBP/USD", type: "forex" },
];
const FILTERS: { id: "all" | AssetType; label: string }[] = [
  { id: "all", label: "Tous" }, { id: "indices", label: "Indices" },
  { id: "actions", label: "Actions" }, { id: "crypto", label: "Crypto" }, { id: "forex", label: "Forex" },
];
const PERIODS = ["1M", "3M", "6M", "1A"] as const;
type Period = typeof PERIODS[number];
const PERIOD_DAYS: Record<Period, number> = { "1M": 30, "3M": 90, "6M": 180, "1A": 365 };

const FINNHUB_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY ?? "";
const cleanSym = (s: string) => s.replace("=X", "");
const fmtSym = (s: string) => s.replace("^", "").replace("=X", "");

export function RadarTemplate() {
  const [filter, setFilter] = useState<"all" | AssetType>("all");
  const [selected, setSelected] = useState<Asset>(ASSETS[0]);
  const [period, setPeriod] = useState<Period>("3M");
  const [prices, setPrices] = useState<Record<string, number>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const visible = filter === "all" ? ASSETS : ASSETS.filter((a) => a.type === filter);

  // Prix instantanés (refresh 30s)
  useEffect(() => {
    if (!FINNHUB_KEY) return;
    let alive = true;
    const fetchPrices = async () => {
      const entries = await Promise.all(visible.map(async (a) => {
        try {
          const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${cleanSym(a.symbol)}&token=${FINNHUB_KEY}`);
          const d = await r.json();
          return [a.symbol, typeof d.c === "number" ? d.c : NaN] as const;
        } catch { return [a.symbol, NaN] as const; }
      }));
      if (alive) setPrices((p) => ({ ...p, ...Object.fromEntries(entries) }));
    };
    fetchPrices();
    const id = setInterval(fetchPrices, 30000);
    return () => { alive = false; clearInterval(id); };
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Graphique de l'actif sélectionné
  useEffect(() => {
    let alive = true;
    const draw = (labels: string[], data: number[]) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      chartRef.current?.destroy();
      const grad = ctx.createLinearGradient(0, 0, 0, 400);
      grad.addColorStop(0, "rgba(16,185,129,0.2)");
      grad.addColorStop(1, "rgba(16,185,129,0)");
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: { labels, datasets: [{ data, borderColor: "#10b981", backgroundColor: grad, fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2 }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: "#737373", font: { family: "JetBrains Mono", size: 10 } } },
            y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#737373", font: { family: "JetBrains Mono", size: 10 } } },
          },
        },
      });
    };

    const load = async () => {
      if (!FINNHUB_KEY) { draw(["—"], []); return; }
      const to = Math.floor(Date.now() / 1000);
      const from = to - PERIOD_DAYS[period] * 86400;
      try {
        const r = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${cleanSym(selected.symbol)}&resolution=D&from=${from}&to=${to}&token=${FINNHUB_KEY}`);
        const d = await r.json();
        if (alive && d.s === "ok") {
          const labels = d.t.map((t: number) => new Date(t * 1000).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }));
          draw(labels, d.c);
        }
      } catch { /* ignore */ }
    };
    load();
    return () => { alive = false; chartRef.current?.destroy(); };
  }, [selected, period]);

  return (
    <>
      <section className="mx-auto max-w-content px-6 py-10">
        <Label>Radar</Label>
        <h1 className="mb-3 mt-4">Cours en temps réel</h1>
        <p className="text-secondary">Cliquez sur un actif pour afficher son graphique. Données rafraîchies toutes les 30 secondes.</p>
        {!FINNHUB_KEY && (
          <p className="mt-4 inline-block rounded-md border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.08)] px-4 py-2 text-[0.8125rem] text-warning">
            Clé Finnhub manquante : ajoutez NEXT_PUBLIC_FINNHUB_KEY dans .env.local pour activer les données.
          </p>
        )}
      </section>

      <div className="mx-auto grid max-w-content grid-cols-[320px_1fr] gap-6 px-6 pb-16 max-[900px]:grid-cols-1">
        {/* Sidebar */}
        <aside className="max-h-[calc(100vh-10rem)] overflow-y-auto rounded-lg border border-subtle bg-surface p-5 max-[900px]:max-h-none">
          <div className="mb-4 flex flex-wrap gap-1">
            {FILTERS.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`rounded-sm border px-2.5 py-1 text-xs font-medium transition-all ${filter === f.id ? "border-strong bg-elevated text-primary" : "border-default text-tertiary hover:border-strong hover:text-primary"}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {visible.map((a) => (
              <button key={a.symbol} onClick={() => setSelected(a)}
                className={`flex items-center justify-between rounded-md border p-3 text-left transition-all ${selected.symbol === a.symbol ? "border-accent bg-[rgba(16,185,129,0.08)]" : "border-subtle bg-elevated hover:border-strong hover:bg-base"}`}>
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-sm font-medium">{fmtSym(a.symbol)}</span>
                  <span className="text-[0.6875rem] text-tertiary">{a.name}</span>
                </span>
                <span className="font-mono text-sm font-medium">
                  {prices[a.symbol] != null && !Number.isNaN(prices[a.symbol]) ? prices[a.symbol].toFixed(2) : "—"}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Chart */}
        <main className="min-h-[500px] rounded-lg border border-subtle bg-surface p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="mb-1 font-mono text-[1.125rem]">{fmtSym(selected.symbol)}</h3>
              <p className="text-[0.8125rem] text-tertiary">{selected.name}</p>
            </div>
            <div className="flex gap-1">
              {PERIODS.map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`rounded-sm border px-2.5 py-1 font-mono text-xs font-medium transition-all ${period === p ? "border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] text-accent" : "border-default text-tertiary hover:border-strong hover:text-primary"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px] rounded-md border border-subtle bg-elevated p-2">
            <canvas ref={canvasRef} />
          </div>
          <p className="mt-4 text-center font-mono text-xs text-muted">Données Finnhub · refresh 30s</p>
        </main>
      </div>
    </>
  );
}
