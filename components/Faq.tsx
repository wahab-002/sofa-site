import Icon from "./Icon";

export type FaqItem = { q: string; a: string };

export const generalFaqs: FaqItem[] = [
  {
    q: "How do I order?",
    a: "Choose your sofa, size, colour and fabric on the product page, then tap “Order on WhatsApp”. Your order details are sent to us automatically and a real person will confirm the price and arrange your delivery.",
  },
  {
    q: "Do I need to pay anything upfront?",
    a: "No. There’s no deposit and no card payment online. You pay cash on delivery when your sofa arrives at your door.",
  },
  {
    q: "Is delivery really free?",
    a: "Yes. Delivery is free on every UK order, with no hidden charges added at the end.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are dispatched within 7 days. We’ll confirm your delivery date on WhatsApp when you place your order.",
  },
  {
    q: "Which fabric should I choose?",
    a: "Plush Velvet is soft with a rich sheen, Chenille is textured and hard-wearing for busy homes, and Leather is durable and easy to wipe clean. Message us if you’d like help choosing.",
  },
];

export default function Faq({ items = generalFaqs }: { items?: FaqItem[] }) {
  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-lg font-semibold text-charcoal">
            {item.q}
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sand transition-transform group-open:rotate-45">
              <Icon name="plus" className="h-4 w-4" />
            </span>
          </summary>
          <p className="mt-3 max-w-2xl font-body leading-relaxed text-charcoal/65">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
