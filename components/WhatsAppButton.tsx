import { WhatsAppIcon } from "./Icon";
import { WHATSAPP_NUMBER } from "@/lib/site";

type Props = {
  message: string;
  phoneNumber?: string;
  label?: string;
  className?: string;
};

export default function WhatsAppButton({
  message,
  phoneNumber = WHATSAPP_NUMBER,
  label = "Order on WhatsApp",
  className = "",
}: Props) {
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`btn btn-primary btn-lg group w-full ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-whatsapp" />
      {label}
      <span className="font-normal text-linen/60 transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}
