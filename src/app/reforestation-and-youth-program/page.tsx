import { ReforestationYouthPage } from "@/components/pages/ReforestationYouthPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Reforestation and Youth Program",
  "Minskhi reforestation and youth support initiatives in Sri Lanka and Australia.",
  "/reforestation-and-youth-program"
);

export default function ReforestationAndYouthProgramPage() {
  return <ReforestationYouthPage />;
}
