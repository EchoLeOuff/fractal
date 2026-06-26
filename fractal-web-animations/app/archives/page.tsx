import { RequireAuth } from "@/components/organisms/RequireAuth";
import { ArchivesTemplate } from "@/components/templates/ArchivesTemplate";
export const metadata = { title: "Fractal · Archives" };
export default function ArchivesPage() {
  return <RequireAuth><ArchivesTemplate /></RequireAuth>;
}
