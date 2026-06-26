import { RadarBar } from "@/components/atoms/RadarBar";
import type { RadarFractal } from "@/types/article";

export function RadarGroup({ radar }: { radar: RadarFractal }) {
  return (
    <div className="flex flex-col gap-5">
      <RadarBar name="Volatilité attendue" value={radar.volatilite_attendue} />
      <RadarBar name="Risque systémique" value={radar.risque_systemique} />
      <RadarBar name="Fiabilité info" value={radar.fiabilite_information} invert />
      <p className="text-sm text-muted">
        Horizon d'impact · <span className="font-medium text-white">{radar.horizon_impact}</span>
      </p>
    </div>
  );
}
