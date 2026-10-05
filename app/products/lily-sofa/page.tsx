import { permanentRedirect } from "next/navigation";
import { LILY_DEFAULT_CONFIG, lilyHref } from "@/lib/lily";

export default function LilyIndexPage() {
  permanentRedirect(lilyHref(LILY_DEFAULT_CONFIG));
}
