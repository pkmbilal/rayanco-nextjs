import { ProductDetailPage, productDetailMetadata } from "@/components/pages/ProductDetailPage";

export const metadata = productDetailMetadata("metal-scrap", "en");

export default function Page() {
  return <ProductDetailPage variant="metal-scrap" locale="en" />;
}
