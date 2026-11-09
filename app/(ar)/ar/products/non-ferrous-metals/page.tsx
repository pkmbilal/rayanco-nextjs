import { ProductDetailPage, productDetailMetadata } from "@/components/pages/ProductDetailPage";

export const metadata = productDetailMetadata("non-ferrous", "ar");

export default function Page() {
  return <ProductDetailPage variant="non-ferrous" locale="ar" />;
}
