import { SellPage, sellMetadata } from "@/components/pages/SellPage";

export const metadata = sellMetadata("ar");

export default function Page() {
  return <SellPage locale="ar" />;
}
