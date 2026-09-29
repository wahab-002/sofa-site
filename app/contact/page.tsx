import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Icon, { WhatsAppIcon } from "@/components/Icon";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | The Sofa Hub",
  description: "Message The Sofa Hub on WhatsApp for delivery times, sizing help, or to place a cash-on-delivery sofa order.",
};

const topics = [
  { icon: "sofa", title: "Place an order", message: "Hi, I'd like to place an order." },
  { icon: "truck", title: "Delivery questions", message: "Hi, I have a question about delivery." },
  { icon: "palette", title: "Colour & fabric advice", message: "Hi, can you help me choose a colour and fabric?" },
  { icon: "home", title: "Help with sizing", message: "Hi, can you help me choose the right size sofa for my room?" },
];

export default function ContactPage() {
  return (
    <>
      <section className="container-site grid gap-10 pt-10 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Contact us</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] text-charcoal md:text-6xl">We&apos;re here to help</h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-charcoal/65">
            Message us on WhatsApp for delivery times, sizing help, or to place a cash-on-delivery order. You&apos;ll be chatting to a real person, not a bot.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {topics.map((t) => (
              <a
                key={t.title}
                href={whatsappLink(t.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-charcoal/5 transition-all hover:shadow-soft hover:ring-charcoal/15"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sand text-forest">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <span className="flex-1 font-body text-sm font-semibold text-charcoal">{t.title}</span>
                <Icon name="arrow" className="h-4 w-4 text-charcoal/30 transition-transform group-hover:translate-x-1 group-hover:text-charcoal" />
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-forest p-8 text-linen md:p-10 lg:self-start">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-whatsapp text-white">
            <WhatsAppIcon className="h-8 w-8" />
          </span>
          <p className="mt-6 font-body text-sm text-linen/60">WhatsApp us on</p>
          <p className="font-display text-3xl font-semibold">{WHATSAPP_DISPLAY}</p>
          <p className="mt-3 font-body text-linen/70">Send a message any time and we&apos;ll get back to you as soon as we can.</p>
          <a href={whatsappLink("Hi, I have a question.")} target="_blank" rel="noopener noreferrer" className="btn btn-lg mt-8 w-full bg-whatsapp text-charcoal hover:brightness-95">
            <WhatsAppIcon className="h-5 w-5" />
            Start a chat
          </a>
          <ul className="mt-8 space-y-3 border-t border-linen/10 pt-6 font-body text-sm text-linen/75">
            {["Free UK delivery on every order", "Cash on delivery, no deposit", "Most orders dispatched within 7 days"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Icon name="check" className="h-4 w-4 text-gold" strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">Good to know</p>
          <h2 className="section-title mt-2">Frequently asked questions</h2>
        </div>
        <Faq />
      </section>
    </>
  );
}
