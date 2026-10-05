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
          heading: "Free Mainland UK Delivery Coverage",
          body: (
            <>
              <p>
                Every sofa ordered from The Sofa Hub includes complimentary 2-man mainland UK delivery. We service England, Wales, and mainland Scotland without any hidden courier charges or surprise fuel surcharges.
              </p>
              <p className="mt-3">
                For offshore postcodes, including the Scottish Highlands &amp; Islands, Isle of Wight, Isle of Man, and Northern Ireland, please send your delivery postcode to our team on WhatsApp before ordering so we can confirm vehicle schedule availability and route timing.
              </p>
            </>
          ),
        },
        {
          heading: "Dispatch Timelines & Delivery Slots",
          body: (
            <>
              <p>
                Most popular sofa collections (including our corner groups, 3+2 sets, and recliners) are dispatched from our UK distribution warehouse within 3 to 7 working days.
              </p>
              <p className="mt-3">
                Once your order is scheduled on our delivery van route, our logistics dispatcher will message you directly on WhatsApp with your allocated delivery date and estimated time window. The driver will also call you approximately 30 to 60 minutes prior to arrival so you have ample notice.
              </p>
            </>
          ),
        },
        {
          heading: "Room of Choice Placement & Access Preparation",
          body: (
            <>
              <p>
                Our professional 2-man delivery team will carefully carry your new sofa straight into your ground floor room of choice, provided there is clear and safe access.
              </p>
              <p className="mt-3">
                Please ensure that your hallway, porch, entrance doorways, and interior walkways are clear of obstructions such as shoe racks, narrow consoles, and hanging frames prior to our team arriving. If you live in a property with tight staircase turns or narrow communal corridors, please measure your doorway dimensions beforehand or share photos on WhatsApp so we can verify clearance before loading the van.
              </p>
            </>
          ),
        },
        {
          heading: "100% Cash on Delivery — Inspect Before You Pay",
          body: (
            <>
              <p>
                We operate on a transparent Cash on Delivery (COD) payment structure. There is zero deposit required when placing your order on WhatsApp and nothing to pay online.
              </p>
              <p className="mt-3">
                When the delivery team arrives, you are fully entitled to inspect the sofa frame, fabric upholstery, cushions, and colour in your own home. Only once you are 100% satisfied with the quality and condition of your sofa do you hand over payment to our drivers in cash.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
