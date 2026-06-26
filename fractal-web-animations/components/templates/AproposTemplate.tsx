import { Label } from "@/components/atoms/Label";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Reveal } from "@/components/atoms/Reveal";

const STATS = [
  { v: "50+", l: "Sources analysées" },
  { v: "15", l: "Articles par édition" },
  { v: "0", l: "Conseil en investissement" },
  { v: "100%", l: "Indépendant" },
];

const PIPELINE = [
  { num: "ÉTAPE 01", t: "Collecte", p: "Notre système surveille en continu plus de 50 flux RSS — Les Échos, AGEFI, Reuters, sources crypto et forex — sans interruption." },
  { num: "ÉTAPE 02", t: "Filtrage IA", p: "Un premier modèle score chaque article de 0 à 10. Le score composite combine pertinence (70%) et fraîcheur (30%) pour un flux vivant." },
  { num: "ÉTAPE 03", t: "Vulgarisation", p: "Un second agent IA rédige chaque analyse : contexte, mécanique, actifs concernés, scores Volatilité/Risque et biais psychologiques." },
];

const VALUES = [
  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", t: "Indépendance totale", p: "Fractal n'est ni rémunéré par des brokers, ni financé par des maisons d'investissement. Notre seule boussole : l'impact réel sur les marchés." },
  { icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", t: "Vulgarisation sans compromis", p: "Chaque analyse est relue pour éliminer le jargon inutile. Si on ne peut pas l'expliquer simplement, c'est qu'on ne le comprend pas assez bien." },
  { icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3 7-6 6m0-6 6 6", t: "Information, pas conseil", p: "Fractal est un média, pas un cabinet de gestion. La décision d'investir reste entièrement la vôtre. Nous ne détenons pas le statut CIF." },
  { icon: "M3 11h18v11H3zM7 11V7a5 5 0 0 1 10 0v4", t: "IA transparente", p: "Nous assumons pleinement l'usage de l'IA dans notre pipeline. Chaque analyse porte un score de fiabilité de source visible par tous." },
];

const LEGAL = [
  "Fractal est un média de vulgarisation financière. Les contenus publiés sont fournis à titre informatif et éducatif uniquement.",
  "Ils ne constituent en aucun cas un conseil en investissement personnalisé, une recommandation d'achat ou de vente de valeurs mobilières.",
  "Fractal ne détient pas le statut de Conseiller en Investissements Financiers (CIF) tel que défini par l'AMF.",
  "Tout investissement comporte des risques, notamment de perte partielle ou totale du capital investi. Les performances passées ne préjugent pas des performances futures.",
  "Les analyses produites par notre pipeline IA peuvent contenir des erreurs ou imprécisions. Nous vous encourageons à croiser les informations avec d'autres sources avant toute décision financière.",
];

export function AproposTemplate() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-content px-6 pb-12 pt-16 max-[768px]:px-4">
        <Label>À propos</Label>
        <h1 className="mb-6 mt-4 max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)]">La finance, sans filtre ni jargon.</h1>
        <p className="max-w-2xl text-[1.0625rem] leading-[1.65] text-secondary">
          Fractal est un média indépendant de vulgarisation financière. Nous utilisons l&apos;IA pour scanner les marchés, identifier ce qui compte vraiment, et vous l&apos;expliquer clairement — sans vous dire quoi acheter.
        </p>
        <div className="mt-12 grid grid-cols-4 gap-px overflow-hidden rounded-md border border-subtle bg-[rgba(255,255,255,0.06)] max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
          {STATS.map((s) => (
            <div key={s.l} className="bg-surface p-6">
              <div className="mb-1 font-mono text-[2rem] font-medium tracking-[-0.02em]">{s.v}</div>
              <div className="text-[0.8125rem] text-tertiary">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="mx-auto max-w-content px-6 pb-16 max-[768px]:px-4">
        <SectionHeader label="01 / Méthodologie" right="Pipeline IA" />
        <h2 className="mb-3">Comment ça marche</h2>
        <p className="mb-8 max-w-2xl text-secondary">Un pipeline en trois étapes, entièrement automatisé, pour transformer le bruit des marchés en informations exploitables.</p>
        <div className="grid grid-cols-3 gap-6 max-[768px]:grid-cols-1">
          {PIPELINE.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}><div className="h-full rounded-md border border-subtle bg-surface p-6 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-strong hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)]">
              <div className="mb-3 font-mono text-xs tracking-[0.05em] text-accent">{s.num}</div>
              <h3 className="mb-2 text-[1.0625rem] text-primary">{s.t}</h3>
              <p className="text-sm leading-[1.55] text-secondary">{s.p}</p>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* VALEURS */}
      <section className="mx-auto max-w-content px-6 pb-16 max-[768px]:px-4">
        <SectionHeader label="02 / Principes" right="Nos valeurs" />
        <h2 className="mb-3">Ce en quoi on croit</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 max-[768px]:grid-cols-1">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 70}><div className="h-full rounded-md border border-subtle bg-surface p-6 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-strong hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)]">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-sm border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.08)] text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4"><path d={v.icon} /></svg>
              </div>
              <h3 className="mb-2 text-base text-primary">{v.t}</h3>
              <p className="text-sm leading-[1.55] text-secondary">{v.p}</p>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* MENTIONS LÉGALES */}
      <section className="mx-auto max-w-content px-6 pb-16 max-[768px]:px-4">
        <SectionHeader label="03 / Légal" right="Avertissement" />
        <h2 className="mb-3">Mentions légales</h2>
        <div className="mt-8 rounded-md border border-subtle bg-surface p-8">
          {LEGAL.map((p, i) => (
            <p key={i} className="mb-3 text-[0.8125rem] leading-[1.7] text-tertiary last:mb-0">{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}
