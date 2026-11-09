import { SellPage, sellMetadata } from "@/components/pages/SellPage";

export const metadata = sellMetadata("en");

export default function Page() {
  return <SellPage locale="en" />;
}
