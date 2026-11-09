import { ProductsPage, productsMetadata } from "@/components/pages/ProductsPage";

export const metadata = productsMetadata("en");

export default function Page() {
  return <ProductsPage locale="en" />;
}
