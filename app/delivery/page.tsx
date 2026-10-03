import PolicyLayout, { policyMetadata } from "@/components/PolicyLayout";

export const metadata = policyMetadata(
  "Delivery Information",
  "Free UK sofa delivery with The Sofa Hub. Most orders dispatch within 7 days. Cash on delivery available.",
);

export default function DeliveryPage() {
  return (
    <PolicyLayout
      eyebrow="Help"
      title="Delivery"
      intro="Every sofa we sell includes free mainland UK delivery. No delivery fees, no hidden charges."
      sections={[
        {
          heading: "Where we deliver",
          body: (
            <>
              <p>
                We deliver across mainland UK. If you&apos;re in Northern Ireland, the Scottish Highlands &amp; Islands,
                or another remote postcode, message us on WhatsApp first and we&apos;ll confirm coverage and any
                surcharge before you order.
              </p>
            </>
          ),
        },
        {
          heading: "How long it takes",
          body: (
            <>
              <p>
                Most orders are dispatched within 7 days. You&apos;ll get a confirmed delivery window on WhatsApp once
                your order is booked. We&apos;ll keep you updated if anything changes.
              </p>
            </>
          ),
        },
        {
          heading: "On the day",
          body: (
            <>
              <p>
                Our delivery team will bring your sofa into the room of your choice where access allows. Please make sure
                doorways and stairs are clear. If you&apos;re unsure about access, send us room or doorway measurements
                when you order and we&apos;ll advise.
              </p>
            </>
          ),
        },
        {
          heading: "Payment on delivery",
          body: (
            <>
              <p>
                There&apos;s no deposit and nothing to pay online. You pay cash on delivery when your sofa arrives and
                you&apos;re happy with it.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
