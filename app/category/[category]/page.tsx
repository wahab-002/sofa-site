import { permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  // Permanent 308/301 redirect from old /category/* to /shop/*
  permanentRedirect(`/shop/${params.category}`);
}
