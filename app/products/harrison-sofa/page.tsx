import { redirect } from "next/navigation";
import { HARRISON_DEFAULT_CONFIG, harrisonHref } from "@/lib/harrison";

export default function HarrisonIndexPage() {
  redirect(harrisonHref(HARRISON_DEFAULT_CONFIG));
}
