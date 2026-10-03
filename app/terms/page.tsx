import PolicyLayout, { policyMetadata } from "@/components/PolicyLayout";

export const metadata = policyMetadata(
  "Terms of Service",
  "Terms for browsing and ordering sofas from The Sofa Hub via WhatsApp with cash on delivery.",
);

export default function TermsPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Terms of service"
      intro="By browsing this site or placing an order with The Sofa Hub, you agree to these terms."
      sections={[
        {
          heading: "Orders",
          body: (
            <p>
              Orders are placed and confirmed on WhatsApp. A price quote becomes an order only once we confirm
              availability and you accept. We may decline or cancel an order if stock, pricing, or delivery cannot be
              fulfilled, and we&apos;ll tell you straight away.
            </p>
          ),
        },
        {
          heading: "Prices",
          body: (
            <p>
              Prices on the website are in pounds sterling and include VAT where applicable. We aim to keep them
              accurate, but confirmed WhatsApp quotes take priority if there&apos;s a mismatch.
            </p>
          ),
        },
        {
          heading: "Payment",
          body: (
            <p>
              Payment is cash on delivery unless we agree otherwise in writing on WhatsApp. No deposit is taken online.
            </p>
          ),
        },
        {
          heading: "Website content",
          body: (
            <p>
              Photos and descriptions are a guide. Natural variation in fabric and finishes can occur. Colours may look
              slightly different on different screens.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              Nothing in these terms limits your statutory rights as a UK consumer. We&apos;re not liable for delays
              caused by events outside our reasonable control, but we&apos;ll keep you informed and work to resolve
              issues.
            </p>
          ),
        },
      ]}
    />
  );
}
