import { redirect } from "next/navigation";
import { ATALIAN_DEFAULT_CONFIG } from "@/lib/atalian";

export default function AtalianIndexPage() {
  redirect(`/products/atalian-sofa/${ATALIAN_DEFAULT_CONFIG}`);
}
