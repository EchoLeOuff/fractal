import { RequireAuth } from "@/components/organisms/RequireAuth";
import { RadarTemplate } from "@/components/templates/RadarTemplate";
export const metadata = { title: "Fractal · Radar" };
export default function RadarPage() {
  return <RequireAuth><RadarTemplate /></RequireAuth>;
}
