import Icon from "./Icon";

const steps = [
  { icon: "palette", title: "Pick your sofa", desc: "Choose the size and colour. The price updates as you go." },
  { icon: "chat", title: "Order on WhatsApp", desc: "One tap sends us your order. A real person confirms it and books your delivery." },
  { icon: "cash", title: "Pay on delivery", desc: "No deposit, no card details. Pay cash when your sofa arrives." },
];

export default function HowToOrder({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`grid gap-4 ${compact ? "md:grid-cols-3" : "md:grid-cols-3 md:gap-6"}`}>
      {steps.map((s, i) => (
        <li key={s.title} className={`relative rounded-3xl ${compact ? "bg-sand p-5" : "bg-linen/[0.06] p-7 ring-1 ring-linen/10"}`}>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full ${
                compact ? "bg-white text-forest" : "bg-gold text-charcoal"
              }`}
            >
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <span className={`font-body text-xs font-semibold uppercase tracking-[0.16em] ${compact ? "text-charcoal/40" : "text-linen/40"}`}>
              Step {i + 1}
            </span>
          </div>
          <h3 className={`mt-5 font-display text-xl font-semibold ${compact ? "text-charcoal" : "text-linen"}`}>{s.title}</h3>
          <p className={`mt-1.5 font-body text-sm leading-relaxed ${compact ? "text-charcoal/60" : "text-linen/65"}`}>{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}
