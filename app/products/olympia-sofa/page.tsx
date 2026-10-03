import { redirect } from "next/navigation";
import { OLYMPIA_DEFAULT_CONFIG, olympiaHref } from "@/lib/olympia";

export default function OlympiaIndexPage() {
  redirect(olympiaHref(OLYMPIA_DEFAULT_CONFIG));
}
