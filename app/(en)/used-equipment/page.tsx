import { UsedEquipmentPage, usedEquipmentMetadata } from "@/components/pages/UsedEquipmentPage";

export const metadata = usedEquipmentMetadata("en");

export default function Page({ searchParams }: PageProps<"/used-equipment">) {
  return <UsedEquipmentPage locale="en" searchParams={searchParams} />;
}
