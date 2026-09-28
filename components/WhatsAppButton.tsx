type Props = {
  productName: string;
  phoneNumber: string; // e.g. "447xxxxxxxxx" (no + or spaces)
};

export default function WhatsAppButton({ productName, phoneNumber }: Props) {
  const message = encodeURIComponent(
    `Hi, I'm interested in the ${productName}. Can you tell me more about delivery and cash on delivery?`
  );
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-forest text-linen font-body px-6 py-3 rounded-md hover:bg-charcoal transition-colors"
    >
      Order on WhatsApp
    </a>
  );
}
