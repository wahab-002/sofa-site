import { getProductsByDesign } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  // Redirect old /category/* URLs to new /shop/* structure
  redirect(`/shop/${params.category}`);
}
