import { redirect } from "next/navigation";
import { DINO_DEFAULT_CONFIG, dinoHref } from "@/lib/dino";

export default function DinoIndexPage() {
  redirect(dinoHref(DINO_DEFAULT_CONFIG));
}
