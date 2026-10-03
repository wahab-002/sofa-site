import PolicyLayout, { policyMetadata } from "@/components/PolicyLayout";

export const metadata = policyMetadata(
  "Returns & Exchanges",
  "Returns and exchanges for The Sofa Hub sofas. Contact us on WhatsApp if there's a problem with your order.",
);

export default function ReturnsPage() {
  return (
    <PolicyLayout
      eyebrow="Help"
      title="Returns & exchanges"
      intro="Sofas are made to order in your chosen size and colour, so we can't accept returns for change of mind. We'll always put things right if something arrives wrong."
      sections={[
        {
          heading: "Made to order",
          body: (
            <p>
              Because each sofa is finished for you, we don&apos;t offer a standard 14-day cooling-off return for change
              of mind, wrong colour preference, or sizing that doesn&apos;t fit after delivery. Double-check size and
              colour with us on WhatsApp before you confirm.
            </p>
          ),
        },
        {
          heading: "Damaged or incorrect orders",
          body: (
            <p>
              If your sofa arrives damaged, incomplete, or not what you ordered, tell us on WhatsApp within 48 hours —
              ideally with photos. We&apos;ll arrange a repair, replacement, or collection at no cost to you.
            </p>
          ),
        },
        {
          heading: "Inspect on delivery",
          body: (
            <p>
              Please check your sofa carefully before paying. Once you&apos;ve paid and the delivery team has left,
              report any transit damage as soon as you notice it so we can help quickly.
            </p>
          ),
        },
      ]}
    />
  );
}
