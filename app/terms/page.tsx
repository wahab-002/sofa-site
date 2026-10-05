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
          heading: "Order Placements & WhatsApp Confirmation",
          body: (
            <>
              <p>
                All sofa orders are initiated and finalized via direct communication with our sales specialists on WhatsApp. An order becomes officially binding only after we have confirmed stock availability, specifications (model, configuration, fabric, and colour), delivery postcode eligibility, and you have expressly agreed to the delivery date.
              </p>
              <p className="mt-3">
                We reserve the right to decline or reschedule any order if manufacturing capacity, vehicle routing, or stock levels prevent safe and timely fulfilment.
              </p>
            </>
          ),
        },
        {
          heading: "Pricing & Currency",
          body: (
            <>
              <p>
                All prices displayed across the website are quoted in Pounds Sterling (£ GBP) and include standard mainland UK delivery. While we make every reasonable effort to keep online prices accurate and synchronized, confirmed written price quotations provided over WhatsApp take precedence in the event of any technical discrepancy.
              </p>
            </>
          ),
        },
        {
          heading: "Cash on Delivery (COD) & Payment Conditions",
          body: (
            <>
              <p>
                Unless explicitly agreed otherwise in writing prior to delivery, all payments are due in full via Cash on Delivery upon physical arrival of your sofa suite.
              </p>
              <p className="mt-3">
                No upfront deposit is demanded online. You are required to have the agreed cash amount ready for the delivery team once the sofa has been delivered and inspected in your property.
              </p>
            </>
          ),
        },
        {
          heading: "Customer Delivery Obligations & Access",
          body: (
            <>
              <p>
                It is the customer&apos;s sole responsibility to ensure that doorways, entry hallways, stairwells, and the destination room provide adequate clearance for the purchased sofa dimensions. If access proves impossible due to unmeasured restrictions, our drivers may offer ground-floor alternatives or reschedule with appropriate modular pieces.
              </p>
            </>
          ),
        },
        {
          heading: "Consumer Statutory Rights & Governing Law",
          body: (
            <>
              <p>
                Nothing contained within these Terms of Service shall affect, restrict, or limit your statutory legal rights under the Consumer Rights Act 2015. These terms are governed by and construed in accordance with the laws of England and Wales.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
