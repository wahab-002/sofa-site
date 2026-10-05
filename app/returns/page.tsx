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
          heading: "Inspect on Delivery with Zero Upfront Risk",
          body: (
            <>
              <p>
                Because all orders at The Sofa Hub are fulfilled on Cash on Delivery with £0 upfront deposit, you have the full opportunity to thoroughly inspect your sofa inside your living room before making payment.
              </p>
              <p className="mt-3">
                Our 2-man delivery drivers will unpack and position the sofa so you can inspect the stitching, fabric texture, cushion firmness, colour match, and frame stability. If the item does not match what you ordered or has sustained transit damage, you can reject the delivery on the spot with zero financial loss.
              </p>
            </>
          ),
        },
        {
          heading: "Damaged, Defective, or Incorrect Deliveries",
          body: (
            <>
              <p>
                In the rare event that an issue is identified after delivery (for example, a concealed seam issue or structural defect), please contact our support team on WhatsApp within 48 hours of delivery.
              </p>
              <p className="mt-3">
                Please provide clear photographs or a short video showing the issue along with your delivery postcode. Our support team will promptly arrange a free replacement piece, a technician visit to resolve the issue, or collection at no charge to you.
              </p>
            </>
          ),
        },
        {
          heading: "Made-to-Order & Dimension Policy",
          body: (
            <>
              <p>
                Each sofa is manufactured and upholstered to order based on your selected size, configuration (such as left-hand vs right-hand corner or 3+2 set), and upholstery colour. For this reason, we cannot accept returns purely for post-delivery change of mind or because the sofa does not fit into a space that was not measured in advance.
              </p>
              <p className="mt-3">
                To guarantee complete peace of mind, we urge all customers to verify door frame widths and living room layouts with us on WhatsApp prior to dispatch. Our customer specialists can review your room measurements and photos to confirm a perfect fit.
              </p>
            </>
          ),
        },
        {
          heading: "12-Month Structural Frame Guarantee",
          body: (
            <>
              <p>
                All sofas purchased from The Sofa Hub come backed by our standard 12-month domestic structural guarantee covering internal timber frames, springs, and core structural joins under standard residential usage.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
