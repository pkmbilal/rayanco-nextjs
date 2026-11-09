import { ProductDetailPage, productDetailMetadata } from "@/components/pages/ProductDetailPage";

export const metadata = productDetailMetadata("metal-scrap", "ar");

export default function Page() {
  return <ProductDetailPage variant="metal-scrap" locale="ar" />;
}
