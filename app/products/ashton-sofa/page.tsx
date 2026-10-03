import { redirect } from "next/navigation";
import { ASHTON_DEFAULT_CONFIG, ashtonHref } from "@/lib/ashton";

export default function AshtonIndexPage() {
  redirect(ashtonHref(ASHTON_DEFAULT_CONFIG));
}
