import Link from "next/link";
import SofaIllustration from "@/components/SofaIllustration";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="container-site flex flex-col items-center py-20 text-center">
      <div className="w-full max-w-md">
        <SofaIllustration spec={{ design: "sofa", pieces: [2], arms: "round" }} colour="#D4774A" className="w-full" />
      </div>
      <p className="eyebrow mt-10">Page not found</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-charcoal md:text-5xl">This seat&apos;s empty</h1>
      <p className="mt-3 max-w-md font-body text-charcoal/60">
        The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back to the sofas.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop/all" className="btn btn-primary btn-lg">
          Shop all sofas <Icon name="arrow" className="h-5 w-5" />
        </Link>
        <Link href="/" className="btn btn-secondary btn-lg">
          Back to home
        </Link>
      </div>
    </section>
  );
}
