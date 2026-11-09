import { ProductsPage, productsMetadata } from "@/components/pages/ProductsPage";

export const metadata = productsMetadata("ar");

export default function Page() {
  return <ProductsPage locale="ar" />;
}
