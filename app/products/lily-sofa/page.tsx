import { redirect } from "next/navigation";
import { LILY_DEFAULT_CONFIG, lilyHref } from "@/lib/lily";

export default function LilyIndexPage() {
  redirect(lilyHref(LILY_DEFAULT_CONFIG));
}
