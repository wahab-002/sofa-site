import { redirect } from "next/navigation";
import { VERONA_DEFAULT_CONFIG, VERONA_DEFAULT_STYLE, veronaHref } from "@/lib/verona";

export default function VeronaIndexPage() {
  redirect(veronaHref(VERONA_DEFAULT_STYLE, VERONA_DEFAULT_CONFIG));
}
