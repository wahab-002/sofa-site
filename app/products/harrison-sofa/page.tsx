import { permanentRedirect } from "next/navigation";
import { HARRISON_DEFAULT_CONFIG, harrisonHref } from "@/lib/harrison";

export default function HarrisonIndexPage() {
  permanentRedirect(harrisonHref(HARRISON_DEFAULT_CONFIG));
}
