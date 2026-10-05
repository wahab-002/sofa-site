import { permanentRedirect } from "next/navigation";
import { ATALIAN_DEFAULT_CONFIG } from "@/lib/atalian";

export default function AtalianIndexPage() {
  permanentRedirect(`/products/atalian-sofa/${ATALIAN_DEFAULT_CONFIG}`);
}
