import { RequireAuth } from "@/components/organisms/RequireAuth";
import { CompteTemplate } from "@/components/templates/CompteTemplate";
export const metadata = { title: "Fractal · Mon compte" };
export default function ComptePage() {
  return <RequireAuth><CompteTemplate /></RequireAuth>;
}
