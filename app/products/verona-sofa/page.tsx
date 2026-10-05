import { permanentRedirect } from "next/navigation";
import { VERONA_DEFAULT_CONFIG, VERONA_DEFAULT_STYLE, veronaHref } from "@/lib/verona";

export default function VeronaIndexPage() {
  permanentRedirect(veronaHref(VERONA_DEFAULT_STYLE, VERONA_DEFAULT_CONFIG));
}
