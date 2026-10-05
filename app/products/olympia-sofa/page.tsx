import { permanentRedirect } from "next/navigation";
import { OLYMPIA_DEFAULT_CONFIG, olympiaHref } from "@/lib/olympia";

export default function OlympiaIndexPage() {
  permanentRedirect(olympiaHref(OLYMPIA_DEFAULT_CONFIG));
}
