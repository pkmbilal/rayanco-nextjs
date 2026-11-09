import type { Metadata } from "next";
import { CategoryPage, categoryMetadata, categoryStaticParams } from "@/components/pages/CategoryPage";

// Unknown categories block on render (complete HTML + real 404), see the listing page.
export const instant = false;

export const generateStaticParams = categoryStaticParams;

export async function generateMetadata({ params }: PageProps<"/ar/used-equipment/[category]">): Promise<Metadata> {
  const { category } = await params;
  return categoryMetadata("ar", category);
}

export default async function Page({ params, searchParams }: PageProps<"/ar/used-equipment/[category]">) {
  const { category } = await params;
  return <CategoryPage locale="ar" slug={category} searchParams={searchParams} />;
}
