import { ReforestationYouthPage } from "@/components/pages/ReforestationYouthPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Reforestation and Youth Support",
  "Minskhi sustainability and community impact initiatives across reforestation and youth support.",
  "/reforestation-and-youth-support"
);

export default function Page() {
  return <ReforestationYouthPage />;
}
