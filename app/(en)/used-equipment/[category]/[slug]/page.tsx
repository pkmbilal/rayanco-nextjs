import type { Metadata } from "next";
import { ListingPage, listingMetadata, listingStaticParams } from "@/components/pages/ListingPage";

// Listings published after the build render on demand. Blocking (not a streamed shell) so the
// first response is complete server HTML and unknown slugs get a real 404 status (SEO).
export const instant = false;

export const generateStaticParams = listingStaticParams;

export async function generateMetadata({ params }: PageProps<"/used-equipment/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  return listingMetadata("en", category, slug);
}

export default async function Page({ params }: PageProps<"/used-equipment/[category]/[slug]">) {
  const { category, slug } = await params;
  return <ListingPage locale="en" category={category} slug={slug} />;
}
