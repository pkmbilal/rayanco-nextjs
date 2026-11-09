import { UsedEquipmentPage, usedEquipmentMetadata } from "@/components/pages/UsedEquipmentPage";

export const metadata = usedEquipmentMetadata("ar");

export default function Page({ searchParams }: PageProps<"/ar/used-equipment">) {
  return <UsedEquipmentPage locale="ar" searchParams={searchParams} />;
}
