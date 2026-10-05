import { permanentRedirect } from "next/navigation";
import { ASHTON_DEFAULT_CONFIG, ashtonHref } from "@/lib/ashton";

export default function AshtonIndexPage() {
  permanentRedirect(ashtonHref(ASHTON_DEFAULT_CONFIG));
}
