import type { Metadata } from "next";
import { CategoryPage, categoryMetadata, categoryStaticParams } from "@/components/pages/CategoryPage";

// Unknown categories block on render (complete HTML + real 404), see the listing page.
export const instant = false;

export const generateStaticParams = categoryStaticParams;

export async function generateMetadata({ params }: PageProps<"/used-equipment/[category]">): Promise<Metadata> {
  const { category } = await params;
  return categoryMetadata("en", category);
}

export default async function Page({ params, searchParams }: PageProps<"/used-equipment/[category]">) {
  const { category } = await params;
  return <CategoryPage locale="en" slug={category} searchParams={searchParams} />;
}
