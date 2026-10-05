import { permanentRedirect } from "next/navigation";
import { DINO_DEFAULT_CONFIG, dinoHref } from "@/lib/dino";

export default function DinoIndexPage() {
  permanentRedirect(dinoHref(DINO_DEFAULT_CONFIG));
}
