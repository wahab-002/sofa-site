import Link from "next/link";
import type { Metadata } from "next";
import SofaIllustration from "@/components/SofaIllustration";
import HowToOrder from "@/components/HowToOrder";
import Icon, { WhatsAppIcon } from "@/components/Icon";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Quality Sofas UK — Cash on Delivery",
  description:
    "We're a UK sofa specialist delivering quality corner sofas, 3 seater sofas, and sofa sets across the UK with cash on delivery. Order via WhatsApp today.",
};

const stats = [
  { value: "9", label: "Sofa collections" },
  { value: "10", label: "Colours to choose from" },
  { value: "£0", label: "Deposit, ever" },
  { value: "7 days", label: "Typical dispatch" },
];

const values = [
  {
    icon: "tag",
    title: "No showroom mark-ups",
    desc: "We sell online and on volume, so you don't pay for showrooms, sales commission or inflated “was” prices.",
  },
  {
    icon: "home",
    title: "Built for family life",
    desc: "Solid hardwood frames, deep foam cushioning and durable, everyday fabrics that stand up to kids, dogs and all.",
  },
  {
    icon: "cash",
    title: "Pay when it arrives",
    desc: "No deposit and no card details online. You pay cash on delivery once your sofa is at your door.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-site grid items-center gap-10 pt-10 md:pt-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">About The Sofa Hub</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] text-charcoal md:text-6xl">
            Great sofas shouldn&apos;t cost a fortune.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-charcoal/65">
            We&apos;re a UK sofa specialist focused on one thing: getting quality sofas into British living rooms without the fuss. No showroom mark-ups and no pushy salespeople. Just great sofas, delivered to your door, with cash on delivery nationwide.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-sand p-8 md:p-12">
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-[#E4DBCD] to-[#DAD0BF]" />
          <SofaIllustration spec={{ design: "sofa", pieces: [3, 2, 1], arms: "round" }} colour="#4A5240" className="relative w-full" />
        </div>
      </section>

      <section className="container-site mt-16">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-white p-6 ring-1 ring-charcoal/5">
              <p className="font-display text-4xl font-bold text-forest">{s.value}</p>
              <p className="mt-1 font-body text-sm text-charcoal/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site mt-20">
        <p className="eyebrow">What we stand for</p>
        <h2 className="section-title mt-2 max-w-xl">Simple, honest and built to last</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl bg-sand p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-forest shadow-soft">
                <Icon name={v.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-charcoal">{v.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 bg-forest py-16 text-linen md:py-20">
        <div className="container-site">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold">How it works</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold md:text-4xl">We keep things simple</h2>
          <div className="mt-10">
            <HowToOrder />
          </div>
        </div>
      </section>

      <section className="container-site mt-20 text-center">
        <h2 className="section-title">Ready to find your sofa?</h2>
        <p className="mx-auto mt-3 max-w-md font-body text-charcoal/60">Browse the full range, or message us and we&apos;ll help you choose.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop/all" className="btn btn-primary btn-lg">
            Shop all sofas <Icon name="arrow" className="h-5 w-5" />
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
            <WhatsAppIcon className="h-5 w-5 text-whatsapp" /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
