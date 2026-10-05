"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./Icon";
import { whatsappLink } from "@/lib/site";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  // Product pages have their own sticky order bar; wholesale is card-pay only.
  if (pathname.startsWith("/products/") || pathname.startsWith("/wholesale")) return null;

  return (
    <a
      href={whatsappLink("Hi, I have a question about your sofas.")}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-lift transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-body text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-1 md:block">
        Chat with us
      </span>
    </a>
  );
}
